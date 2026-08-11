# Contributing

Contributions that make the prompt and instruction library more useful,
accurate, safe, or easier to navigate are welcome.

## Content types

- Put reusable, copy-ready prompts in `prompts/<category>/`.
- Put persistent project or tool instruction files in
  `instructions/<tool-or-project>/`.
- Keep existing root-level resources in place unless a move has been discussed
  first, so published links remain stable.

Use a descriptive Markdown filename. Prefer lowercase kebab-case for new files,
for example `github-repository-audit.md`. Existing filenames do not need to be
renamed solely to match this convention.

## Content quality

Every contribution should:

- explain its purpose and intended tool or audience
- identify user-supplied values with obvious placeholders
- define the expected output or completion report
- distinguish safe automatic actions from changes that require approval
- avoid embedding credentials, private data, or environment-specific secrets
- avoid destructive defaults and unrestricted permission requests
- be understandable without relying on an undocumented conversation
- use original wording or material that can legally be redistributed

Test a prompt against a non-critical project when practical. Remove generated
logs, personal paths, account identifiers, and test credentials before opening
a pull request.

## Branch and tag names

Use one of these branch patterns:

- `content/<short-description>` for prompts and instruction files
- `docs/<short-description>` for documentation-only work
- `maintenance/<short-description>` for automation and repository upkeep

If releases are introduced, use semantic version tags such as `v1.2.0`. Do not
create a release or tag for every content edit.

## Pull requests

1. Create a branch from `main`.
2. Make one focused change.
3. Run Markdown lint locally when available:

   ```shell
   npx --yes markdownlint-cli2@0.23.2
   ```

4. Complete the pull-request checklist.
5. Resolve review conversations before merging.

Squash merging is preferred so each pull request produces one focused commit.

## Reporting problems

Use an issue for incorrect, outdated, or unclear content. Follow
[SECURITY.md](SECURITY.md) instead when a report contains secrets, private data,
or an exploitable security concern.
