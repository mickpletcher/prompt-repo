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
- Requested scope: `[CREATE FILE ONLY | ADD TO REPOSITORY | CONFIGURE ON GITHUB]`

Do not change the GitHub social preview setting or publish the asset unless the
requested scope authorizes it.

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

- absolute output path;
- dimensions;
- file type;
- file size;
- checksum when requested;
- repository diff when the file is added;
- Markdown or configuration references if applicable.

Confirm the file exists before providing a link. Use an application-compatible
absolute file link for local delivery.

### 6. Publish only when authorized

If repository publication is requested:

- place the asset at the approved tracked path;
- run repository validation;
- review licensing and private-data concerns;
- commit and open the requested pull request.

If configuring GitHub is requested, verify the repository identity and current
preview before changing it. Read back or visually confirm the applied preview.

### Completion report

Provide:

- design concept and repository elements represented;
- finished file link;
- dimensions, format, and file size;
- visual and privacy verification;
- tracked-file, pull-request, and GitHub-setting status;
- any manual upload still required.
