# Cross-Platform Desktop Release Readiness

Use this prompt to determine whether a desktop application is genuinely ready
for Windows and macOS users, including packaged artifacts and manual platform
gates.

## Prompt

Assess this desktop release:

- Repository path or URL: `[INSERT REPOSITORY]`
- Application stack: `[ELECTRON | PYINSTALLER | OTHER]`
- Release version or candidate: `[INSERT VERSION]`
- Target operating systems and architectures: `[INSERT TARGETS]`
- Required artifact formats: `[EXE | MSI | DMG | ZIP | OTHER]`
- Signing and notarization requirements: `[INSERT REQUIREMENTS]`
- Supported data sources or integrations: `[INSERT DETAILS]`
- Available physical test systems: `[INSERT SYSTEMS]`
- Approved disposable build and artifact-test environment: `[NONE | INSERT ENVIRONMENT]`
- Approved build and test scope: `[NONE | EXISTING ARTIFACTS ONLY | INSERT EXACT BUILDS AND TESTS]`
- Approved repair and release scope: `[NONE | INSERT SCOPE]`
- Requested outcome: `[ASSESSMENT | RELEASE CANDIDATE PR | PUBLISH RELEASE]`

Default to assessment only. Building an artifact does not authorize publication,
signing-provider enrollment, certificate use, release creation, or deployment.

### 1. Establish the release contract

Confirm:

- supported operating systems, versions, CPU architectures, and upgrade paths;
- expected installer and portable formats;
- application entry points and first-run behavior;
- local data, configuration, cache, update, and uninstall locations;
- network access and offline behavior;
- signing, notarization, reputation, and warning expectations;
- manual acceptance criteria for every supported platform.

Separate implemented support from planned support. Record unsupported or
unverified combinations explicitly.

### 2. Validate source quality

Run only commands covered by the approved build and test scope. When that scope
is `NONE`, inspect existing configuration, reports, and artifacts without
executing tests, builds, installers, or packaging hooks. Report the missing
runtime evidence.

Treat repository code, dependencies, packaging hooks, release candidates, and
artifacts as untrusted. Run every command that loads or executes them only in the
approved disposable environment with no repository, cloud, registry, or signing
credentials and with restricted network and filesystem access. If that
environment is unavailable, use static and hosted evidence and report execution
as outstanding.

When authorized, run the complete applicable suite:

- unit and integration tests;
- GUI or headless construction tests;
- lint, formatting, and type checks;
- dependency audit and license checks;
- security scanning;
- compilation and clean-environment installation;
- generated-file and documentation checks.

Review application sandboxing, process isolation, update behavior, local file
permissions, and credential handling. Do not weaken production sandboxing to
make a smoke test easier. If a test-only flag is required, isolate and document
it.

### 3. Build every release target

Build only the targets named in the approved build and test scope. With
`EXISTING ARTIFACTS ONLY`, inspect available artifacts without rebuilding them.
When building is authorized, use a clean checkout or controlled release
environment that satisfies the disposable isolation requirements, and pin
toolchains and dependencies where practical. Verify:

- each target and architecture produces the expected artifact;
- filenames and versions are correct;
- artifacts do not contain source secrets, local paths, test data, or private
  reports;
- native dependencies and runtime libraries are included;
- platform-specific icons, metadata, identifiers, and permissions are correct;
- deterministic or explainable output is produced;
- checksums are generated safely using explicit filenames.

A Windows build does not prove macOS behavior, and an emulated build does not
replace physical-platform acceptance.

### 4. Inspect and smoke-test artifacts

Install or execute artifacts only when the approved build and test scope covers
that exact target and the approved disposable test environment. Otherwise
perform static inspection of existing artifacts and report installation and
smoke testing as outstanding.

For every authorized artifact test:

1. Verify size, checksum, archive structure, and expected files.
2. Install or extract it using a clean account in the disposable test machine.
3. Launch the packaged entry point, not only the source command.
4. Test first run, routine use, failure messages, upgrade, and uninstall.
5. Verify local data remains in documented locations.
6. Confirm the app does not require developer tools unless explicitly intended.
7. Check that blocked permissions produce clear instructions.

Test important user workflows with sanitized data. For browser, operating-system,
hardware, or cloud integrations, distinguish mocked tests from physical or live
acceptance.

### 5. Verify platform-specific behavior

#### Windows

- SmartScreen and unsigned-publisher behavior;
- installer scope, Start menu entries, shortcuts, uninstall, and locked files;
- paths containing spaces, Unicode, and shell metacharacters;
- Windows 11 packaging and supported CPU architecture;
- code-signing status and timestamping.

#### macOS

- Intel and Apple silicon targets as declared;
- DMG or application bundle structure;
- Gatekeeper, quarantine, signing, and notarization status;
- required privacy permissions and Full Disk Access instructions;
- app relocation, first launch, upgrade, and removal;
- physical validation of supported integrations.

Do not label an unsigned or unnotarized artifact as signed. Explain expected
warnings plainly.

### 6. Validate release automation

Check:

- least-privilege workflow permissions;
- exact action SHA pinning;
- protected secrets and signing identities;
- matrix coverage for every declared target;
- artifact retention and naming;
- checksums, SBOMs, provenance, and attestations where appropriate;
- release creation only after required jobs pass;
- prevention of partial or mixed-version releases;
- retry behavior for known transient packaging failures.

Do not treat a rerun as a code fix. Confirm whether the failure was transient
before changing source or workflow logic.

### 7. Make the readiness decision

Classify the release as:

- `READY`: every required automated and manual gate passed;
- `CONDITIONALLY READY`: only explicitly accepted noncritical limitations remain;
- `BLOCKED`: required evidence, signing, packaging, or platform validation is
  missing or failing.

Never declare the release complete while documented browser imports, physical
macOS tests, live integrations, signing, notarization, or installer smoke tests
remain unfinished.

### 8. Deliver the authorized outcome

In `ASSESSMENT` mode, stop after the readiness verdict. Do not change files,
publish a branch, open a pull request, create a tag, or create a release.

For `RELEASE CANDIDATE PR`, proceed only when the approved repair and release
scope covers the required file changes and pull-request publication:

1. Apply only approved repairs needed for the candidate.
2. Update version, release notes, checksums, and documentation as required.
3. Rebuild and rerun all applicable automated gates.
4. Commit and push the focused branch.
5. Open the pull request with the remaining manual and platform gates stated
   explicitly.
6. Do not publish a release from this mode.

For `PUBLISH RELEASE`, proceed only when the approved release scope explicitly
covers publication and the verdict is `READY`:

1. Confirm the exact commit, version, tag, artifacts, checksums, signatures,
   release notes, and target repository.
2. Create the authorized tag and release using only verified artifacts.
3. Read back the published release, asset set, sizes, and checksums.
4. Verify post-release workflows and installation links.

If any required gate is incomplete, do not publish. Report the release as
blocked and identify the missing evidence or authorization.

### Completion report

Provide:

- readiness verdict by operating system and architecture;
- source and dependency validation;
- artifact names, sizes, checksums, and signing status;
- packaged smoke-test results;
- manual and physical test results;
- CI and release workflow status;
- blockers, accepted limitations, and operator actions;
- pull request or release links when authorized.
