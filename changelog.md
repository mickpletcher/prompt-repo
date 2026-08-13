# Changelog

All repository content and GitHub configuration changes are recorded here.
This repository does not currently publish versioned releases, so entries are
grouped by date with pending pull-request work under **Unreleased**.

The changelog workflow updates the Unreleased section automatically for
same-repository pull requests. GitHub settings changes do not emit a file-change
event and must be recorded manually when they are made.

## Unreleased

<!-- automated-changelog -->

<!-- changelog:pr-8:start -->
- **Improve repository security and validation** ([#8](https://github.com/mickpletcher/prompt-repo/pull/8))
  - Added `.github/scripts/check-markdown-links.mjs`.
  - Added `.github/scripts/check-markdown-links.test.mjs`.
  - Added `.github/workflows/codeql.yml`.
  - Updated `.github/workflows/markdownlint.yml`.
  - Updated `.gitignore`.
  - Updated `ASSESSMENT.md`.
  - Updated `COMPLETED-UPGRADES.md`.
  - Updated `CONTRIBUTING.md`.
  - Updated `FUTURE-UPGRADES.md`.
  - Updated `README.md`.
<!-- changelog:pr-8:end -->

- **2026-08-12: Add living project management files**
  - Added `ASSESSMENT.md`, `FUTURE-UPGRADES.md`, and `COMPLETED-UPGRADES.md`.
  - Established the current repository assessment and upgrade backlog.

- **Document reusable prompt inputs**
  - Added `prompts/PROJECT-INPUTS.md` with required information, missing context, safe defaults, and sensitive-data warnings for each prompt.

- **Document missing OpenAI Project inputs**
  - Added `openai/PROJECT-INPUTS.md` with required information, missing context, safe defaults, and personal-data flags for each instruction set.

- **Strengthen instruction set contracts**
  - Added a purpose section to the ATS resume instruction set.
  - Added response and change-control requirements to the CAD instruction set.
  - Required the patent assistant to report its current workflow stage.

- **Normalize instruction set naming**
  - Renamed `openai/instruction-sets/hvac/HVAC-Troubleshooting.md` to `openai/instruction-sets/hvac/hvac-troubleshooting.md`.

- **Add epilepsy memoir development instruction set**
  - Added `openai/instruction-sets/writing/epilepsy-memoir-development.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add AI prompt engineering media creator instruction set**
  - Added `openai/instruction-sets/content/ai-prompt-engineering-media-creator.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add modular truck bed rack designer instruction set**
  - Added `openai/instruction-sets/vehicle/truck-bed-rack-designer.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add patent development assistant instruction set**
  - Added `openai/instruction-sets/legal/patent-development-assistant.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add ATS resume and cover letter instruction set**
  - Added `openai/instruction-sets/career/ats-resume-and-cover-letter.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add container home expansion instruction set**
  - Added `openai/instruction-sets/container-home/container-home-expansion.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add AI CAD Design Book instruction set**
  - Added `openai/instruction-sets/cad/ai-cad-design-book.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add bariatric recipe and meal planner instruction set**
  - Added `openai/instruction-sets/nutrition/bariatric-recipe-meal-planner.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add voice strength and conditioning coach instruction set**
  - Added `openai/instruction-sets/fitness/voice-strength-conditioning-coach.md`.
  - Updated `README.md` with the generated catalog entry.

- **Group instruction sets under the OpenAI directory**
  - Moved event, fitness, and HVAC instruction sets under `openai/instruction-sets/`.
  - Updated the README catalog and repository layout guidance.

- **Add post-bariatric Phase 4 AI coach instruction set**
  - Added `openai/instruction-sets/fitness/post-bariatric-ai-coach.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add AI trainer, nutritionist, and health analyst instruction set**
  - Added `openai/instruction-sets/fitness/ai-trainer-nutrition-health.md`.
  - Updated `README.md` with the generated catalog entry.

- **Add high school reunion ChatGPT Project instruction set**
  - Added `openai/instruction-sets/events/high-school-reunion.md`.

- **Clarify ChatGPT Project instruction set terminology**
  - Updated `CONTRIBUTING.md` to use the repository's defined term consistently.

- **Organize resources into category directories**
  - Moved prompts into `prompts/automation/` and `prompts/github/`.
  - Moved HVAC instructions into `instruction-sets/hvac/`.
  - Updated the generated resource catalog in `README.md`.

- **Clarify ChatGPT Project instruction set organization**
  - Updated `README.md`, `CONTRIBUTING.md`, and `instruction-sets/README.md` to define the intended use of instruction sets.

- **Validate generated repository metadata in CI**
  - Updated `.github/workflows/markdownlint.yml` to check the README catalog and run its tests.
  - Updated `README.md` to match the generated catalog.

<!-- changelog:pr-7:start -->
- **Add automation project kickoff prompt** ([#7](https://github.com/mickpletcher/prompt-repo/pull/7))
  - Added `prompts/automation-project-agent-kickoff-prompt.md`.
  - Updated `README.md`.
<!-- changelog:pr-7:end -->

<!-- changelog:pr-6:start -->
- **Automate README resource catalog** ([#6](https://github.com/mickpletcher/prompt-repo/pull/6))
  - Added `.github/scripts/readme-catalog.mjs`.
  - Added `.github/scripts/readme-catalog.test.mjs`.
  - Removed `.github/scripts/update-changelog.mjs`.
  - Added `.github/scripts/update-repository-metadata.mjs`.
  - Updated `.github/workflows/changelog.yml`.
  - Updated `CONTRIBUTING.md`.
  - Updated `README.md`.
<!-- changelog:pr-6:end -->

<!-- changelog:pr-5:start -->
- **Organize prompts and instruction sets** ([#5](https://github.com/mickpletcher/prompt-repo/pull/5))
  - Updated `CONTRIBUTING.md`.
  - Renamed `instruction sets/HVAC-Troubleshooting.md` to `instruction-sets/HVAC-Troubleshooting.md`.
  - Added `instruction-sets/README.md`.
  - Renamed `instruction sets/GitHub-Repository-Settings-Audit.md` to `prompts/GitHub-Repository-Settings-Audit.md`.
  - Updated `README.md`.
<!-- changelog:pr-5:end -->

<!-- changelog:pr-3:start -->
- **Bump DavidAnson/markdownlint-cli2-action from 4580e1612f6407034edd6c0e4e316d725920867b to 21c1be1b93ad9ed58fa840aacc3f279cde2a72ff in the github-actions group across 1 directory** ([#3](https://github.com/mickpletcher/prompt-repo/pull/3))
  - Updated `.github/workflows/markdownlint.yml`.
<!-- changelog:pr-3:end -->

<!-- changelog:pr-4:start -->
- **Organize prompts and instruction sets** ([#4](https://github.com/mickpletcher/prompt-repo/pull/4))
  - Added `.github/scripts/update-changelog.mjs` to generate pull-request entries.
  - Added `.github/workflows/changelog.yml` to maintain this file automatically.
  - Added `changelog.md` with the repository's complete known history.
  - Added `prompts/README.md` so Git tracks and documents the prompts directory.
  - Moved `GitHub-Repository-Settings-Audit.md` to `instruction sets/GitHub-Repository-Settings-Audit.md` without changing its contents.
  - Updated `.github/PULL_REQUEST_TEMPLATE.md` with a changelog-verification item.
  - Updated `CONTRIBUTING.md` with the requested directory path and changelog process.
  - Updated `README.md` with the new path, content type, directory organization, and changelog link.
<!-- changelog:pr-4:end -->

## 2026-08-11

### Repository content and automation

- Renamed `GitHub-Repository-Audit.md` to `GitHub-Repository-Settings-Audit.md` without changing its content ([#2](https://github.com/mickpletcher/prompt-repo/pull/2)).
- Replaced the one-line README with the repository purpose, intended audience, catalog, usage instructions, organization, support, security, status, license, and badges ([#1](https://github.com/mickpletcher/prompt-repo/pull/1)).
- Added `.github/CODEOWNERS` with `@mickpletcher` as the default owner.
- Added issue forms for content problems and content requests, plus private-security-report routing.
- Added `.github/PULL_REQUEST_TEMPLATE.md` with validation and safety checks.
- Added `.github/assets/social-preview.jpg` as a 1280×640, 82,293-byte JPEG.
- Added `.github/dependabot.yml` for monthly grouped GitHub Actions updates.
- Added `.github/workflows/markdownlint.yml` with read-only permissions, timeouts, concurrency control, and full-SHA action pins.
- Added `.markdownlint-cli2.jsonc` and `.gitignore`.
- Added `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `SUPPORT.md`.

### GitHub repository configuration

- Added the repository About description and the topics `prompts`, `prompt-engineering`, `ai-prompts`, `project-instructions`, `developer-tools`, `automation`, `github`, and `codex`.
- Uploaded the custom social preview and hid unused Releases, Packages, and Deployments sections.
- Disabled Wiki and Projects while retaining Issues and pull requests.
- Enabled squash-only merging, branch-update suggestions, auto-merge, and automatic deletion of merged branches.
- Added the active `Protect main` ruleset with an administrator bypass, pull-request requirement, conversation resolution, required `markdownlint` check, and force-push/deletion protection.

### GitHub security configuration

- Enabled the dependency graph, Dependabot alerts, malware alerts, security updates, grouped security updates, and private vulnerability reporting.
- Retained secret scanning and push protection.
- Required GitHub Actions dependencies to use full commit SHAs.
- Retained read-only default workflow permissions and prevented Actions from creating or approving pull requests.

## 2026-08-07

### Initial repository

- Created the repository with a one-line README and MIT License.
- Added `GitHub-Repository-Audit.md` containing the reusable GitHub repository audit and configuration prompt.
