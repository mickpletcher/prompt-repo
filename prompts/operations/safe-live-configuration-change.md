# Safe Live Configuration Change

Use this prompt to plan, apply, and verify one authorized configuration change
to a live service, endpoint platform, cloud resource, or infrastructure system.

## Prompt

Handle this live configuration change:

- Target system and environment: `[INSERT TARGET]`
- Management interface or API: `[INSERT INTERFACE]`
- Requested change: `[INSERT EXACT CHANGE]`
- Reason and expected outcome: `[INSERT DETAILS]`
- Current known state: `[INSERT STATE OR UNKNOWN]`
- Scope of affected users, devices, or services: `[INSERT SCOPE]`
- Maintenance window: `[INSERT WINDOW OR NONE]`
- Approved credentials and permissions: `[INSERT NONSECRET DESCRIPTION]`
- Rollback mechanism: `[INSERT METHOD OR UNKNOWN]`
- Requested mode: `[PLAN ONLY | APPLY EXACT CHANGE]`

Default to plan only. Authorization for one change does not authorize adjacent
optimizations, cleanup, upgrades, policy changes, restarts, or additional
targets.

### 1. Verify identity and authority

Before changing anything:

- confirm the tenant, subscription, site, server, device collection, resource,
  policy, environment, and target identifiers;
- confirm the authenticated identity and minimum required permissions;
- verify the user authorized the exact change in the stated environment;
- identify organization policy, change-control, maintenance, and approval
  requirements;
- ensure the command or API will not fan out beyond the stated scope.

Never request credentials in chat. Use approved local secret sources and keep
secret values out of files, process arguments, logs, transcripts, screenshots,
and reports.

### 2. Capture a read-only baseline

Read the current live state immediately before planning. Record only the minimum
privacy-safe evidence needed:

- relevant setting and effective value;
- target identity and version;
- dependent services or policies;
- current health and recent failures;
- resource counts rather than private records where possible;
- existing configuration export, backup, or restore point and any recovery
  artifact still needed for rollback.

In `PLAN ONLY` mode, inspect existing recovery artifacts and report missing
ones. Do not create or modify backups, snapshots, restore points, exports, or
retention settings. In `APPLY EXACT CHANGE` mode, create a required recovery
artifact only when the approved change scope explicitly covers it.

Distinguish configured state, effective state, cached state, and observed
behavior. A successful setting read does not prove the system currently behaves
as intended.

### 3. Analyze impact

Explain:

- what will change and what will not;
- affected users, devices, traffic, data, and integrations;
- propagation or convergence delay;
- restart, reconnect, sync, or maintenance requirements;
- known dependencies and conflicts;
- security, privacy, availability, and cost impact;
- expected success evidence;
- failure symptoms and escalation path.

Use current official documentation for unstable service behavior. Report when
documentation or live access is unavailable.

### 4. Build rollback before apply

Define an exact rollback procedure containing:

- the previous value or restorable artifact;
- command or API required to restore it;
- prerequisites and permissions;
- time limit or point after which rollback is unsafe;
- verification after rollback;
- alternative recovery if the normal management path fails.

Do not apply a consequential change when the current state cannot be captured or
restored and the user has not explicitly accepted that risk.

### 5. Present the execution plan

Before mutation, state:

1. exact target;
2. exact current value;
3. exact desired value;
4. command or API operation;
5. expected immediate response;
6. verification steps;
7. rollback trigger and procedure;
8. monitoring period.

In `PLAN ONLY` mode, stop here.

### 6. Apply one scoped change

In `APPLY EXACT CHANGE` mode:

1. Re-read the target and preconditions.
2. Stop if identity, value, version, health, or scope changed.
3. Use idempotent operations where available.
4. Apply only the approved setting.
5. Capture the sanitized response and correlation identifier.
6. Do not proceed to another recommendation automatically.

Avoid broad wildcard targets, unresolved variables, destructive defaults, and
automatic retries of non-idempotent mutations.

### 7. Verify actual outcome

Verify through at least two applicable layers:

- configuration read-back;
- effective policy or resolved configuration;
- service health;
- controlled functional probe;
- representative client or endpoint state;
- monitoring or audit event.

Account for propagation delay. Do not interpret a delayed cleanup process,
cached value, or stale dashboard as immediate failure without checking the
system's documented timing.

If verification fails or the result is partial, stop, preserve evidence, and
execute the approved rollback when its trigger conditions are met.

### 8. Close out the change

Record:

- previous and new sanitized state;
- actor, time, target, and correlation ID;
- validation and monitoring results;
- rollback status;
- documentation, report, or configuration-as-code updates required to prevent
  drift.

Never place private exports, tenant identifiers, credentials, property data, or
customer-specific evidence in a public repository.

### Completion report

Provide:

- target and approved scope;
- baseline and impact analysis;
- applied command or API operation with secrets removed;
- read-back and functional verification;
- propagation or monitoring status;
- rollback readiness or execution;
- remaining risks and the next separately approvable change.
