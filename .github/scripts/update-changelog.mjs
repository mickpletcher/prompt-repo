const {
  API_URL = "https://api.github.com",
  GH_TOKEN,
  PR_NUMBER,
  REPOSITORY,
} = process.env;

if (!GH_TOKEN || !REPOSITORY || !PR_NUMBER) {
  throw new Error("GH_TOKEN, REPOSITORY, and PR_NUMBER are required.");
}

const pullNumber = Number.parseInt(PR_NUMBER, 10);
if (!Number.isInteger(pullNumber) || pullNumber < 1) {
  throw new Error(`Invalid pull request number: ${PR_NUMBER}`);
}

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${GH_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28",
};

async function github(path, { method = "GET", body } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...headers,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `${method} ${path} failed (${response.status}): ${responseText.slice(0, 1000)}`,
    );
  }

  return responseText ? JSON.parse(responseText) : undefined;
}

function markdownText(value) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("*", "\\*")
    .replaceAll("_", "\\_")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replace(/\s+/g, " ")
    .trim();
}

function markdownCode(value) {
  const runs = value.match(/`+/g) ?? [];
  const fenceLength = Math.max(1, ...runs.map((run) => run.length + 1));
  const fence = "`".repeat(fenceLength);
  return `${fence}${value}${fence}`;
}

function describeFile(file) {
  const filename = markdownCode(file.filename);

  switch (file.status) {
    case "added":
      return `Added ${filename}.`;
    case "removed":
      return `Removed ${filename}.`;
    case "renamed":
      return `Renamed ${markdownCode(file.previous_filename)} to ${filename}.`;
    case "modified":
      return `Updated ${filename}.`;
    default:
      return `${markdownText(file.status)} ${filename}.`;
  }
}

async function pullRequestFiles() {
  const files = [];

  for (let page = 1; ; page += 1) {
    const batch = await github(
      `/repos/${REPOSITORY}/pulls/${pullNumber}/files?per_page=100&page=${page}`,
    );
    files.push(...batch);

    if (batch.length < 100) {
      return files;
    }
  }
}

const pullRequest = await github(
  `/repos/${REPOSITORY}/pulls/${pullNumber}`,
);

if (pullRequest.state !== "open") {
  throw new Error(`Pull request #${pullNumber} is not open.`);
}

if (pullRequest.head.repo.full_name !== REPOSITORY) {
  throw new Error(
    `Pull request #${pullNumber} is from a fork and cannot be updated automatically.`,
  );
}

const files = (await pullRequestFiles())
  .filter((file) => file.filename !== "changelog.md")
  .sort((left, right) => left.filename.localeCompare(right.filename));
const startMarker = `<!-- changelog:pr-${pullNumber}:start -->`;
const endMarker = `<!-- changelog:pr-${pullNumber}:end -->`;
const details = files.length
  ? files.map((file) => `  - ${describeFile(file)}`)
  : ["  - Updated repository content."];
const entry = [
  startMarker,
  `- **${markdownText(pullRequest.title)}** ([#${pullNumber}](${pullRequest.html_url}))`,
  ...details,
  endMarker,
].join("\n");

const branch = pullRequest.head.ref;
const changelogFile = await github(
  `/repos/${REPOSITORY}/contents/changelog.md?ref=${encodeURIComponent(branch)}`,
);
const current = Buffer.from(
  changelogFile.content.replaceAll("\n", ""),
  "base64",
).toString("utf8");
let updated;

const startIndex = current.indexOf(startMarker);
const endIndex = current.indexOf(endMarker);

if (startIndex >= 0 || endIndex >= 0) {
  if (startIndex < 0 || endIndex < startIndex) {
    throw new Error(`Changelog markers for pull request #${pullNumber} are incomplete.`);
  }

  updated =
    current.slice(0, startIndex) +
    entry +
    current.slice(endIndex + endMarker.length);
} else {
  const anchor = "<!-- automated-changelog -->";
  const anchorIndex = current.indexOf(anchor);

  if (anchorIndex < 0) {
    throw new Error(`Missing changelog insertion anchor: ${anchor}`);
  }

  const insertAt = anchorIndex + anchor.length;
  updated =
    current.slice(0, insertAt) +
    `\n\n${entry}` +
    current.slice(insertAt);
}

if (updated === current) {
  console.log(`Changelog entry for pull request #${pullNumber} is current.`);
  process.exit(0);
}

const result = await github(
  `/repos/${REPOSITORY}/contents/changelog.md`,
  {
    method: "PUT",
    body: {
      branch,
      content: Buffer.from(updated, "utf8").toString("base64"),
      message: `Update changelog for #${pullNumber}`,
      sha: changelogFile.sha,
    },
  },
);

console.log(`Updated changelog at ${result.commit.sha}.`);

await github(
  `/repos/${REPOSITORY}/actions/workflows/markdownlint.yml/dispatches`,
  {
    method: "POST",
    body: { ref: branch },
  },
);

console.log(`Dispatched Markdown lint for ${branch}.`);
