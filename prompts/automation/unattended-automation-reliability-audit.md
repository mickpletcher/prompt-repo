# Unattended Automation Reliability Audit

Use this prompt to determine whether a scheduled or triggered automation
produces the intended result reliably instead of merely exiting successfully.

## Prompt

Audit this unattended automation:

- Repository or automation location: `[INSERT PATH OR URL]`
- Workflow, task, or job name: `[INSERT NAME]`
- Trigger or schedule: `[INSERT TRIGGER]`
- Intended business outcome: `[INSERT MEASURABLE RESULT]`
- Source system or data: `[INSERT SOURCE]`
- Destination or artifact: `[INSERT DESTINATION]`
- Freshness requirement: `[INSERT MAXIMUM AGE OR EXPECTED CADENCE]`
- Notification channel, if any: `[INSERT CHANNEL OR NONE]`
- Requested mode: `[ASSESSMENT ONLY | REPAIR APPROVED ISSUES]`

Default to `ASSESSMENT ONLY`. A green scheduler, process, or workflow status is
not proof that the intended business outcome occurred.

### 1. Define success before inspecting implementation

Translate the intended outcome into machine-checkable conditions. Examples:

- expected records were added or updated;
- an artifact exists, is valid, and is fresh;
- a destination state matches the source state;
- a notification was delivered for a real failure;
- a no-change run correctly reports that nothing needed to change.

Define valid states such as `success`, `no_change`, `partial`, `blocked`,
`stale`, and `error`. State which conditions must cause a nonzero exit or failed
job.

### 2. Map the entire execution path

Inspect:

- schedule, event filters, time zone, manual trigger, and disabled-state risks;
- concurrency, overlap, cancellation, locks, and stale-lock recovery;
- permissions, identity, secrets, network access, and environment differences;
- checkout, dependency setup, cache, source retrieval, transformation,
  validation, publication, commit, push, and notification steps;
- timeouts, retry behavior, retention, and cleanup;
- status summaries, logs, metrics, artifacts, and operator runbooks.

Confirm the branch, environment, account, and destination actually used by the
job. Do not assume the workflow file being inspected is the one being executed.

### 3. Test for silent green failures

Look for cases where:

- an exception is caught, logged, and then converted into exit code zero;
- per-item failures are ignored and the aggregate job reports success;
- an error status is written to an artifact but never checked by the workflow;
- zero records, an empty response, stale input, or an unchanged destination is
  accepted when work was expected;
- a fallback returns old data without marking the result stale;
- a no-op commit step hides an earlier collection or validation failure;
- a successful process exit is treated as successful publication;
- downstream workflows are expected to run from an event that cannot trigger
  them.

Inspect the final status artifact or destination, not only console output.
Require explicit failure when the intended outcome is missing or invalid.

### 4. Verify data quality and freshness

Validate source and destination data before replacement or publication:

- schema and required fields;
- expected identity and source URL or tenant;
- record counts and reasonable bounds;
- uniqueness and deterministic keys;
- timestamps, age, and monotonic progress;
- checksums or signatures when provided;
- partial downloads and truncated responses;
- rejection of a smaller or older dataset when that would destroy valid state.

Preserve the last known good destination when download, parsing, validation, or
publication fails. Clearly distinguish preserved old data from a fresh success.

### 5. Verify safe reruns

Test:

- repeated execution for the same scheduled period;
- duplicate events and replayed messages;
- an interrupted run followed by retry;
- overlapping runs and lock expiry;
- no-change runs;
- partial destination writes;
- source recovery after repeated failures.

The automation should be idempotent or have explicit duplicate protection.
Commit and publish only when validated output changed.

### 6. Make failures operationally visible

Require a concise health record containing only approved fields such as:

- automation name;
- start and finish time;
- outcome category;
- counts;
- duration;
- source freshness;
- sanitized error category;
- run or correlation identifier.

Exclude credentials, tokens, private URLs, record contents, user data, local
paths, configuration contents, and raw responses.

Notifications must be optional and disabled by default unless the project
explicitly requires them. Rate-limit repeated identical failures. Send a
recovery notification when useful. Invoke notifier commands directly without a
shell when possible, and never place secrets in command arguments.

### 7. Validate representative failure paths

Test at least:

- authentication or authorization failure;
- DNS, connection, TLS, timeout, and rate-limit failure;
- upstream 4xx and 5xx responses;
- empty, malformed, duplicate, stale, and unexpectedly small input;
- destination permission or storage failure;
- invalid status artifact;
- notification failure;
- repeated identical failure and later recovery.

Confirm each case produces the correct job status, preserves valid prior state,
records a privacy-safe health result, and does not create duplicate output.

### 8. Repair only when authorized

In `REPAIR APPROVED ISSUES` mode:

1. Fix the smallest root cause rather than suppressing the symptom.
2. Add a regression test that fails against the previous behavior.
3. Make error states fail the job explicitly.
4. Keep status records and notifications privacy safe.
5. Update operator documentation and troubleshooting guidance.
6. Run a manual or isolated end-to-end execution when safe.
7. Verify the final destination or artifact, not only the process exit.

Do not rotate credentials, change production schedules, enable notifications,
or mutate live data unless those actions are explicitly approved.

### Completion report

Report:

- actual trigger and execution path;
- defined success conditions;
- whether recent runs produced valid and fresh outcomes;
- silent-failure risks and reproduced failures;
- changes and regression tests;
- privacy-safe monitoring and notification behavior;
- remaining live, permission, or operator validation.
