# OpenClaw on macOS — Secure Setup Runbook

> Original upstream review: 2026-08-16. Targeted documentation review: 2026-09-05.
> Re-check installed-version help, configuration, and plugin compatibility before
> each phase. This review did not execute a macOS installation or sandbox tests.
> Execute one phase at a time and stop on failed verification.

## Objective and security boundary

Install OpenClaw locally, then add the third-party `claw-orchestrator` plugin for a
dedicated coding agent. The Gateway must remain loopback-only and authenticated.
Messaging stays disabled until adversarial tests pass. The general assistant must
not receive shell or filesystem authority.

`claw-orchestrator` launches subprocesses with the macOS user's authority. OpenClaw
approval of a plugin call does not automatically confine its child process. Never
enable `danger-full-access`, `bypassPermissions`, or global unrestricted execution
during initial setup.

## 0 — Preflight and backup

```bash
uname -s
uname -m
sw_vers
printf '%s\n' "$SHELL"
node --version 2>/dev/null || true
npm --version 2>/dev/null || true
```

Expected: `Darwin`, `arm64`, and zsh/bash. OpenClaw supports Node `22.22.3+`,
`24.15+`, or `25.9+`; Node 26 is recommended and Node 23 is unsupported. Let the
official installer provision Node when the installed version is unsuitable.

Inventory real executables; config directories alone prove nothing:

```bash
for cmd in claude codex agent agy opencode ollama; do
  if command -v "$cmd" >/dev/null 2>&1; then
    printf '\n%s: %s\n' "$cmd" "$(command -v "$cmd")"
    "$cmd" --version 2>&1 | head -n 2
  else
    printf '\n%s: not found\n' "$cmd"
  fi
done
```

Check authentication separately with each installed CLI's documented status command.
If `~/.openclaw` exists, create a private backup outside cloud-synced storage:

```bash
backup_dir="$HOME/openclaw-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -m 700 "$backup_dir"
test ! -e "$HOME/.openclaw" || cp -Rp "$HOME/.openclaw" "$backup_dir/"
printf 'Backup: %s\n' "$backup_dir"
```

## 1 — Install without onboarding

Inspect remote code before executing it:

```bash
installer_dir="$(mktemp -d)"
curl --proto '=https' --tlsv1.2 -fsSLo "$installer_dir/install.sh" \
  https://openclaw.ai/install.sh
less "$installer_dir/install.sh"
bash "$installer_dir/install.sh" --no-onboard
rm -r "$installer_dir"
```

Documented npm fallback, only when Node is already managed locally:

```bash
npm install -g openclaw@latest
```

Verify:

```bash
openclaw --version
node --version
openclaw doctor
```

If the command is missing, verify that `$(npm prefix -g)/bin` exists before adding it
to `PATH`. Do not proceed with unexplained Doctor errors.

## 2 — Harden before starting services

Create `~/.openclaw/openclaw.json`, or carefully merge this with existing provider
settings. Never overwrite an existing file without comparing the backup.

```json5
{
  gateway: {
    mode: "local",
    bind: "loopback",
    auth: { mode: "token" }
  },
  session: { dmScope: "per-channel-peer" },
  agents: { defaults: { sandbox: { mode: "non-main" } } },
  tools: {
    profile: "messaging",
    deny: [
      "group:automation", "group:runtime", "group:fs",
      "sessions_spawn", "sessions_send"
    ],
    fs: { workspaceOnly: true },
    exec: { security: "deny", ask: "always" },
    elevated: { enabled: false }
  },
  channels: {
    telegram: { dmPolicy: "disabled" },
    discord: { dmPolicy: "disabled" },
    whatsapp: { dmPolicy: "disabled" }
  }
}
```

```bash
chmod 700 "$HOME/.openclaw"
chmod 600 "$HOME/.openclaw/openclaw.json"
openclaw doctor --generate-gateway-token
openclaw doctor
openclaw security audit
```

Resolve all critical findings and understand every accepted warning.

## 3 — Onboard and install the daemon

```bash
openclaw onboard --install-daemon
```

Configure model providers only. Decline messaging. Preserve loopback binding, the
explicit messaging profile, global denials, and disabled elevated tools.

```bash
openclaw doctor
openclaw gateway status
openclaw health
openclaw security audit --deep
openclaw dashboard --no-open
```

The Control UI should resolve to localhost on port 18789. Use the configured
local secret source rather than placing a real token in process arguments:

```bash
openclaw gateway status --port 18789 --require-rpc
```

Confirm the reported target is the intended local Gateway and the authenticated
read probe succeeds. For the negative test, use an isolated client with no cached
device credentials and a deliberately invalid token. Verify rejection for that
exact target; a generic probe's exit code may reflect another reachable target.
Do not claim the invalid-token test passed when client isolation or evidence is
unavailable. See the [Gateway CLI reference](https://docs.openclaw.ai/cli/gateway).

## 4 — Review and pin Claw Orchestrator

This is third-party executable code. The release reviewed on 2026-08-16 is
`4.12.1`; compare current releases before installing.

```bash
npm view @enderfga/claw-orchestrator version dist.tarball --json
npm view @enderfga/claw-orchestrator@4.12.1 dist.integrity --json
review_dir="$(mktemp -d)"
cd "$review_dir"
npm pack @enderfga/claw-orchestrator@4.12.1
tar -tf enderfga-claw-orchestrator-4.12.1.tgz | less
tar -xzf enderfga-claw-orchestrator-4.12.1.tgz
less package/package.json
less package/openclaw.plugin.json
```

Review lifecycle scripts, entry points, subprocess launching, listeners, workspace
validation, and credential handling. Then use OpenClaw's native manager, not a
mutable `main`-branch pipe-to-shell installer:

```bash
cd "$HOME"
openclaw plugins install npm:@enderfga/claw-orchestrator@4.12.1 \
  --dangerously-force-unsafe-install
```

The flag acknowledges the reviewed subprocess capability; it does not certify safety.

```bash
openclaw plugins list --enabled --verbose
openclaw plugins inspect claw-orchestrator --runtime --json
openclaw gateway restart
openclaw gateway status
openclaw security audit --deep
cd "$HOME"
rm -r "$review_dir"
```

Set `plugins.allow` to explicit trusted plugin IDs, including `claw-orchestrator` and
required bundled plugins; never use `"*"`. Use runtime inspection—not a hard-coded
tool count—to identify the installed tool surface.

Rollback: disable the plugin, restart the Gateway, and rerun the deep audit.

## 5 — Isolate coding authority

Keep `group:runtime` and `group:fs` globally denied. Create a separate agent named,
for example, `coding-local`. Allow it only the minimum orchestrator tool IDs shown by
runtime inspection. Deny built-in host exec/process, elevated tools, browser,
automation, Gateway administration, and session spawning unless individually tested.
Give it one explicit repository, never `$HOME` or a parent directory.

Start every orchestrated session with:

```text
sandboxMode: "read-only"
permissionMode: "manual"
cwd: "/absolute/path/to/one/test/repository"
```

After tests pass, a trusted local operator may select `workspace-write`.
Engine sandboxing differs across Codex, Claude, Cursor, Antigravity, and OpenCode; it
is not automatically a Docker boundary. Keep `danger-full-access` and
`bypassPermissions` prohibited.

If a separate workflow truly needs OpenClaw host exec, verify installed-version support and scope this policy to
the dedicated local agent:

```json5
{ exec: { mode: "ask", strictInlineEval: true } }
```

Do not combine `mode` with `security` or `ask`. Never solve policy conflicts by
changing the global profile to `full`.

## 6 — Adversarial acceptance tests

Create a disposable repository with no secrets. Through `coding-local`, verify:

1. read-only listing and summarization succeeds;
2. direct file creation fails;
3. delegated/subagent file creation also fails;
4. reading a harmless file outside the repository fails;
5. rejection or missing approval UI prevents execution;
6. `workspace-write` can create one file inside the repository but nowhere outside;
7. `git status --short` shows only the intended change.

Then run:

```bash
openclaw gateway status
openclaw security audit --deep
openclaw plugins inspect claw-orchestrator --runtime --json
```

Disable the plugin immediately if any boundary test fails.

## 7 — Optional dashboards and messaging

`clawo serve` should listen only at `127.0.0.1:18796`; verify with:

```bash
lsof -nP -iTCP:18796 -sTCP:LISTEN
```

Do not assume Gateway auth protects this standalone dashboard.

Enable messaging only after all tests pass. Prefer pairing or a strict numeric sender
allowlist; never use `"*"` with write-capable tools. Keep remote messaging routed away
from `coding-local` unless explicitly required. After enabling a channel, prove an
authorized sender succeeds, an unauthorized sender fails, dangerous tools remain
unreachable, logs contain no secrets, and `security audit --deep` still passes.

Pairing authenticates a sender; it does not provide OS isolation or defeat prompt
injection.

## Final acceptance checklist

- [ ] Private backup exists outside synced storage.
- [ ] Doctor, health, Gateway status, and deep security audit pass.
- [ ] Gateway listens only on loopback and rejects an invalid token.
- [ ] General assistant globally denies runtime, filesystem, automation, elevated,
      and dangerous session-control tools.
- [ ] Plugin version and provenance are pinned and `plugins.allow` is explicit.
- [ ] Coding authority belongs only to a dedicated agent and repository.
- [ ] Direct and delegated read-only escape tests failed safely.
- [ ] Workspace-write could not write outside the disposable repository.
- [ ] Approval rejection and no-UI fallback prevented execution.
- [ ] Ports 18789 and 18796 are not publicly exposed.
- [ ] Messaging is disabled or both authorized and unauthorized tests pass.

## Emergency rollback

```bash
openclaw plugins disable claw-orchestrator 2>/dev/null || true
openclaw gateway stop
```

Disable channels and forwarding, rotate Gateway/provider/channel secrets, restore the
known-good backup, inspect logs and filesystem changes, then restart loopback-only and
rerun Doctor plus the deep audit.

## Primary references

- [OpenClaw install](https://docs.openclaw.ai/install)
- [OpenClaw Node install](https://docs.openclaw.ai/install/node)
- [OpenClaw gateway security](https://docs.openclaw.ai/gateway/security)
- [OpenClaw exposure runbook](https://docs.openclaw.ai/gateway/security/exposure-runbook)
- [OpenClaw gateway tool configuration](https://docs.openclaw.ai/gateway/config-tools)
- [OpenClaw exec tool](https://docs.openclaw.ai/tools/exec)
- [OpenClaw plugin tool](https://docs.openclaw.ai/tools/plugin)
- [OpenClaw web dashboard](https://docs.openclaw.ai/web/dashboard)
- [Claw orchestrator repository](https://github.com/Enderfga/claw-orchestrator)
- [Claw orchestrator tool references](https://github.com/Enderfga/claw-orchestrator/blob/main/skills/references/tools.md)
