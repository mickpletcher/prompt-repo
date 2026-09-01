# Official Source and Data Catalog Audit

Use this prompt to evaluate a catalog of URLs, feeds, government resources, or
data providers for authority, freshness, usable output, overlap, and policy fit.

## Prompt

Audit this source catalog:

- Repository or catalog path: `[INSERT PATH OR URL]`
- Source list or schema: `[INSERT FILES]`
- Intended use: `[INSERT PURPOSE]`
- Required geographic or subject coverage: `[INSERT COVERAGE]`
- Expected data format: `[INSERT FORMAT OR MIXED]`
- Update frequency: `[INSERT EXPECTATION]`
- Allow, deny, include, or exclude policy: `[INSERT POLICY]`
- Licensing requirements: `[INSERT REQUIREMENTS]`
- Approved isolated parser environment: `[NONE | INSERT ENVIRONMENT]`
- Approved changes: `[ASSESS ONLY | UPDATE CATALOG | UPDATE AND PUBLISH]`

Default to assessment only. Do not contact private systems, upload local data,
change live filtering policy, or publish generated outputs unless authorized.

### 1. Understand the catalog contract

Identify:

- required fields and unique key;
- source categories and policy meaning;
- enabled and disabled behavior;
- expected parser and normalization rules;
- output products derived from the sources;
- coverage requirements;
- refresh, cache, retention, and failure behavior;
- ownership and licensing constraints.

Do not merge allow and deny sources into one ambiguous category. Preserve
explicit policy distinctions and documented exceptions.

### 2. Validate every source

For each source, check:

- canonical URL and ownership;
- official, first-party, community, commercial, mirror, or unknown status;
- HTTP and TLS behavior;
- redirect destination;
- last meaningful update and expected cadence;
- content type, encoding, size, and download completeness;
- license and redistribution terms;
- availability through normal browsers when automated clients are blocked;
- geographic, product, or subject scope.

Use current primary sources where possible. An HTTP `200` response proves only
that something responded. It does not prove the content is current, relevant,
parseable, safe, or licensed.

### 3. Validate parsed output

Run the actual project parser only in the approved disposable environment with
no repository, cloud, registry, or signing credentials, controlled storage, and
network access restricted to explicitly approved catalog sources. Treat the
repository, parser, dependencies, source content, and generated files as
untrusted. Use bounded timeouts and resource limits.

If the approved environment is unavailable, do not execute project code. Use
static inspection and existing hosted evidence, report parser validation as
unexecuted, and do not infer healthy output from source reachability.

When execution is authorized, measure:

- valid records;
- invalid or ignored lines;
- comments, metadata, and unsupported syntax;
- duplicates within the source;
- normalized duplicates across sources;
- allow and deny overlap;
- unexpected wildcards, broad suffixes, IP addresses, URLs, or malformed values;
- changes compared with the last known good output.

Inspect representative output, not only record counts. A reachable source that
produces zero valid records is not healthy.

### 4. Assess quality and policy risk

Evaluate:

- false-positive and false-negative risk;
- breadth compared with the catalog's declared purpose;
- ownership and maintenance history;
- overlap and unique contribution;
- parser compatibility;
- stability and operational cost;
- privacy or telemetry implications;
- whether the source belongs in default, optional, aggressive, allow, deny, or
  quarantine policy.

Do not recommend a source solely because it is popular or large. Prefer sources
whose scope, maintenance, license, and output can be explained.

### 5. Verify coverage directories

For official-resource directories, confirm every required jurisdiction or
category appears exactly once. Prefer statewide or national first-party portals
when they exist. Otherwise use official directories that lead to the correct
local authority.

Do not silently replace an official site with a commercial aggregator because
the official site blocks automated clients. Mark normal-browser requirements
and the date verified.

### 6. Recommend a disposition

Classify each source as:

- `KEEP ENABLED`;
- `KEEP OPTIONAL`;
- `DISABLE PENDING REVIEW`;
- `REPLACE`;
- `REMOVE`;
- `BLOCKED FROM AUTOMATED VALIDATION`.

Include reason, confidence, evidence, replacement when applicable, and the
effect on derived output.

### 7. Update safely when authorized

When catalog changes are approved:

1. Modify the source metadata and policy explicitly.
2. Preserve documented exceptions.
3. Regenerate outputs in a new directory.
4. Validate schema, counts, overlap, and representative records.
5. Compare against the previous output.
6. In `UPDATE AND PUBLISH` mode only, replace published output after validation
   succeeds.
7. Update README, assessment, changelog, and policy documentation as required.

In `UPDATE CATALOG` mode, keep regenerated output in a separate local location
for validation and report publication as outstanding. Do not replace external or
live published output.

Do not commit private reports, live query exports, credentials, or local-only
allow and deny files.

### Completion report

Provide:

- catalog schema and intended policy;
- per-source health, authority, freshness, license, and parsed-record results;
- overlap, unique contribution, and risk findings;
- recommended disposition for every source;
- coverage gaps and official alternatives;
- changed files and regenerated outputs;
- validation and publication status.
