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
- Actual trigger or schedule, time zone, source, destination, and execution environment.
- A measurable business outcome and acceptable source or artifact freshness.
- Notification channel, privacy limits, repair authorization, and access to representative run history.

Missing from the prompt: the target automation, scheduler, credentials model, normal record counts, freshness threshold, notification policy, recent run evidence, and permission to change a live schedule or destination.

Safe default: assess only, treat the business result rather than exit code as success, preserve the last known good destination, and leave production schedules, credentials, notifications, and live data unchanged.

Sensitive information warning: do not paste secrets, private source or destination URLs, record contents, customer data, local paths, configuration files, or raw status artifacts into public output.

## Physical Device Change Readiness Gate

File: `prompts/hardware/physical-device-change-readiness-gate.md`

Required inputs:

- Device type, model, firmware or operating-system version, and intended change.
- Proposed transport, official vendor documentation, and available test hardware.
- Current backup, restore, recovery, and independent verification methods.
- Authorization for vendor access, physical testing, and the exact proposed write.

Missing from the prompt: verified device identity, supported capabilities, current firmware behavior, vendor authorization, physical evidence, backup integrity, recovery proof, and explicit write approval.

Safe default: remain read-only, redact device identifiers, use simulation only for orchestration evidence, and keep every physical write path unavailable until all readiness gates pass.

Sensitive information warning: do not include serial numbers, account names, device names, location or health data, proprietary firmware, credentials, or unsanitized hardware captures.

## Safe Backlog Item Implementation

File: `prompts/implementation/safe-backlog-item-implementation.md`

Required inputs:

- Repository path or URL, base branch, item identifier, and source tracking file.
- Complete acceptance criteria, explicit exclusions, required platforms, and integration gates.
- Requested delivery target such as a local change, draft pull request, ready pull request, or merge.
- Existing dirty-worktree or concurrent-work constraints.

Missing from the prompt: the actual backlog item, current tracker state, repository instructions, approval for consequential behavior, available test environments, and publication authority.

Safe default: implement only the named item, preserve unrelated work, keep partial items open, stage explicit paths, and stop before unapproved external or destructive actions.

Sensitive information warning: remove private paths, credentials, local reports, account data, customer-specific acceptance criteria, and identifying environment details before sharing the prompt or its output.

## PowerShell REST API Production Readiness

File: `prompts/powershell/powershell-rest-api-production-readiness.md`

Required inputs:

- Repository path or URL and current official API documentation.
- Sanitized base URL pattern, API version, authentication method, and required scopes.
- Supported PowerShell versions, operating systems, read commands, and mutating commands.
- Integration environment availability and authorization to implement fixes or perform live mutations.

Missing from the prompt: the real API contract, current credentials capability, controller or service version, observed failure, scale, rate limits, and live integration evidence.

Safe default: assess first, retain TLS validation, use bounded timeouts and safe retries, keep integration tests opt-in, and do not perform remote mutations.

Sensitive information warning: never paste passwords, API keys, bearer tokens, certificates, private tenant or controller URLs, customer exports, raw request bodies, or production logs.

## Software Project Assessment and Remediation

File: `prompts/project-review/software-project-assessment-and-remediation.md`

Required inputs:

- Repository path or URL, intended audience, deployment model, and supported platforms.
- Requested mode, known constraints, excluded areas, and any fixes already approved.
- Access to relevant source, tests, documentation, Git state, CI, packaging, and integration environments.
- Required completion target such as findings only, local fixes, pull request, or merge.

Missing from the prompt: the target project, current repository state, production evidence, available permissions, exact remediation scope, and manual acceptance environments.

Safe default: remain read-only, reproduce and rank findings with evidence, preserve dirty work, and require approval before editing files or external settings.

Sensitive information warning: exclude source that cannot be redistributed, credentials, customer data, private reports, local paths, account identifiers, private repository settings, and undisclosed vulnerabilities.

## Privacy-First Local Tool Safety Review

File: `prompts/security/privacy-first-local-tool-safety-review.md`

Required inputs:

- Repository path or URL and the categories of private data handled.
- General input locations, supported read and write operations, and data retention expectations.
- Logs, reports, backups, exports, notifications, external services, and telemetry behavior.
- Approved remediation scope and safe isolated test data.

Missing from the prompt: the real data inventory, operating-system permission model, storage locations, write and recovery guarantees, telemetry state, and authorization to inspect private data.

Safe default: use sanitized fixtures, keep processing local, produce count-only allowlisted output, keep transformative writes opt-in, and rehearse recovery without opening live data.

Sensitive information warning: never include real private files, credentials, account identifiers, URLs, titles, messages, browser profiles, customer data, local paths, backups, screenshots, or generated detailed reports.

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
