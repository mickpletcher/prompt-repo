# Dependency Update Triage and Merge

Use this prompt to evaluate and process dependency or GitHub Action updates
individually instead of merging automated pull requests blindly.

## Prompt

Triage dependency updates in this repository:

- Repository URL or path: `[INSERT REPOSITORY]`
- Package ecosystems: `[INSERT ECOSYSTEMS]`
- Pull request scope: `[ALL DEPENDENCY PRS | INSERT PRS]`
- Supported runtime and platform matrix: `[INSERT MATRIX]`
- Release and compatibility policy: `[INSERT POLICY]`
- Required checks: `[INSERT CHECKS OR DISCOVER]`
- Approved isolated validation environment: `[NONE | INSERT ENVIRONMENT]`
- Merge method: `[SQUASH | MERGE | REBASE]`
- Approved pull requests and permitted operations: `[NONE | INSERT PR NUMBERS AND ACTIONS]`
- Authorization: `[ASSESS ONLY | PROCESS NAMED APPROVED UPDATES | PROCESS ALL SAFE UPDATES]`
- Branch cleanup authorization: `[KEEP ALL | DELETE NAMED BRANCHES | DELETE MERGED UPDATE BRANCHES]`

Default to assessment only. Do not assume an automated update is safe because
it was opened by Dependabot, Renovate, or another trusted bot.

In `PROCESS NAMED APPROVED UPDATES` mode, act only on the pull requests and
operations named in the approval input. A `MERGE` disposition, bot-authored pull
request, or GitHub review approval is not user authorization to merge.

### 1. Inventory the complete update set

List every in-scope dependency pull request and record:

- package or action;
- current and proposed versions;
- direct, transitive, development, build, or runtime role;
- semantic version change;
- files changed;
- base and head SHAs;
- mergeability, checks, review, and conflict status;
- linked security advisory when present;
- overlapping or superseding updates.

Use paginated API results and current lockfiles. Do not rely on a clipped pull
request list.

### 2. Research the change

Use primary sources such as official release notes, changelogs, migration guides,
security advisories, and action repositories. Determine:

- breaking changes and removed behavior;
- runtime, operating-system, and language support changes;
- new permissions, network access, telemetry, or build requirements;
- changed defaults or configuration;
- known regressions;
- whether the update actually fixes the cited advisory;
- whether a newer patch supersedes the proposed version.

Record the date and exact versions reviewed. Do not present remembered release
behavior as current.

### 3. Review security and supply-chain impact

Check:

- package provenance and expected registry;
- maintainer or ownership changes;
- install scripts and newly introduced dependencies;
- lockfile integrity;
- license changes;
- vulnerability severity and exploit relevance;
- GitHub Action permissions and network behavior;
- exact commit SHA pinning for actions.

When Dependabot proposes a mutable action tag, resolve the corresponding trusted
commit and retain the readable version comment where repository policy expects
one.

Do not silence an advisory without documenting why it is not actionable.

### 4. Validate compatibility

Run the repository's complete relevant suite for each logical update group only
inside the approved isolated validation environment:

- unit, integration, and regression tests;
- lint, formatting, type, and compilation checks;
- dependency installation;
- packaging and artifact smoke tests;
- platform and runtime matrix;
- security and license scans;
- generated-file and documentation checks.

Add focused tests for a breaking behavior or prior regression when the update
affects a critical path.

Treat proposed package and lockfile content as untrusted. Keep installation and
every command that loads or executes proposed dependency content inside a
disposable environment with no repository, cloud, registry, or signing
credentials and with restricted network and filesystem access. Disable lifecycle
and install scripts for the initial inspection. Enable only a specific script
that has been reviewed and is required for validation, and keep that execution
inside the sandbox. If the approved environment is unavailable, do not execute
the proposed content; use static and hosted evidence and report the unexecuted
validation.

### 5. Resolve overlaps and conflicts safely

Process shared workflow and base dependency changes before updates that touch
the same lines. After each merge, recalculate the read-only status of every
remaining pull request. Modify a remaining pull request only when
`PROCESS ALL SAFE UPDATES` applies or its named approval explicitly permits
`UPDATE`, `REBASE`, or `RETARGET`.

For each remaining pull request with that permission:

- refresh that pull request against its verified target base branch;
- re-evaluate superseded versions;
- resolve conflicts explicitly;
- preserve all intended action or package versions;
- rerun checks on the new head SHA.

For every other pull request, leave its branch and base unchanged and report any
needed refresh as outstanding.

Do not delete a conflicting branch until its pull request and unique commits are
understood.

### 6. Make a disposition decision

Classify each update as:

- `MERGE`: compatible, validated, and policy-compliant;
- `UPDATE FIRST`: useful but requires code, configuration, docs, or migration;
- `WAIT`: upstream issue, missing platform evidence, or coordinated release;
- `CLOSE AS SUPERSEDED`: replaced by a verified newer update;
- `REJECT`: unacceptable security, license, compatibility, or ownership risk;
- `BLOCKED`: required access or evidence unavailable.

Include the evidence and required next action for every non-merge result.

### 7. Process and clean up when authorized

For each pull request covered by the named approval input or
`PROCESS ALL SAFE UPDATES`, identify its permitted operation and run only the
matching procedure:

- `MERGE`: confirm the current head SHA and checks, resolve review conversations,
  merge with the requested method, and verify the merge commit and post-merge
  workflows;
- `UPDATE`: apply only the approved compatibility, configuration, lockfile, or
  documentation changes, validate them in the isolated environment, and update
  the pull-request branch without merging;
- `REBASE` or `RETARGET`: perform only that branch or base operation, then wait
  for fresh mergeability and checks without merging;
- `CLOSE`: verify the superseding pull request or documented rejection reason,
  then close without merging;
- `DELETE BRANCH`: delete only when the branch cleanup authorization covers the
  exact branch and its merge or other safe disposition is verified.

Do not infer one permitted operation from another. Refresh the read-only status
of the remaining dependency queue after each processed item, but do not modify
an unapproved pull request.

After authorized processing, synchronize each processed pull request's verified
base branch only when the processing scope includes local checkout
reconciliation. Delete branches only as allowed by the branch cleanup
authorization.

In `ASSESS ONLY` mode, do not switch branches, pull, fetch, prune, or change
refs. Report observed divergence, remaining dependency pull requests, and stale
automated branches without modifying them.

### Completion report

Provide:

- complete dependency PR inventory;
- release-note and advisory findings;
- validation by update;
- disposition and rationale for every PR;
- merged commits and post-merge results;
- closed, retained, blocked, or superseded items;
- final branch and dependency-alert state.
