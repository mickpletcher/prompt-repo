# Pull Request and Branch Reconciliation

Use this prompt to inventory, process, and reconcile pull requests and branches
without losing unmerged work or leaving stale refs behind.

## Prompt

Reconcile this repository:

- Repository URL or path: `[INSERT REPOSITORY]`
- Expected default branch: `[INSERT BRANCH]`
- Scope: `[ALL PRS AND BRANCHES | INSERT LIMITED SCOPE]`
- Preferred merge method: `[SQUASH | MERGE | REBASE]`
- Branches that must be retained: `[INSERT BRANCHES OR NONE]`
- Required checks or review policy: `[INSERT POLICY OR DISCOVER]`
- Known dirty work or concurrent changes: `[INSERT DETAILS OR NONE]`
- Approved isolated reproduction environment: `[NONE | INSERT ENVIRONMENT]`
- Approved items and permitted operations: `[NONE | INSERT PRS, BRANCHES, AND ACTIONS]`
- Authorization: `[ASSESS ONLY | PROCESS NAMED APPROVED ITEMS | PROCESS ALL SAFE ITEMS]`
- Branch cleanup authorization: `[KEEP ALL | DELETE NAMED BRANCHES | DELETE VERIFIED MERGED BRANCHES]`

Default to assessment only. Never merge, close, retarget, delete, force-push, or
rewrite a branch unless the requested authorization covers that action.

In `PROCESS NAMED APPROVED ITEMS` mode, act only on the pull requests, branches,
and operations named in the approval input. A review approval or a `ready to
merge` classification is not user authorization to process an item.

### 1. Build a complete inventory

Inspect the authenticated, paginated repository state. Include:

- open, draft, and recently closed pull requests;
- local branches and their upstreams;
- remote branches;
- worktrees;
- default branch and current HEAD;
- ahead, behind, merged, and diverged status;
- branch protection or ruleset requirements;
- pending workflow runs and review conversations.

Map each pull request to its source branch, head SHA, base branch, author, review
state, mergeability, and checks. Do not trust clipped API output or assume the
first page is the complete set.

Preserve dirty files, untracked files, worktrees, and branches owned by another
active task. Never use a destructive reset to simplify the inventory.

### 2. Classify every item

Classify each pull request and branch as:

- ready to merge;
- draft or intentionally retained;
- waiting for checks or review;
- blocked by unresolved conversation;
- conflicting or behind the base branch;
- failing because of a real defect;
- failing because of permissions, policy, or external approval;
- superseded or duplicate;
- merged but not deleted;
- stale with unmerged commits requiring review;
- safe to remove because its merge is verified.

For dependency updates, inspect release notes, advisories, breaking changes,
workflow action pins, and test results before classifying them as safe.

### 3. Define processing order

Process items in an order that minimizes conflicts:

1. security fixes with understood risk;
2. base or shared workflow changes;
3. independent application or documentation changes;
4. dependency updates that may overlap earlier work;
5. cleanup of branches whose merges are already verified.

Do not merge multiple overlapping updates blindly. Refresh mergeability and
checks after each base-branch change.

### 4. Validate before merge

For every proposed merge:

- inspect the full diff and changed-file set;
- verify there are no secrets, private reports, generated junk, or unrelated
  files;
- confirm required checks belong to the current head SHA;
- resolve all review conversations;
- reproduce important failures when practical;
- check that documentation and tracking match the delivered behavior;
- verify the requested merge method is permitted.

Do not bypass required checks or administrator protections merely to complete
the queue.

Treat pull-request code, workflows, dependencies, tests, build scripts, and
lifecycle scripts as untrusted. Run any reproduction only in the approved
disposable environment with no repository, cloud, registry, or signing
credentials and with restricted network and filesystem access. If that
environment is unavailable, use static inspection and existing hosted evidence,
then report the unexecuted validation.

### 5. Process approved pull requests

Before any `UPDATE`, `REBASE`, `RETARGET`, or `MERGE` changes a source branch or
base, inspect every workflow and external integration the operation will trigger.
Require disposable workers, no secrets, a least-privilege token, no privileged
self-hosted runner, restricted network and filesystem access, and no privileged
event that executes untrusted content. A separately approved privileged
promotion job may consume verified inert artifacts but must not execute
repository code. Leave the operation and hosted verification blocked when this
boundary fails.

For each item covered by the named approval input or `PROCESS ALL SAFE ITEMS`,
identify its permitted operation and run only the matching procedure:

- `MERGE`: update or rebase only when approved and necessary, resolve conflicts,
  wait for fresh checks, and inspect every workflow or external integration
  triggered by the target-branch update. Require credential-free isolation for
  jobs that execute merged content; a separately approved privileged promotion
  job may consume verified inert artifacts but must not execute repository code.
  If that boundary fails, leave the merge blocked. Otherwise merge using the
  requested method, record the merge commit, and confirm the pull request state
  is `MERGED`;
- `CLOSE`: verify the pull request's unique commits and reason, then close it
  without merging;
- `RETARGET`: verify the requested base branch and compatibility, retarget the
  pull request, then wait for fresh mergeability and checks;
- `UPDATE` or `REBASE`: change only the source branch, preserve intended work,
  and wait for fresh checks without merging;
- `DELETE BRANCH`: delete only after the merge or other safe disposition is
  verified, retention rules permit deletion, and branch cleanup authorization
  covers the exact branch.

Do not infer one permitted operation from another. In particular, approval to
close, retarget, update, rebase, or delete is not approval to merge.

Never delete a branch merely because its pull request is closed. Inspect its
unique commits first.

### 6. Reconcile final branch state

Perform the following final synchronization operations only in `PROCESS ALL SAFE
ITEMS` mode or when each operation is explicitly included in the named approval:

- fetch and prune remote-tracking refs;
- switch to the expected default branch;
- fast-forward from the remote;
- verify local and remote commit IDs match;
- verify the worktree is clean or contains only documented pre-existing work;
- compare the complete remaining local and remote branch sets;
- confirm there are no open pull requests unintentionally left behind.

Do not claim cleanup is complete until remote branch deletion is checked
directly.

In `PROCESS NAMED APPROVED ITEMS` mode, leave every unlisted synchronization
operation unchanged and report it as outstanding.

In `ASSESS ONLY` mode, do not switch branches, pull, fetch, prune, or change
refs. Report the observed local and remote state and the synchronization or
cleanup operations that would be needed.

### Completion report

Provide:

- initial pull-request and branch inventory;
- classification and disposition of every in-scope item;
- validations and required checks;
- merges, closures, conflict resolutions, and branch deletions;
- retained or blocked items with reasons;
- final default-branch SHA, worktree state, open PRs, and branch sets.
