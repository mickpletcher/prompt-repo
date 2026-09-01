# Safe Backlog Item Implementation

Use this prompt to implement one approved backlog or future-upgrade item from
explicit acceptance criteria while preserving repository state and safety
boundaries.

## Prompt

Implement this approved backlog item:

- Repository path or URL: `[INSERT REPOSITORY PATH OR URL]`
- Item identifier: `[INSERT ITEM ID]`
- Source tracking file: `[INSERT FILE PATH]`
- Acceptance criteria: `[INSERT COMPLETE ACCEPTANCE CRITERIA]`
- Explicitly out of scope: `[INSERT EXCLUSIONS]`
- Required platforms or integrations: `[INSERT REQUIREMENTS]`
- Delivery target: `[LOCAL CHANGE | DRAFT PR | READY PR | MERGE]`
- Base branch: `[INSERT BASE BRANCH]`

The acceptance criteria are the approved scope. Do not infer permission for
unrelated backlog items, destructive operations, live account changes, physical
device writes, deployments, releases, or external-system mutations.

### 1. Confirm the item is real and current

Before editing:

1. Read all applicable repository instructions and source-of-truth documents.
2. Inspect the current branch, commit, worktree, remotes, and relevant pull
   requests.
3. Locate the exact item identifier and acceptance criteria in the tracking
   file.
4. Search completed tracking, history, code, tests, and documentation to
   determine whether the item is already implemented, partially implemented,
   duplicated, superseded, or blocked.
5. Check identifier uniqueness before adding or moving any tracking entry.
6. Preserve unrelated tracked and untracked files. Never reset or publish
   another person's work.

If the item is already complete, verify it and report the evidence without
creating a duplicate implementation. If the tracker conflicts with the code,
report the discrepancy before deciding which artifact should change.

### 2. Convert acceptance criteria into a delivery plan

Map every criterion to:

- affected components;
- implementation work;
- positive, negative, failure-path, and regression tests;
- documentation and tracking updates;
- platform, packaging, integration, manual, or physical validation;
- privacy, security, rollback, and compatibility risks.

Call out any criterion that cannot be completed in the available environment.
Do not silently narrow the item.

Choose the smallest coherent implementation that satisfies the criteria. Avoid
speculative architecture, unrelated refactoring, and compatibility shims for
behavior that is explicitly being replaced.

### 3. Implement safely

1. Create a focused branch unless repository instructions require another
   workflow.
2. Reuse existing architecture and conventions.
3. Keep read-only discovery separate from mutating behavior.
4. Put consequential behavior behind an explicit user choice, plan/apply gate,
   feature flag, or other approval boundary when the criteria require one.
5. Preserve existing data until replacement output has been staged and
   validated.
6. Add rollback or recovery behavior for operations that can leave partial
   state.
7. Fail clearly on unsupported versions, malformed state, missing capabilities,
   or incomplete prerequisites.
8. Keep credentials, private paths, user data, local reports, and environment
   details out of source control and public artifacts.

Do not weaken an existing safety control, test, branch protection, dependency
gate, or security check merely to complete the item.

### 4. Test the behavior that matters

Add focused tests before relying on the complete suite. Cover:

- every acceptance criterion;
- supported and unsupported inputs;
- empty, malformed, duplicate, stale, partial, and large data;
- cancellation, timeout, dependency failure, and rollback;
- idempotent reruns;
- privacy and secret redaction in serialized output;
- regressions in existing features and supported platforms;
- packaged or installed behavior when the project ships an artifact.

Use isolated copies, temporary profiles, fixtures, fakes, or test accounts for
integration work. A mock or simulator proves orchestration, not live service,
browser, operating-system, or physical-device compatibility.

Run the repository's complete relevant test, lint, type, build, package,
security, generated-file, and documentation checks. Record exact commands and
exit results.

### 5. Keep tracking and documentation truthful

Update every affected source of truth in the same change. Depending on the
repository, this may include:

- README and usage documentation;
- assessment and architecture records;
- changelog or change fragment;
- validation and operations guidance;
- future-upgrade and completed-upgrade files;
- requirement traceability and decision records.

Move the item to completed tracking only when every required acceptance
criterion is complete. If delivery is intentionally phased:

- keep the item open;
- mark the completed criteria precisely;
- list the remaining criteria and blockers;
- do not describe the partial phase as full completion.

### 6. Review and deliver

Before committing:

1. Review the diff for correctness, scope, private data, generated files, and
   accidental changes.
2. Confirm the worktree contains only intended modifications plus clearly
   identified pre-existing work.
3. Stage explicit paths.
4. Run the final validation suite from the state being committed.
5. Follow the requested pull-request, review, check, merge, branch-cleanup, and
   synchronization workflow.

Do not merge when required checks, review conversations, acceptance tests, or
explicit manual gates remain incomplete. Do not delete a branch until its merge
and remote state are verified.

### Completion report

Report:

- item identifier and delivered scope;
- acceptance-criterion coverage;
- files changed and important design decisions;
- exact validation results;
- tracking and documentation updates;
- remaining criteria, blockers, or manual gates;
- commit, pull request, merge, and cleanup state as applicable.
