# Software Project Assessment and Remediation

Use this prompt to inspect a software project, produce an evidence-based
assessment, and apply approved fixes without confusing assessment authority
with implementation authority.

## Prompt

Assess this software project:

- Repository path or URL: `[INSERT REPOSITORY PATH OR URL]`
- Requested mode: `[ASSESSMENT ONLY | REMEDIATE APPROVED FINDINGS]`
- Target platforms: `[INSERT PLATFORMS]`
- Intended audience and deployment model: `[INSERT DETAILS]`
- Reported failures or concerns: `[INSERT DETAILS OR NONE]`
- Available CI, integration, packaging, and manual test environments: `[INSERT DETAILS]`
- Known constraints or excluded areas: `[INSERT CONSTRAINTS]`
- Approval already granted for changes: `[NONE | INSERT APPROVED SCOPE]`
- Requested completion target: `[FINDINGS ONLY | LOCAL FIXES | DRAFT PR | READY PR | MERGE]`

Treat `ASSESSMENT ONLY` as the default when the requested mode is missing or
ambiguous. An assessment request does not authorize file edits, repository
setting changes, releases, deployments, or changes to external systems.

### 1. Establish the actual project state

Before judging the project:

1. Read repository instructions such as `AGENTS.md`, contribution guidance,
   architecture records, requirements, assessments, validation instructions,
   changelogs, and upgrade backlogs.
2. Inspect the current Git branch, commit, remotes, worktree status, recent
   history, open pull requests, and relevant workflow results when access is
   available.
3. Identify the project's purpose, intended users, supported platforms,
   technology stack, entry points, data stores, external integrations,
   packaging, deployment, and maintenance status.
4. Preserve unrelated tracked and untracked work. Never reset, overwrite,
   stage, commit, or publish changes that are outside the approved scope.
5. Record anything that cannot be inspected. Do not present an unavailable
   repository setting, service, test environment, or runtime as verified.

### 2. Build a reproducible baseline

Run the project's documented validation commands when they are safe and
available. Include tests, linting, formatting checks, type checks, compilation,
packaging, security scans, generated-file checks, and smoke tests as applicable.

Record:

- exact commands;
- environment and relevant tool versions;
- pass, fail, skip, or unavailable status;
- important error text and exit codes;
- whether results came from local execution, CI, a mock, a simulator, or a
  physical integration environment.

Do not treat an existing green test suite as proof that critical behavior is
correct. Add focused read-only probes when important invariants are not covered.
Reproduce failures and trace the real execution path before recommending a fix.

### 3. Review the project

Review the areas that apply to this project:

#### Correctness

- Core workflows and business invariants.
- Input validation, boundary conditions, malformed data, duplicate data, stale
  data, partial results, and ordering.
- Error propagation, cleanup, rollback, recovery, and idempotency.
- Persistence, migrations, transactions, concurrency, and data integrity.

#### Architecture and maintainability

- Module boundaries, coupling, duplication, dead code, and complexity.
- Configuration, dependency direction, extensibility, and upgrade paths.
- Compatibility claims compared with actual implementation and tests.
- Documentation drift compared with code and deployed behavior.

#### Security and privacy

- Authentication, authorization, credential handling, and least privilege.
- Injection, path traversal, unsafe deserialization, insecure temporary files,
  untrusted input, and dependency risk.
- Logs, reports, exports, backups, screenshots, fixtures, and artifacts that may
  expose private data.
- Network access, telemetry, external data transfer, and secure defaults.

#### Tests and quality gates

- Unit, integration, failure-path, regression, platform, GUI, packaging, and
  end-to-end coverage.
- Whether mocks and simulators are being mistaken for live acceptance evidence.
- CI permissions, timeouts, action pinning, dependency automation, and whether
  failures are visible.

#### User and operator experience

- Installation, first run, routine use, troubleshooting, uninstall, recovery,
  and upgrade instructions.
- Clear messages for blocked, partial, unsupported, and failed operations.
- Accessibility and novice usability when the project targets nontechnical
  users.

#### Release and operations

- Versioning, artifacts, checksums, signing status, release notes, rollback,
  monitoring, retention, and support boundaries.
- Manual or physical acceptance gates that remain incomplete.
- Claims of production or release readiness that exceed available evidence.

Only perform a deep GitHub configuration audit when it is explicitly in scope.
Otherwise, flag obvious gaps and recommend the companion GitHub repository
settings audit instead of duplicating it.

### 4. Report findings before remediation

Order findings by severity and practical impact. For every finding, provide:

- severity: Critical, High, Medium, or Low;
- evidence with file and line references or command results;
- the affected behavior or user;
- the likely root cause;
- the smallest appropriate correction;
- how the correction should be validated;
- whether approval or external access is required.

Separate confirmed defects from risks, missing evidence, optional improvements,
and out-of-scope observations. Do not inflate the rating to create work.

Finish the assessment phase with:

1. an executive verdict;
2. current strengths;
3. findings ordered by severity;
4. validation results;
5. a prioritized remediation plan;
6. decisions or access required from the user.

Stop here in `ASSESSMENT ONLY` mode.

### 5. Remediate only the approved scope

In `REMEDIATE APPROVED FINDINGS` mode:

1. Use the approval already provided to identify in-scope findings. Ask only when a finding falls outside it or a material decision is unresolved; continue independent approved work.
2. Create a focused branch unless repository instructions specify otherwise.
3. Implement the simplest complete correction. Do not add unrelated features,
   speculative abstractions, or compatibility shims for behavior being replaced.
4. Add regression and failure-path coverage before calling the finding fixed.
5. Update affected documentation, assessments, changelogs, architecture records,
   validation records, and upgrade tracking in the same change.
6. Run focused checks first, followed by the complete relevant validation suite.
7. Review the final diff for private data, credentials, generated artifacts,
   unrelated changes, and accidental scope expansion.
8. Stage only intended paths. Follow the requested commit, pull request, review,
   merge, branch cleanup, and synchronization workflow.

Do not claim completion while required CI, manual, live-service, browser,
platform, signing, or physical-device gates remain unfinished.

### Completion report

Provide:

- assessment verdict;
- confirmed findings and implemented fixes;
- files and settings changed;
- validation commands and results;
- remaining risks, manual gates, and unverified claims;
- approval or operator actions still required;
- commit and pull-request links when publication was requested.
