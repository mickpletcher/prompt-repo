# Physical Device Change Readiness Gate

Use this prompt to keep software that interacts with a physical device read-only
until evidence, recovery, authorization, and failure testing justify a narrowly
scoped write capability.

## Prompt

Assess readiness for this physical-device change:

- Repository path or URL: `[INSERT REPOSITORY PATH OR URL]`
- Device type and model: `[INSERT DEVICE]`
- Firmware or operating-system version: `[INSERT VERSION OR UNKNOWN]`
- Intended change: `[INSERT CHANGE]`
- Proposed transport or tool: `[USB | SERIAL | MTP | ADB | VENDOR TOOL | OTHER]`
- Official vendor documentation: `[INSERT URL OR NONE]`
- Available physical test device: `[YES | NO]`
- Current backup and recovery method: `[INSERT METHOD OR NONE]`
- Authorization to perform physical writes: `[YES | NO]`

Physical writes are unavailable by default. Planning, simulation, fake-device
tests, UI prototypes, and successful read-only discovery do not authorize or
prove a physical write workflow.

### Hard boundary

Do not add, expose, invoke, or test a physical write command unless every gate
below is satisfied and the user explicitly authorizes the exact operation on
the identified device.

This restriction includes indirect writes such as:

- pairing, enrollment, registration, or trust establishment;
- installing a helper, application, profile, driver, or certificate;
- changing a setting during discovery;
- triggering synchronization, reset, reboot, firmware update, or migration;
- opening a database or filesystem through a library that creates journals,
  sidecars, indexes, or schema upgrades.

When uncertain, stop at read-only evidence collection.

### Gate 1. Confirm identity and scope

Verify without changing the device:

- manufacturer, model, hardware revision, unique device class, and connection
  mode;
- firmware or operating-system version;
- current configuration or capability summary;
- intended setting, accepted values, dependencies, and expected effect;
- whether the target is local, cloud-synchronized, account-bound, or managed by
  another application.

Redact serial numbers, account names, device names, location data, health data,
and other identifiers from reports and fixtures.

### Gate 2. Establish a supported transport

Use current official vendor documentation where available. Determine:

- whether the transport is documented and authorized for the intended use;
- authentication, pairing, permissions, drivers, and platform requirements;
- read and write commands or APIs and their version limits;
- vendor backup, restore, export, and recovery behavior;
- warranty, safety, account, licensing, and acceptable-use constraints.

Do not select a transport because another product from the vendor uses it. Do
not treat reverse-engineered behavior as supported without labeling it clearly
and obtaining approval for the added risk.

### Gate 3. Build a capability manifest

Represent device support explicitly. For every proposed setting or operation,
record:

- model and version range;
- read support;
- write support;
- accepted values and units;
- dependencies and conflicts;
- backup and rollback support;
- evidence source;
- verification status;
- behavior when identity or version is unknown.

Unknown or unsupported capabilities must remain read-only and fail with a clear
message. Never guess a selector, control, path, or setting from UI text alone.

### Gate 4. Separate simulation from hardware evidence

An offline simulator or fake adapter may validate:

- planning logic;
- validation and comparison;
- state-machine orchestration;
- retry, resume, and rollback sequencing;
- user-interface and command-line behavior;
- audit and redaction output.

It does not validate:

- physical selectors or protocol details;
- timing, disconnect, power-loss, or firmware behavior;
- actual persistence;
- device-side validation;
- vendor-tool interaction;
- successful recovery of a physical device.

Label simulated evidence as simulation. Ensure read-only commands cannot
construct a write-capable transport merely because a fake adapter exists.

### Gate 5. Prove backup and recovery

Before any write:

1. Capture the complete state required to reverse the proposed change.
2. Prefer a documented vendor-native backup or export.
3. Record firmware, tool version, format, hashes, and device compatibility.
4. Validate backup integrity.
5. Rehearse restoration using an isolated, vendor-supported, or otherwise safe
   method.
6. Define recovery for disconnect, timeout, partial write, invalid state, power
   loss, and application crash.
7. Prove that rollback does not depend on the same failed step without an
   independent recovery path.

If recovery cannot be demonstrated, physical writes remain blocked.

### Gate 6. Test adversarial failure paths

Use simulation first, then controlled physical read-only tests. Cover:

- wrong device, unknown firmware, unsupported capability, and stale state;
- authentication and authorization failure;
- disconnect before, during, and after the proposed change;
- timeout, retry, duplicate request, and interrupted resume;
- invalid value, device rejection, partial result, and verification mismatch;
- concurrent vendor software or synchronization;
- rollback failure and unavailable recovery tooling.

Automatic retry must not duplicate a consequential operation. A transport error
must not skip restoration or falsely report success.

### Gate 7. Record the decision

Before enabling writes, create or update an architecture decision record that
contains:

- exact authorized scope;
- evidence for supported devices and versions;
- alternatives considered;
- safety, privacy, legal, and operational risks;
- backup and recovery proof;
- independent review results;
- failure-test evidence;
- rollout, monitoring, rollback, and disablement plan;
- operations that remain prohibited.

Obtain explicit approval for the decision and the first physical operation.

### Gate 8. Stage the first authorized write

Only after Gates 1 through 7 pass:

1. Require an explicit command, device identity confirmation, intended old and
   new values, and final user confirmation.
2. Re-read current state immediately before the write.
3. Refuse the operation if preconditions changed.
4. Apply one reversible change to one noncritical test device.
5. Read back and independently verify the result.
6. Monitor persistence across reconnect or reboot only when that action is also
   authorized and safe.
7. Roll back on mismatch and retain complete privacy-safe evidence.
8. Keep a kill switch that disables all write paths.

Do not expand model, firmware, setting, or fleet coverage based on one successful
test.

### Required readiness report

Report each gate as `PASS`, `FAIL`, `BLOCKED`, or `NOT ASSESSED`, with evidence.
Include:

- confirmed device and capability scope;
- simulation evidence separated from physical evidence;
- vendor and authorization status;
- backup, recovery, and failure-test results;
- privacy and safety controls;
- exact reasons physical writes remain unavailable;
- the narrowly scoped next read-only action or approval required.
