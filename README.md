# Prompt Repo

[![Markdown lint](https://github.com/mickpletcher/prompt-repo/actions/workflows/markdownlint.yml/badge.svg)](https://github.com/mickpletcher/prompt-repo/actions/workflows/markdownlint.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A growing library of reusable prompts and project instruction files for
building, auditing, automating, and maintaining software projects.

The content is intended for developers, automation engineers, maintainers, and
anyone using AI-assisted development tools. Everything is stored as plain text
or Markdown, so no installation, build, or deployment is required.

## Catalog

| Resource | Type | Purpose |
| --- | --- | --- |
| [GitHub Repository Audit](GitHub-Repository-Audit.md) | Prompt | Inspect a GitHub repository, improve safe settings and files, validate the result, and report anything that still requires approval. |

## Use a resource

1. Open the prompt or instruction file you want to use.
2. Copy its contents.
3. Replace placeholders such as `[INSERT GITHUB REPOSITORY URL]`.
4. Paste the result into the appropriate AI or automation tool.
5. Review the proposed actions before approving consequential changes.

Prompts in this repository may instruct an AI agent to edit files or external
settings. Read the prompt first, confirm its scope, and use least-privilege
credentials whenever a connected service is involved.

## Repository organization

The existing root-level prompt remains in place for stable links. As the
collection expands, new content should use these directories:

- `prompts/<category>/` for reusable standalone prompts
- `instructions/<tool-or-project>/` for persistent project instruction files
- `.github/` for repository governance and automation

See [CONTRIBUTING.md](CONTRIBUTING.md) for naming, quality, safety, branch, and
pull-request guidance.

## Support and security

- Use [GitHub Issues](https://github.com/mickpletcher/prompt-repo/issues) for
  content problems and requests.
- Read [SUPPORT.md](SUPPORT.md) before requesting help.
- Report sensitive concerns according to [SECURITY.md](SECURITY.md); never put
  credentials or undisclosed vulnerabilities in a public issue.

## Project status

This is an early-stage library. The initial resource is available now, and the
repository structure supports adding more prompts and instruction files over
time.

## License

Released under the [MIT License](LICENSE).
