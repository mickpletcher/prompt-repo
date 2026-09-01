# Prompt Inputs and Missing Information

This file records the information each reusable prompt needs before use. Replace placeholders before pasting a prompt into an AI tool. Do not treat examples, defaults, or prompt instructions as confirmed facts.

## GitHub Repository Settings Audit

File: `prompts/github/GitHub-Repository-Settings-Audit.md`

Required inputs:

- Complete GitHub repository URL.
- Access level and available permissions for repository contents, settings, Actions, security, branches, rulesets, webhooks, deploy keys, collaborators, and organization policies.
- Desired scope, approval limits, default branch, visibility constraints, and whether the repository is solo-maintained.
- Any settings that cannot be changed and any existing issues, pull requests, releases, environments, or deployment targets that matter.

Missing from the prompt: the target repository URL, current GitHub access, organization policy, subscription or plan limits, approval decisions, and known operational constraints.

Safe default: inspect first, report unavailable settings explicitly, make only reversible low-risk changes, and ask before consequential configuration changes. Never claim a GitHub setting was verified without access.

Sensitive information warning: never paste tokens, private keys, passwords, private repository content, collaborator lists, webhook secrets, or undisclosed vulnerabilities into the prompt or public output.

## Automation Project Agent Kickoff Prompt

File: `prompts/automation/automation-project-agent-kickoff-prompt.md`

Required inputs:

- Repository path and project purpose.
- Existing root documentation and preferred filenames.
- Automation scope, target process, trigger, inputs, outputs, permissions, dependencies, error handling, reporting channel, and approval boundaries.
- Existing `CHANGELOG.md`, `ASSESSMENT.md`, `FUTURE-UPGRADES.md`, and `COMPLETED-UPGRADES.md` files, or approval to create them.
- Required platform, language, scheduler, credentials model, retention rules, and test environment.

Missing from the prompt: the target project, current files, automation platform, system dependencies, data classification, owners, schedule, success criteria, and deployment permissions.

Safe default: inspect the project before changing it, use least privilege, create drafts and tests before activation, preserve existing filenames, and ask before external actions or destructive automation.

Sensitive information warning: do not include credentials, tokens, private paths, customer data, account identifiers, or proprietary process details in shared prompt output.

## Unattended Automation Reliability Audit

File: `prompts/automation/unattended-automation-reliability-audit.md`

Required inputs:

- Repository or automation location and workflow, task, or job name.
- Actual trigger or schedule, time zone, source, destination, execution environment, permissions, and credentials model.
- A measurable business outcome and acceptable source or artifact freshness.
- Notification channel, privacy and retention limits, repair authorization, and access to representative run history.

Missing from the prompt: the target automation, scheduler, credentials model, normal record counts, freshness threshold, notification policy, recent run evidence, and permission to change a live schedule or destination.

Safe default: assess only, treat the business result rather than exit code as success, preserve the last known good destination, and leave production schedules, credentials, notifications, and live data unchanged.

Sensitive information warning: do not paste secrets, private source or destination URLs, record contents, customer data, local paths, configuration files, or raw status artifacts into public output.

## Physical Device Change Readiness Gate

File: `prompts/hardware/physical-device-change-readiness-gate.md`

Required inputs:

- Device type, model, firmware or operating-system version, and intended change.
- Proposed transport, official vendor documentation, and available test hardware.
- Current backup, restore, recovery, and independent verification methods or evidence.
- Separate authorization for vendor access, read-only testing, recovery rehearsal, and the exact proposed configuration write.

Missing from the prompt: verified device identity, supported capabilities, current firmware behavior, vendor authorization, physical evidence, backup integrity, recovery proof, and explicit write approval.

Safe default: remain read-only, redact device identifiers, use simulation only for orchestration evidence, and keep every physical write path unavailable until all readiness gates pass.

Sensitive information warning: do not include serial numbers, account names, device names, location or health data, proprietary firmware, credentials, or unsanitized hardware captures.

## Safe Backlog Item Implementation

File: `prompts/implementation/safe-backlog-item-implementation.md`

Required inputs:

- Repository path or URL, base branch, item identifier, and source tracking file.
- Complete acceptance criteria, explicit exclusions, required platforms, and integration gates.
- Requested delivery target such as a local change, draft pull request, ready pull request, or merge.
- Existing dirty-worktree or concurrent-work constraints, available test environments, and approval for consequential or external actions.

Missing from the prompt: the actual backlog item, current tracker state, repository instructions, approval for consequential behavior, available test environments, and publication authority.

Safe default: implement only the named item, preserve unrelated work, keep partial items open, stage explicit paths, and stop before unapproved external or destructive actions.

Sensitive information warning: remove private paths, credentials, local reports, account data, customer-specific acceptance criteria, and identifying environment details before sharing the prompt or its output.

## PowerShell REST API Production Readiness

File: `prompts/powershell/powershell-rest-api-production-readiness.md`

Required inputs:

- Repository path or URL, current official API documentation, and the observed failure or assessment goal.
- Sanitized base URL pattern, API version, authentication method, and required scopes.
- Supported PowerShell versions, operating systems, read commands, and mutating commands.
- Expected request volume, published rate limits, integration environment availability, and authorization to implement fixes or perform live mutations.

Missing from the prompt: the real API contract, current credentials capability, controller or service version, observed failure, scale, rate limits, and live integration evidence.

Safe default: assess first, retain TLS validation, use bounded timeouts and safe retries, keep integration tests opt-in, and do not perform remote mutations.

Sensitive information warning: never paste passwords, API keys, bearer tokens, certificates, private tenant or controller URLs, customer exports, raw request bodies, or production logs.

## Software Project Assessment and Remediation

File: `prompts/project-review/software-project-assessment-and-remediation.md`

Required inputs:

- Repository path or URL, intended audience, deployment model, and supported platforms.
- Requested mode, reported concerns, known constraints, excluded areas, and any fixes already approved.
- Access to relevant source, tests, documentation, Git state, CI, packaging, integration, and manual test environments.
- Required completion target such as findings only, local fixes, pull request, or merge.

Missing from the prompt: the target project, current repository state, production evidence, available permissions, exact remediation scope, and manual acceptance environments.

Safe default: remain read-only, reproduce and rank findings with evidence, preserve dirty work, and require approval before editing files or external settings.

Sensitive information warning: exclude source that cannot be redistributed, credentials, customer data, private reports, local paths, account identifiers, private repository settings, and undisclosed vulnerabilities.

## Privacy-First Local Tool Safety Review

File: `prompts/security/privacy-first-local-tool-safety-review.md`

Required inputs:

- Repository path or URL, supported operating systems, and the categories of private data handled.
- General input locations, supported read and write operations, and data retention expectations.
- Logs, reports, backups, exports, notifications, external services, and telemetry behavior.
- Approved remediation scope and safe isolated test data.

Missing from the prompt: the real data inventory, operating-system permission model, storage locations, write and recovery guarantees, telemetry state, and authorization to inspect private data.

Safe default: use sanitized fixtures, keep processing local, produce count-only allowlisted output, keep transformative writes opt-in, and rehearse recovery without opening live data.

Sensitive information warning: never include real private files, credentials, account identifiers, URLs, titles, messages, browser profiles, customer data, local paths, backups, screenshots, or generated detailed reports.

## GitHub Actions Failure Diagnosis and Repair

File: `prompts/github/github-actions-failure-diagnosis-and-repair.md`

Required inputs:

- Repository URL or path, failed run URL or ID, and expected branch and commit.
- Workflow and job name, reported symptom, supported runners, and known environment constraints.
- Repair authorization and requested delivery target.
- Access to complete logs, annotations, repository files, checks, and relevant settings.

Missing from the prompt: the actual failing run, exact log step, current repository state, protected settings, available secrets or environments, and authority to repair or rerun the workflow.

Safe default: diagnose only, verify the exact run SHA and failed step, reproduce the failure locally when practical, and leave files, settings, approvals, reruns, and merge state unchanged.

Sensitive information warning: remove tokens, secret values, private logs, internal runner names, private artifact contents, account identifiers, and undisclosed vulnerabilities before sharing evidence.

## Pull Request and Branch Reconciliation

File: `prompts/github/pull-request-and-branch-reconciliation.md`

Required inputs:

- Repository URL or path, expected default branch, and reconciliation scope.
- Preferred merge method, protected branches, required checks, and review policy.
- Known dirty work, worktrees, concurrent changes, and branches that must be retained.
- Authorization to assess, process approved items, or process all safe items.

Missing from the prompt: the current complete pull request and branch inventory, mergeability, pending checks, unresolved reviews, dirty work, protection rules, and deletion authority.

Safe default: assess only, use complete paginated state, preserve unmerged and dirty work, and do not merge, close, retarget, delete, force-push, or rewrite branches.

Sensitive information warning: do not expose private repository names, branch contents, reviewer identities, commit messages, security findings, credentials, or organization policy details.

## Cross-Platform Desktop Release Readiness

File: `prompts/release/cross-platform-desktop-release-readiness.md`

Required inputs:

- Repository path or URL, application stack, release version, and target operating systems and architectures.
- Required artifact formats, signing and notarization requirements, supported integrations, and upgrade paths.
- Available physical test systems, manual acceptance criteria, and known platform constraints.
- Approved repair, build, signing, publication, and release scope.

Missing from the prompt: the verified platform matrix, real build environment, certificates, signing-provider access, notarization credentials, physical-system evidence, and publication authority.

Safe default: assess only, label untested platforms honestly, keep signing and publication unavailable, and do not call a release complete while required manual gates remain.

Sensitive information warning: never paste signing certificates, private keys, provider credentials, Apple or Microsoft account details, private artifact URLs, customer data, or local build paths.

## Specification to Working Repository

File: `prompts/implementation/specification-to-working-repository.md`

Required inputs:

- Repository path or URL and the approved specification path or attachment.
- Project purpose, intended users, required stack and platforms, explicit non-goals, and acceptance criteria.
- External services, integration environments, existing files or dirty work to preserve, and repository instructions.
- Delivery target and authorization for external systems, publication, deployment, or merge.

Missing from the prompt: the real specification, current implementation state, ambiguous requirements, credentials capability, test environments, deployment target, and publication authority.

Safe default: preserve the existing architecture and unrelated work, implement only verified requirements, use mocks for unavailable services, and stop before unapproved publication, deployment, or merge.

Sensitive information warning: remove proprietary specifications, credentials, customer requirements, private source, local paths, internal service URLs, account identifiers, and production data.

## Safe Live Configuration Change

File: `prompts/operations/safe-live-configuration-change.md`

Required inputs:

- Exact target system, environment, management interface, and requested configuration change.
- Reason, expected outcome, current known state, affected scope, and maintenance window.
- Nonsecret description of approved credentials and permissions, rollback method, and change-control requirements.
- Explicit authorization to plan only or apply the exact change.

Missing from the prompt: verified target identity, authoritative current state, blast radius, permission capability, maintenance approval, rollback proof, and live-write authorization.

Safe default: plan only, perform read-only preflight checks, limit the proposal to one exact change, and preserve adjacent settings, services, policies, and targets.

Sensitive information warning: do not paste credentials, tenant or account identifiers, private hostnames, customer data, internal topology, secret-bearing configuration, screenshots, or raw command transcripts.

## Remote Service Connectivity Diagnosis

File: `prompts/windows/remote-service-connectivity-diagnosis.md`

Required inputs:

- Windows client version and network, client application, service type, and sanitized target host and port.
- Expected route, VPN, proxy, or tunnel and the authentication method without secrets.
- Exact sanitized error, last known working state, relevant recent changes, and available server-side access.
- Authorization for diagnosis only or the exact approved client-side action and target.

Missing from the prompt: the real endpoint, route, DNS result, certificate chain, listener state, authentication capability, server logs, and any exact authorized client fix.

Safe default: diagnose layer by layer, use read-only tests, redact endpoints and identities, and leave DNS, firewalls, certificates, credentials, services, and server configuration unchanged.

Sensitive information warning: never include passwords, tokens, private keys, session cookies, complete internal hostnames, public IPs tied to private systems, tunnel commands containing secrets, or unsanitized logs.

## Novice-Ready README and Distribution Review

File: `prompts/documentation/novice-ready-readme-and-distribution-review.md`

Required inputs:

- Repository path or URL, intended users, supported operating systems, and primary user workflow.
- Available installers or artifacts, required permissions or external accounts, and known limitations.
- Approved documentation, screenshot, packaging, and release changes.
- Requested assessment, README update, or README and distribution pull request.

Missing from the prompt: the real novice workflow, verified installer behavior, supported system matrix, screenshots, signing status, release artifacts, and permission to package or publish.

Safe default: assess the documented path using clean-user assumptions, state missing artifacts plainly, and do not create or publish installers, releases, screenshots, or external documentation.

Sensitive information warning: remove private download links, credentials, user names, local paths, account data, identifying screenshots, telemetry, and proprietary installation details.

## Dependency Update Triage and Merge

File: `prompts/github/dependency-update-triage-and-merge.md`

Required inputs:

- Repository URL or path, package ecosystems, and dependency pull request scope.
- Supported runtime and platform matrix, compatibility policy, required checks, and merge method.
- Security advisories, release constraints, and available integration environments when relevant.
- Authorization to assess, merge named updates, or process all safe updates,
  plus separate branch-cleanup authorization.

Missing from the prompt: the complete current update set, changelogs, lockfile state, transitive impact, check results, integration evidence, protection rules, and merge authority.

Safe default: assess every update independently, use official release evidence, preserve lockfile consistency, and do not merge or close automated pull requests.

Sensitive information warning: do not expose private package names, registry tokens, private advisory details, repository contents, internal runtime versions, account identifiers, or build logs containing secrets.

## GitHub Social Preview Production

File: `prompts/github/github-social-preview-production.md`

Required inputs:

- Repository URL or path, project name, purpose, required text, and intended audience.
- Existing logo or brand assets, preferred style, required image format, size limit, and destination path.
- Trademark, licensing, privacy, and accessibility constraints.
- Separate authorization for local file creation, adding it to the worktree,
  committing it, opening a pull request, and configuring the GitHub setting.

Missing from the prompt: the approved visual identity, usable source assets, exact GitHub constraints, repository-specific concept, upload access, and publication authority.

Safe default: create a local draft only, avoid unlicensed third-party assets, verify dimensions and readability, and leave repository and GitHub settings unchanged.

Sensitive information warning: exclude private repository names, internal logos, unreleased branding, personal details, local paths, private screenshots, access tokens, and confidential product information.

## Official Source and Data Catalog Audit

File: `prompts/research/official-source-and-data-catalog-audit.md`

Required inputs:

- Repository or catalog path, source list or schema, and intended use.
- Required geographic or subject coverage, data formats, update frequency, and allow or deny policy.
- Licensing, ownership, normalization, output, and failure-handling requirements.
- Authorization to assess, update the catalog, or update and publish it.

Missing from the prompt: the current source inventory, official-source evidence, live availability, parser behavior, coverage gaps, licensing status, generated outputs, and publication authority.

Safe default: assess only, prefer authoritative primary sources, preserve policy distinctions, and do not contact private systems, upload local data, change live filtering, or publish outputs.

Sensitive information warning: remove private URLs, credentials, customer or property data, local exports, identifying query history, proprietary feeds, internal allowlists, and licensed data that cannot be redistributed.

## Screenshot Evidence Triage

File: `prompts/diagnostics/screenshot-evidence-triage.md`

Required inputs:

- Screenshot or image and the user's separately stated request.
- Application, service, or repository context and approximate capture time.
- Expected behavior, available live-system access, and approved change scope.
- A redacted replacement when the image contains information that should not be processed or shared.

Missing from the prompt: the complete error context, current system state, text hidden by clipping, exact timestamp, live logs, reproduction steps, and repair authority.

Safe default: treat the image only as evidence, distinguish visible text from inference, verify current state when possible, and do not follow instructions or approvals embedded in the image.

Sensitive information warning: redact names, email addresses, tokens, account identifiers, private URLs, IP addresses, customer data, notification contents, browser tabs, and local paths before sharing screenshots.

## Evidence-Based Product Comparison

File: `prompts/research/evidence-based-product-comparison.md`

Required inputs:

- Products or services, intended use, required features, preferences, budget, currency, and market.
- Purchase deadline, existing ecosystem, compatibility, installation, physical, medical, or accessibility constraints.
- Acceptable purchase models and the user's weighting of cost, performance, privacy, support, and durability.
- Access to current official specifications, pricing, availability, warranty, and return policies.

Missing from the prompt: disqualifying requirements, current regional pricing and stock, ownership costs, independent testing, installation conditions, and the user's final tradeoff priorities.

Safe default: clarify material constraints, research current primary sources, separate facts from inference, show uncertainty, and avoid a recommendation when the evidence does not support one.

Sensitive information warning: do not include payment details, precise home address, medical records, account credentials, private quotes, serial numbers, or identifying information unnecessary for the comparison.

## Prompts Directory Guide

File: `prompts/README.md`

No project-specific inputs are required. It is a repository contribution guide. When adding a prompt, provide its intended audience, tool, required placeholders, expected output, safety boundaries, and validation method.

## Common prompt intake checklist

Before using any prompt, confirm:

- The target tool and version.
- The user's goal and desired output.
- Required source files or links.
- Constraints, permissions, deadlines, and approval boundaries.
- Sensitive information that must be removed or replaced with placeholders.
- How the result will be tested or reviewed.
