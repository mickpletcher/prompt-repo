Perform a complete audit and configuration review of this GitHub repository:

[INSERT GITHUB REPOSITORY URL]

First, inspect the repository to understand its purpose, technology stack, intended audience, deployment method, and whether it is actively maintained. Then review both the repository contents and its GitHub configuration.

Apply the README badge requirements below by default whenever this prompt is used to set up a new GitHub repository or audit an existing one.

Review and correct the following areas where appropriate:

1. GitHub About section

   * Repository name
   * Description
   * Website or homepage URL
   * Topics
   * Social preview image
   * Whether Releases, Packages, or Deployments should be highlighted

2. General repository settings

   * Default branch
   * Repository visibility
   * Issues, Discussions, Projects, Wiki, Sponsorships, and Pages
   * Pull-request and merge options
   * Automatic deletion of merged branches
   * Branch and tag naming conventions

3. Branch protection and rulesets

   * Protection against force pushes and accidental deletion
   * Pull-request requirements
   * Required status checks
   * Required review-conversation resolution
   * Appropriate protections for a solo-maintained repository without unnecessarily locking me out

4. Security

   * Dependabot alerts and security updates
   * Dependabot version-update configuration
   * Secret scanning and push protection
   * Code scanning
   * Private vulnerability reporting
   * GitHub Actions permissions
   * Workflow security and dependency pinning
   * Exposed credentials, tokens, private data, or other sensitive information
   * Security policy and vulnerability-reporting instructions

5. Repository files and documentation

   * README
   * LICENSE
   * .gitignore
   * SECURITY.md
   * CONTRIBUTING.md
   * CODE_OF_CONDUCT.md
   * SUPPORT.md
   * CODEOWNERS
   * Issue and pull-request templates
   * Dependabot configuration
   * CI, testing, linting, and release workflows
   * Badges, links, installation instructions, usage examples, and outdated documentation

6. README status badges

   * Add a compact row of relevant badges at the top of the main README, immediately below the project title and before the introductory text. Preserve useful existing badges and the README's layout without creating duplicates.
   * Choose badges that fit this project, such as CI/build, tests, linting, security scanning, license, latest release, or package version. Include only badges supported by real repository files, published artifacts, enabled workflows, or configured status services; do not add every possible badge.
   * For GitHub Actions, use the repository's actual owner, repository name, workflow filename, and intended branch. Prefer GitHub's native workflow-status badge and link it to that workflow's Actions page. Use the default branch for the project's ongoing status rather than a temporary setup or pull-request branch.
   * Match each label to what its source actually checks. A workflow that only lints Markdown must not be labeled as a passing application build or test suite. A successful security scan is not a guarantee that the project is secure.
   * Use live status sources for changing values, including when a check is failing or pending; do not hide an unfavorable result. Never hard-code a green passing, coverage, security, or deployment claim. A static license badge is acceptable only when it matches the repository's actual license and links to that license file. Release and package badges must refer to real published releases or packages.
   * If a useful check is missing, configure a project-appropriate workflow only within the authorized scope, then verify its run before adding its status badge. For a new repository with no completed run yet, report the pending verification rather than claiming success. Do not create a no-op workflow, enable a paid service, expose private status data, or add credentials merely to obtain a badge.
   * Verify both the badge image URL and its click-through destination against the actual repository or service. Check the rendered README, descriptive alt text, branch selection, and displayed status. Never embed tokens or other secrets in badge URLs. If a badge is broken, unsupported, inaccessible to the intended audience, or cannot be verified, omit or correct it and explain what remains to be done.
   * In the completion report, list the badges added or updated, their backing workflows or status sources, the links verified, and any omitted or pending badges with the reason.

7. Additional configuration

   * GitHub Pages
   * Environments and deployment protection
   * Webhooks and deploy keys
   * Collaborator permissions
   * Releases and tags
   * Package metadata
   * Any other missing or incorrectly configured GitHub features that would benefit this particular project

Make safe, reversible improvements where you have sufficient access and confidence. Do not change repository visibility, transfer or archive the repository, delete branches or releases, modify collaborators, remove webhooks or deploy keys, rotate secrets, rewrite Git history, or apply protections that might lock me out without first asking for approval.

For repository file changes, create a separate branch and pull request rather than committing directly to the default branch. Run all relevant tests, linting, formatting, security checks, and build commands before finishing.

If you cannot inspect or modify a particular GitHub setting, clearly identify the limitation and provide the exact recommended setting or manual action. Do not claim that an area was verified if you could not access it.

At completion, provide a report containing:

* What you inspected
* Problems found
* Changes made
* Tests and validations performed
* Settings that were already correct
* Items requiring my approval or manual action
* Any remaining risks or recommendations
* A link to the pull request, if one was created
