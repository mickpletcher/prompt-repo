# PowerShell REST API Production Readiness

Use this prompt to assess and harden a PowerShell REST API module or script for
secure, reliable operation at production scale.

## Prompt

Review this PowerShell REST API project:

- Repository path or URL: `[INSERT REPOSITORY PATH OR URL]`
- Official API documentation: `[INSERT DOCUMENTATION URL]`
- API base URL pattern: `[INSERT NONSECRET EXAMPLE]`
- API version: `[INSERT VERSION]`
- Authentication method: `[API KEY | OAUTH | MANAGED IDENTITY | OTHER]`
- Required credential scopes or permissions: `[INSERT SCOPES]`
- Observed failure or assessment goal: `[INSERT DETAILS]`
- Expected request volume and published rate limits: `[INSERT DETAILS]`
- Supported PowerShell versions: `[INSERT VERSIONS]`
- Supported operating systems: `[INSERT PLATFORMS]`
- Read operations: `[INSERT COMMANDS OR ENDPOINTS]`
- Mutating operations: `[INSERT COMMANDS OR ENDPOINTS]`
- Integration environment available: `[YES | NO]`
- Authorization for live mutations: `[NONE | INSERT EXACT APPROVED SCOPE]`
- Requested mode: `[ASSESSMENT ONLY | IMPLEMENT APPROVED FIXES]`

Never request or place passwords, tokens, API keys, certificates, private URLs,
customer data, or production exports in chat, source control, fixtures, command
history, logs, screenshots, or reports. Use documented environment-variable or
secret-store names and sanitized examples.

### 1. Verify the API contract

Use current official documentation as the primary source. Confirm:

- base path, API version, and supported endpoints;
- authentication headers, token scopes, and permission requirements;
- request and response schemas;
- pagination fields and termination rules;
- rate-limit behavior and `Retry-After` handling;
- documented status codes and error envelopes;
- supported identifiers, actions, and version-specific limitations.

Record the documentation date or version. If official documentation cannot be
accessed, say so and do not present remembered behavior as current.

### 2. Reproduce before changing

For a reported connection or execution failure:

1. Trace configuration loading, URI construction, authentication, request
   creation, transport, response parsing, cleanup, and the public command result.
2. Preserve the original exception. Ensure `finally` or cleanup code cannot mask
   the real connection or API failure by referencing an uninitialized variable.
3. Separate DNS, routing, proxy, TLS, authentication, authorization, API-version,
   request-validation, server, and response-parsing failures.
4. Capture only sanitized status, category, endpoint template, correlation ID,
   and bounded response details.

Do not disable certificate validation or weaken security merely to make a test
pass.

### 3. Review PowerShell implementation quality

Check for:

- `Set-StrictMode` compatibility and predictable error behavior;
- approved verbs, clear parameter sets, pipeline behavior, and stable output
  objects;
- mandatory parameters, GUID and URI validation, bounded numeric values, and
  rejection of conflicting inputs;
- `SupportsShouldProcess` for consequential mutations where appropriate;
- no global state changes to TLS, certificate policy, proxy settings, or error
  preferences;
- no `Invoke-Expression`, shell-built commands, or unsafe string interpolation;
- terminating internal failures that retain actionable context;
- public errors that are useful but do not expose secrets or private payloads;
- cleanup that works on success, failure, cancellation, and partial responses.

Do not retain obsolete endpoints or aliases solely for backwards compatibility
when the approved change replaces the old contract. Document the migration.

### 4. Harden HTTP behavior

Require:

- HTTPS and certificate validation by default;
- explicit, bounded connection and operation timeouts;
- retries only for transient failures and only when the operation is safe to
  retry;
- exponential backoff with jitter and server-provided delay handling;
- bounded retry counts and total elapsed time;
- idempotency keys or explicit replay protection when the API supports them;
- safe redirect behavior that does not forward credentials to another host;
- pagination with maximum-page and repeated-page guards;
- deterministic handling of empty pages, partial pages, missing fields, and
  malformed responses;
- rate-limit reporting that identifies when the caller should retry.

Default automatic retries to GET and other documented idempotent operations.
Do not automatically replay a mutation unless duplicate execution is proven
safe.

### 5. Protect credentials and private data

Use least-privilege credentials supplied at runtime. Verify that:

- secret values never appear in verbose output, errors, transcripts, telemetry,
  exports, test snapshots, or exception serialization;
- configuration files contain secret names or placeholders, not secret values;
- URI user information and sensitive query values are removed before logging;
- request and response bodies are not logged by default;
- detailed diagnostics require an explicit opt-in and still apply redaction;
- output files use controlled locations and do not inherit unsafe names from
  untrusted input.

### 6. Make output and exports dependable

Public commands should return stable objects rather than formatted text. Keep
display formatting separate from data.

For JSON and CSV exports:

1. Write to a temporary file in the destination directory.
2. Flush and close it.
3. Validate the generated content.
4. Replace the destination atomically.
5. Remove temporary files on every failure path.

Handle large or paginated datasets without unbounded memory use. Preserve a
valid existing export when retrieval or validation fails.

### 7. Gate mutations

Keep discovery and validation read-only. For commands that change remote state:

- require explicit target identifiers and requested state;
- show a plan or support `-WhatIf` when practical;
- verify preconditions immediately before the request;
- make repeated requests idempotent when the API permits;
- read back and verify the resulting state;
- distinguish accepted, completed, partial, rejected, and unverified outcomes;
- provide rollback instructions when the remote operation supports reversal.

Never perform a live mutation merely because integration credentials are
available. The requested scope must authorize it.

### 8. Validate

Use Pester and PSScriptAnalyzer. Add tests for:

- parameter and configuration validation;
- authentication-header creation without exposing the secret;
- URI construction and path encoding;
- success, empty results, pagination, repeated pages, and maximum-page limits;
- 400, 401, 403, 404, 409, 429, and 5xx behavior;
- timeouts, retry limits, malformed JSON, schema drift, and partial responses;
- stable output types and atomic export failure paths;
- redaction in every serialized log, error, report, and test artifact;
- `-WhatIf`, idempotency, and read-back verification for mutations.

Keep integration tests opt-in. Read credentials from documented local secret
sources, skip clearly when unavailable, and never confuse mocked tests with live
API compatibility. Do not declare live compatibility until the documented
integration command passes against the intended API version.

### Completion report

Report:

- verified API contract and documentation source;
- reproduced root cause;
- findings and changes;
- tests, analyzer results, coverage, and integration status;
- security and privacy controls;
- breaking changes and migration steps;
- unverified live behavior and remaining operator actions.
