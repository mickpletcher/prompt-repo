Perform a complete audit and configuration review of this GitHub repository:

[INSERT GITHUB REPOSITORY URL]

First, inspect the repository to understand its purpose, technology stack, intended audience, deployment method, and whether it is actively maintained. Then review both the repository contents and its GitHub configuration.

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

6. Additional configuration

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
