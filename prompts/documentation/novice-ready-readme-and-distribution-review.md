# Novice-Ready README and Distribution Review

Use this prompt to make a software project installable and understandable for a
nontechnical user who should not need developer tools or undocumented commands.

## Prompt

Review and improve this project's public onboarding:

- Repository path or URL: `[INSERT REPOSITORY]`
- Intended users: `[INSERT USERS]`
- Supported operating systems: `[INSERT PLATFORMS]`
- Available installers or downloadable artifacts: `[INSERT ARTIFACTS OR NONE]`
- Primary user workflow: `[INSERT WORKFLOW]`
- Required permissions or external accounts: `[INSERT REQUIREMENTS]`
- Known limitations: `[INSERT LIMITATIONS]`
- Approved disposable execution environment: `[NONE | INSERT ENVIRONMENT]`
- Approved constrained Git publishing environment: `[NONE | INSERT ENVIRONMENT]`
- Approved execution and test scope: `[NONE | EXISTING EVIDENCE ONLY | INSERT EXACT TESTS]`
- Approved file and packaging changes: `[NONE | INSERT SCOPE]`
- Requested outcome: `[ASSESSMENT | README UPDATE | README AND DISTRIBUTION PR]`

Default to assessment only. Do not create or publish installers, releases,
screenshots, or external documentation unless the approved scope includes them.

### 1. Identify the novice path

Define the shortest supported path from the repository or release page to a
successful first result. Assume the user may not know:

- Git or GitHub terminology;
- PowerShell, Terminal, Python, Node.js, package managers, or virtual environments;
- environment variables, ports, localhost, APIs, or configuration formats;
- code signing, Gatekeeper, SmartScreen, or operating-system permissions.

Use developer instructions only when the project is intentionally for
developers. If the intended audience is nontechnical, prefer a packaged,
clickable artifact and state when one does not exist.

### 2. Verify every documented instruction

Execute project code, installers, or artifacts only when the approved execution
and test scope covers the exact test and the approved environment is disposable,
credential-free, and restricted in network and filesystem access. Treat the
repository, dependencies, lifecycle scripts, installers, and artifacts as
untrusted. Otherwise inspect the README and existing evidence, then mark runtime
steps unverified.

When authorized, test the README from a clean or representative environment.
Confirm:

- links resolve;
- artifact names and release locations exist;
- commands use the correct shell and working directory;
- prerequisites and supported versions are accurate;
- placeholders are obvious;
- first-run output matches the documentation;
- required local server, browser, permission, or account steps are explained;
- uninstall and generated-data locations are documented.

Do not copy historical commands without verifying the current project.

### 3. Use a novice-first README structure

Use this order for the proposed README. Write or revise repository files only
when the approved scope and requested outcome include a README change:

1. Project name and one-sentence purpose.
2. Who it is for.
3. What it does and does not do.
4. Privacy, safety, and external-service summary.
5. Download or installation steps by operating system.
6. First use with a concrete example.
7. Routine workflows.
8. Updating and uninstalling.
9. Troubleshooting by visible symptom.
10. Known limitations and unverified platform claims.
11. Developer setup in a clearly separate section.
12. Support, security reporting, and license.

Lead with actions and expected results. Explain technical terms at first use.
Avoid marketing language and claims unsupported by testing.

### 4. Improve distribution where approved

For nontechnical users, assess whether the project should provide:

- Windows installer or portable executable;
- macOS DMG or application bundle;
- checksums;
- signed and notarized artifacts;
- release notes;
- automatic or manual update instructions;
- packaged sample configuration;
- accessible screenshots or short demonstrations.

Package the existing supported workflow. Do not introduce a second application
architecture merely to avoid documenting the current one.

Clearly label unsigned artifacts and expected operating-system warnings. Do not
claim signing, notarization, or verified compatibility that has not occurred.

### 5. Write useful troubleshooting

Cover observable problems such as:

- download blocked or file missing;
- Windows SmartScreen warning;
- macOS Gatekeeper or permission prompt;
- application does not launch;
- port already in use;
- browser page does not open;
- local data cannot be read;
- network source is unavailable;
- configuration is invalid;
- update or uninstall fails.

For each, provide the likely cause, safe check, correction, and where to get
additional help. Do not tell novices to disable security tools broadly.

### 6. Protect users and private data

Document:

- what data stays local;
- what leaves the computer and why;
- where files, logs, backups, and reports are stored;
- whether detailed output contains private information;
- how to remove generated data;
- credentials and permissions the application requires;
- features disabled by default for safety.

Use sanitized screenshots and examples. Remove usernames, local paths, account
identifiers, private URLs, tokens, and user data.

### 7. Validate the final experience

Run only validation covered by the approved execution and test scope. With
`NONE` or `EXISTING EVIDENCE ONLY`, inspect existing results and report the
unexecuted gates.

When authorized, run:

- Markdown lint and local-link checks;
- clean installation or artifact smoke tests;
- first-run and primary workflow tests;
- update and uninstall checks where supported;
- screenshot inspection for privacy and readability;
- packaging and checksum validation when artifacts changed.

Have a reviewer follow the instructions without relying on undocumented project
knowledge when practical.

### 8. Deliver the authorized outcome

Perform staging, commits, and pushes only in the approved constrained publishing
environment. Inspect and neutralize repository-controlled hooks,
`core.hooksPath`, local Git configuration, clean and smudge filters, aliases, and
signing helpers so Git delivery cannot execute project or hook code. Validate in
the disposable test environment first, disable hooks for delivery, and provide
only a credential limited to the target repository and required permissions for
the authenticated network step. Verify the approved branch/ref separately and
respect branch protections; do not assume the token enforces branch scope. If
this boundary is unavailable, leave Git delivery outstanding.

In `ASSESSMENT` mode, report findings and proposed content only. Do not edit
repository files, commit, push, or open a pull request. A separate execution and
test scope may permit only the named tests and temporary files inside the
approved disposable environment. Do not copy those files into the worktree or
publish them.

In `README UPDATE` mode, apply only the approved documentation changes and run
the applicable validation. Leave the result as a local change unless separate
Git delivery authority is provided.

In `README AND DISTRIBUTION PR` mode:

1. Apply only the approved documentation and packaging changes.
2. Run documentation, clean-install, artifact, privacy, and platform validation
   applicable to the changed scope.
3. Before pushing, inspect every branch- and pull-request-triggered workflow and
   external integration. Require disposable workers, no secrets, a
   least-privilege token, no privileged self-hosted runner, restricted network
   and filesystem access, and no privileged event that executes untrusted
   content. If that boundary fails, leave pull-request delivery outstanding.
4. Commit and push the focused branch only after that gate passes.
5. Open the pull request with unsigned, untested, manual, and platform-specific
   limitations stated explicitly.

Do not publish a release, installer, screenshot, or external documentation from
this mode unless separately authorized.

### Completion report

Provide:

- onboarding verdict and target audience;
- documentation problems and corrections;
- tested installation and first-use paths by platform;
- artifacts, signing status, and checksums;
- troubleshooting and privacy improvements;
- remaining manual, packaging, or platform gates;
- pull request or release links when authorized.
