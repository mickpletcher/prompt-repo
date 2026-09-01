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
- Merge method: `[SQUASH | MERGE | REBASE]`
- Authorization: `[ASSESS ONLY | MERGE APPROVED UPDATES | PROCESS ALL SAFE UPDATES]`
- Branch cleanup authorization: `[KEEP ALL | DELETE NAMED BRANCHES | DELETE MERGED UPDATE BRANCHES]`

Default to assessment only. Do not assume an automated update is safe because
it was opened by Dependabot, Renovate, or another trusted bot.

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

Run the repository's complete relevant suite for each logical update group:

- unit, integration, and regression tests;
- lint, formatting, type, and compilation checks;
- clean dependency installation;
- packaging and artifact smoke tests;
- platform and runtime matrix;
- security and license scans;
- generated-file and documentation checks.

Add focused tests for a breaking behavior or prior regression when the update
affects a critical path.

### 5. Resolve overlaps and conflicts safely

Process shared workflow and base dependency changes before updates that touch
the same lines. After each merge:

- refresh each remaining PR against its verified target base branch;
- re-evaluate superseded versions;
- resolve conflicts explicitly;
- preserve all intended action or package versions;
- rerun checks on the new head SHA.

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

### 7. Merge and clean up when authorized

For each approved merge:

1. Confirm current head SHA and checks.
2. Resolve review conversations.
3. Merge with the requested method.
4. Verify the merge commit and post-merge workflows.
5. Delete the source branch only when the branch cleanup authorization covers
   it and the merge is verified.
6. Refresh the remaining dependency queue.

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
