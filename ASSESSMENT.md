# Assessment

Updated: 2026-09-01

## Purpose

Prompt Repo is a Markdown library of reusable prompts and OpenAI ChatGPT Project instruction sets for development, automation, planning, content, fitness, construction, legal, career, and other workflows. Its engineering prompts cover repository governance, CI diagnosis, pull request reconciliation, dependency updates, implementation, live operations, Windows connectivity, desktop releases, public documentation, source audits, evidence triage, product research, privacy, and physical-device safety.

## Structure

- `prompts/`: reusable one-time prompts and prompt input guidance.
- `openai/instruction-sets/`: persistent ChatGPT Project instructions grouped by subject.
- `.github/`: repository governance, workflows, catalog automation, and tests.
- `changelog.md`: canonical repository history and current changes.

## Automation and validation

- The README resource catalog is generated from Markdown files.
- Catalog discovery handles recursive folders and OneDrive reparse points.
- Catalog and local-link tests run with Node's built-in test runner.
- CI validates local Markdown links and lints Markdown across the repository.
- CodeQL scans the JavaScript repository automation.
- GitHub Actions use read-only lint permissions and pinned action SHAs.

## Current health

The repository is documentation-first. It has no application build or runtime dependency; its JavaScript maintenance scripts use only Node.js built-ins. Catalog tests, local-link validation, and Markdown lint pass. Instruction sets include domain-specific safety, approval, privacy, and professional-review boundaries where needed.

## Known limitations

- Most content requires user-specific project inputs before it can produce final work.
- External-link reachability, prompt schemas, and content freshness are not yet checked automatically.
- GitHub settings require access to verify and change.
- The administrator bypass can still permit direct pushes to `main`; project guidance reserves it for recovery so normal changes use pull requests and required checks.
