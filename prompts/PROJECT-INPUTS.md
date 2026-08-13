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
