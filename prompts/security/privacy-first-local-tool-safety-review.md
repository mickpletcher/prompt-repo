# Privacy-First Local Tool Safety Review

Use this prompt to assess and harden a local application that reads, transforms,
backs up, synchronizes, or reports on private user data.

## Prompt

Review this local tool:

- Repository path or URL: `[INSERT REPOSITORY PATH OR URL]`
- Private data types handled: `[INSERT DATA TYPES]`
- Default input locations: `[INSERT GENERAL LOCATIONS]`
- Supported read operations: `[INSERT OPERATIONS]`
- Supported write operations: `[INSERT OPERATIONS OR NONE]`
- Reports, logs, backups, and exports: `[INSERT OUTPUTS]`
- External services or telemetry: `[INSERT SERVICES OR NONE]`
- Requested mode: `[ASSESSMENT ONLY | IMPLEMENT APPROVED FIXES]`

Do not provide real private files, credentials, account identifiers, URLs,
titles, messages, browser profiles, local paths, customer data, or generated
reports. Use sanitized fixtures and placeholders.

### 1. Establish the privacy boundary

Inventory every input, derived value, temporary file, database, cache, backup,
manifest, report, log, notification, screenshot, crash record, and network
request.

For each, record:

- why it is needed;
- the minimum fields required;
- where it is stored or transmitted;
- retention and deletion behavior;
- who or what can access it;
- whether it is enabled by default;
- how the user can inspect and disable it.

Default to local-only and offline-capable behavior. Do not add telemetry,
analytics, cloud synchronization, remote logging, or external AI processing
without explicit user opt-in and clear disclosure.

### 2. Minimize collection and output

Use strict allowlists for logs, health records, reports, manifests, and errors.
Prefer count-only or category-only summaries by default.

Detailed output must be an explicit opt-in and must state:

- which sensitive fields it contains;
- where it will be written;
- how long it will remain;
- how the user can remove it;
- that it must not be committed or shared accidentally.

Parse structured data before redacting it. For example, use a URI parser to
extract an approved hostname rather than applying fragile string replacement.
Test serialized output, not only in-memory objects, because formatting and error
handling can reintroduce private values.

### 3. Protect paths and files

Require:

- explicit, normalized destination paths;
- containment checks against approved roots;
- rejection of traversal, unsafe filenames, and unexpected absolute paths;
- safe handling of symbolic links, junctions, and reparse points;
- restrictive permissions where the platform supports them;
- temporary files in the destination directory when atomic replacement is
  required;
- cleanup on success, failure, cancellation, and crash recovery.

Never recursively delete or overwrite a broad, unresolved, or user-controlled
path. Validate the final resolved target immediately before a destructive file
operation.

### 4. Make writes transactional

For every supported write or synchronization operation:

1. Detect processes or locks that make the target unsafe to modify.
2. Capture and validate the current source state.
3. Create a backup before changing live data.
4. Write to a staged file or isolated copy.
5. Validate schema, counts, identifiers, and application-specific invariants.
6. Flush and close the staged output.
7. Replace the destination atomically when the platform supports it.
8. Verify the resulting live state.
9. Roll back automatically when a later step fails.

Transformative behavior such as deletion, deduplication, reordering, merging, or
closing another process must be opt-in. A dry run must not construct or invoke a
write-capable adapter.

### 5. Build verifiable backups

Backup manifests should contain only what recovery requires, such as:

- generated filenames;
- sizes;
- cryptographic hashes;
- timestamps;
- schema or format version;
- count-only summaries.

Reject traversal paths, malformed hashes, impossible sizes, missing members,
unexpected files, and tampered content. Do not trust file modification time as
the sole backup-ordering source when generated names contain authoritative
timestamps.

Keep retention bounded. Prune only files that match the application's exact
generated naming and manifest rules. Never delete unrelated files in a backup
directory.

### 6. Prove recovery without risking live data

Provide isolated backup verification and recovery rehearsal:

- use a temporary copy, temporary profile, isolated database, or application
  sandbox;
- never open a live profile through a library that can create sidecar files or
  migrations;
- account for journals, write-ahead logs, shared-memory files, and schema
  upgrades;
- confirm the source backup remains byte-for-byte unchanged;
- verify required roots, records, checksums, and application launch behavior;
- preserve the current live state before any explicitly approved restore.

A backup is not proven until restoration or rehearsal succeeds under controlled
conditions.

### 7. Protect secrets and configuration

Keep credentials out of source control, configuration examples, logs, reports,
test fixtures, process arguments, notifications, and exception messages.

Use environment variables, operating-system secret stores, managed identities,
or other appropriate runtime mechanisms. Document the secret name and required
scope, never the value. Fail safely when a secret is absent.

Configuration exports must exclude credentials and private data by default.
Treat imported configuration as untrusted input and validate its schema before
use.

### 8. Test privacy and failure behavior

Add tests for:

- allowlisted serialized logs, reports, errors, and notifications;
- credential-like strings, URLs with user information, IPv6 hosts, query values,
  Unicode, and malformed input;
- traversal, symlink or junction escape, and unsafe filenames;
- atomic-write interruption and cleanup;
- backup tampering, missing files, wrong manifests, and unsupported schemas;
- rollback after partial writes;
- repeated operations and stale locks;
- isolated restore rehearsal and unchanged live data;
- packaged application behavior on every supported platform.

Scan the final diff and generated artifacts for secrets, private paths, account
identifiers, real user data, and detailed reports.

### Completion report

Report:

- data inventory and privacy boundary;
- risky collection, storage, output, and network behavior;
- implemented controls;
- write, backup, rollback, and recovery guarantees;
- privacy and failure tests;
- behavior that remains opt-in or unverified;
- any live-data action that still requires explicit approval.
