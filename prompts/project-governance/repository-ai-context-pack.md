# Repository AI Context Pack Generation and Refresh

Use this prompt to create or refresh a compact, evidence-based repository
context pack that helps future AI agents find the right source files without
treating a generated summary as current source of truth.

## Prompt

Create or review this repository's AI context pack:

- Repository path or URL: `[INSERT REPOSITORY]`
- Base branch and expected revision: `[INSERT BRANCH AND COMMIT OR UNKNOWN]`
- Existing documentation authorities: `[INSERT PATHS OR UNKNOWN]`
- Detailed context file: `[DEFAULT: project-analysis.md]`
- Quick context file: `[DEFAULT: quick-context.md]`
- Agent entry file to update, if any: `[AGENTS.md | OTHER PATH | NONE]`
- Detailed context budget: `[DEFAULT: 2,000 TO 5,000 TOKENS]`
- Quick context budget: `[DEFAULT: 600 TO 1,000 TOKENS]`
- Excluded files, data, or systems: `[INSERT EXCLUSIONS OR NONE]`
- Approved disposable execution environment: `[NONE | INSERT ENVIRONMENT]`
- Approved execution and validation scope: `[NONE | EXISTING EVIDENCE ONLY | INSERT EXACT COMMANDS]`
- Approved file changes: `[NONE | INSERT EXACT PATHS OR SCOPE]`
- Approved constrained Git publishing environment: `[NONE | INSERT ENVIRONMENT]`
- Requested mode: `[ASSESSMENT ONLY | GENERATE LOCAL PACK | REFRESH LOCAL PACK | CONTEXT PACK PR]`

Default to `ASSESSMENT ONLY`. Do not create, replace, commit, or publish context
files unless the requested mode and approved file changes authorize them.

### 1. Establish the repository state

Before relying on existing summaries:

1. Read repository instructions, contribution rules, documentation maps,
   requirements, architecture records, assessments, validation guidance,
   changelogs, and current work tracking.
2. Inspect the current branch, commit, worktree status, recent history, and
   relevant generated-file rules. Preserve unrelated tracked and untracked work.
3. Identify the project's purpose, supported users and platforms, entry points,
   runtime, dependencies, external systems, data stores, build, tests,
   deployment, operations, and security boundaries.
4. Record unavailable areas and exclusions. Never present an uninspected file,
   service, repository setting, or runtime behavior as verified.

For an initial generation, inspect the repository broadly enough to support
every included claim. For a refresh, examine changes since the context pack's
recorded source revision, then verify every affected claim against the current
repository. Fall back to a broader review when the recorded revision is absent,
cannot be resolved, or predates major restructuring.

Do not execute repository code, dependencies, hooks, installers, or generated
commands unless the approved execution scope covers the exact action and the
environment is disposable, credential-free, and restricted.

### 2. Define the context pack's authority

Treat both context files as derived navigation aids, not independent sources of
truth. Current code, configuration, tests, requirements, and their declared
documentation authorities continue to govern their respective questions.

Before creating files:

- identify existing documents that already cover architecture, operations,
  validation, current status, technical debt, and decisions;
- link to those authorities instead of copying large sections;
- avoid creating a second architecture, assessment, backlog, or requirements
  document under a new filename;
- recommend no new context files when existing documentation plus a short agent
  routing section already provides the same value;
- state that future agents must verify the files relevant to their task and must
  not treat the context pack as permission to skip current evidence.

### 3. Write the detailed context file

Keep the detailed file within its token budget. Include only sections that apply:

1. **Context metadata**
   - generation or refresh date in ISO 8601 format;
   - source branch and full commit identifier;
   - generation mode and coverage;
   - exclusions, unavailable evidence, and unverified claims;
   - paths of authoritative project documents.
2. **Project purpose and boundaries**
   - problem solved, intended users, supported platforms, non-goals, and current
     lifecycle state.
3. **Architecture and repository map**
   - major components, dependency direction, entry points, important folders,
     and the smallest useful set of files to read for common task types.
4. **Runtime and data flow**
   - triggers, inputs, transformations, persistence, outputs, external calls,
     failure paths, recovery, and important state transitions.
5. **Configuration and integrations**
   - configuration files, required environment-variable names without values,
     permissions, external services, schemas, and generated artifacts.
6. **Build, test, release, and operations**
   - verified commands, supported environments, CI gates, packaging, deployment,
     monitoring, backup, recovery, and manual acceptance gates.
7. **Security and privacy boundaries**
   - trust boundaries, credential model, sensitive-data handling, network access,
     destructive or live-operation gates, and safe defaults.
8. **Current risks and limitations**
   - confirmed defects, technical debt, fragile areas, missing evidence, and
     links to their authoritative trackers. Do not turn speculative concerns
     into facts.
9. **Extension and change map**
   - where common changes belong, interfaces that must remain stable, required
     tests, generated-file steps, and non-obvious constraints.
10. **Glossary and evidence index**
    - project-specific terms and concise links to the files supporting the most
      important claims.

Use repository-relative paths and line references where practical. Mark an
inferred statement as `Inference` and explain the evidence behind it. Prefer a
link to the authoritative file over copied prose.

### 4. Write the quick context file

The quick file must stand on its own and stay within its smaller token budget.
Include:

- one-paragraph project identity and current lifecycle state;
- source branch, commit, and refresh date;
- critical safety, privacy, scope, and compatibility constraints;
- primary entry points and a compact repository map;
- the verified commands most often needed for setup and validation;
- current blockers, manual gates, and known unverified claims;
- a routing table that tells an agent which authoritative files to read for
  architecture, requirements, current status, tests, operations, and changes;
- explicit conditions requiring the detailed context file or direct source
  inspection.

Do not use the quick file to duplicate detailed component descriptions,
historical narrative, long command output, or full dependency inventories.

### 5. Add agent routing only when approved

If an agent entry file exists and its update is approved, add a short routing
section that says:

1. Read the quick context first for orientation.
2. Read the detailed context only when the task needs broader architecture or
   cross-component information.
3. Read the authoritative source and documentation files relevant to the task.
4. Verify branch, commit, worktree, and recent changes before editing.
5. Treat a stale or conflicting context claim as a documentation defect, not as
   authority over current repository evidence.

Preserve existing agent instructions. Do not replace project-specific safety,
testing, review, or delivery rules with this routing section.

### 6. Protect sensitive information

Never put secret values, credentials, tokens, private keys, customer data,
personal records, private URLs, machine-specific paths, raw logs, browsing
history, account identifiers, or confidential source excerpts into the context
pack.

Record environment-variable names and credential mechanisms only. Use sanitized
examples. If a useful claim cannot be documented safely, describe the category
and point to its approved internal authority without copying the data.

### 7. Define refresh and staleness rules

The context pack must declare itself stale when any of these change materially:

- architecture, entry points, dependency direction, or data flow;
- supported platforms, runtime, build, test, release, or deployment process;
- integrations, schemas, permissions, security boundaries, or data handling;
- authoritative requirements, decisions, operational procedures, or known
  limitations;
- paths referenced by the context pack.

Prefer a deterministic freshness check that compares the recorded source commit
with current changes and verifies referenced paths. Do not claim semantic
accuracy from a timestamp or hash alone.

If automated regeneration is requested, propose it as a reviewed pull request
with least-privilege permissions, no production secrets, pinned dependencies,
bounded output, and normal validation. Do not add an unattended workflow that
commits AI-generated documentation directly to the default branch.

### 8. Validate the result

Run only the approved validation. When authorized, verify:

- every important claim against current repository evidence;
- every referenced path and local link;
- Markdown lint and repository documentation checks;
- token or word budgets for both files;
- absence of secret values, personal paths, copied private data, and large source
  excerpts;
- no duplicate authority or contradiction with project documentation;
- `git diff --check` and a final diff limited to approved files.

Ask a reviewer unfamiliar with the project to use the quick file to locate the
correct source files for one representative task when practical. Success means
faster routing to current evidence, not avoiding source inspection entirely.

### 9. Deliver only the requested mode

In `ASSESSMENT ONLY`, report whether a context pack would add value, what would
be authoritative, the proposed files, duplication risks, and a refresh plan.
Do not edit the repository.

In `GENERATE LOCAL PACK` or `REFRESH LOCAL PACK`, update only approved local
files and run the applicable validation. Leave the result uncommitted unless Git
delivery is separately authorized.

In `CONTEXT PACK PR`, validate in the approved disposable environment, inspect
repository-controlled hooks and pull-request workflows, stage only intended
paths, and use the approved constrained Git environment. Do not merge or delete
branches unless separately authorized.

### Completion report

Provide:

- source branch, commit, and inspected scope;
- files created, refreshed, or intentionally left unchanged;
- authoritative documents and routing decisions;
- claims marked inferred, excluded, unavailable, or unverified;
- validation commands and results;
- token or word counts;
- freshness triggers and recommended next refresh point;
- remaining risks and any requested approval;
- commit or pull-request link when authorized.
