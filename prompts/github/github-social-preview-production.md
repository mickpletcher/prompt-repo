# GitHub Social Preview Production

Use this prompt to create a finished, repository-specific GitHub social-preview
image and verify the deliverable rather than returning design suggestions alone.

## Prompt

Create a social preview for this repository:

- Repository URL or path: `[INSERT REPOSITORY]`
- Project name: `[INSERT NAME OR DISCOVER]`
- One-sentence purpose: `[INSERT PURPOSE OR DISCOVER]`
- Required text or tagline: `[INSERT TEXT OR NONE]`
- Existing logo, icon, or brand assets: `[INSERT PATHS OR NONE]`
- Preferred visual style: `[INSERT STYLE OR USE REPOSITORY IDENTITY]`
- Required format: `[PNG | JPG]`
- Maximum file size: `[INSERT LIMIT OR NONE]`
- Approved destination path: `[INSERT PATH]`
- Repository delivery: `[LOCAL FILE ONLY | ADD TO WORKTREE | COMMIT | PULL REQUEST]`
- GitHub preview configuration: `[DO NOT CONFIGURE | CONFIGURE ON GITHUB]`

Repository delivery and GitHub configuration are separate authorizations.
Adding the asset to a worktree does not authorize a commit, push, pull request,
or GitHub setting change.

### 1. Understand the repository

Inspect the README, application, screenshots, existing visual assets, license,
and intended audience. Identify:

- the project's actual purpose;
- its strongest recognizable concept;
- existing colors and visual language;
- sensitive or private details that must not appear;
- whether third-party logos or trademarks can be used legally.

Do not invent features or imply endorsements.

### 2. Define the visual concept

Use a simple composition that remains readable in a small GitHub card:

- one clear focal point;
- short project name;
- optional concise tagline;
- strong contrast;
- safe margins around important content;
- limited colors and visual clutter;
- no tiny code, screenshots, URLs, badges, or paragraphs.

Prefer original graphics, repository-owned assets, or clearly permitted icons.
Do not copy another project's branded artwork.

### 3. Produce the final asset

Create the image at GitHub's recommended social-preview aspect ratio, normally
`1280 x 640` pixels unless current GitHub guidance specifies otherwise.

Use the requested format. If a PNG exceeds the approved file-size limit and the
user requests JPG, convert it with appropriate quality rather than only renaming
the extension.

Avoid unnecessary metadata. Use an sRGB-compatible color profile when possible.

### 4. Inspect visually

Open the generated file and verify:

- exact dimensions;
- correct format and extension;
- readable project name at thumbnail size;
- adequate contrast and safe margins;
- no clipped, distorted, misspelled, or invented text;
- no credentials, usernames, private paths, internal hostnames, or identifying
  screenshots;
- visual accuracy to the repository.

Iterate until the actual rendered asset passes. Do not approve it from source
instructions alone.

### 5. Validate the deliverable

Report and verify:

- repository-relative path, attachment, or sandbox-safe file link;
- dimensions;
- file type;
- file size;
- checksum when requested;
- repository diff when the file is added;
- Markdown or configuration references if applicable.

Confirm the file exists before providing a link. Do not disclose a full host
path unless it is explicitly needed and approved.

### 6. Publish only when authorized

If adding the file to the worktree is requested:

- place the asset at the approved tracked path;
- run repository validation;
- review licensing and private-data concerns.

Commit only when `COMMIT` or `PULL REQUEST` delivery is selected. Push and open
a pull request only when `PULL REQUEST` is selected.

If `CONFIGURE ON GITHUB` is separately selected, verify the repository identity
and current preview before changing it. Read back or visually confirm the
applied preview.

### Completion report

Provide:

- design concept and repository elements represented;
- finished file link;
- dimensions, format, and file size;
- visual and privacy verification;
- tracked-file, pull-request, and GitHub-setting status;
- any manual upload still required.
