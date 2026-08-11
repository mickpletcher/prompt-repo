import { replaceCatalog } from "./readme-catalog.mjs";

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

const repositoryPath = REPOSITORY.split("/").map(encodeURIComponent).join("/");
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
      `/repos/${repositoryPath}/pulls/${pullNumber}/files?per_page=100&page=${page}`,
    );
    files.push(...batch);

    if (batch.length < 100) {
      return files;
    }
  }
}

function decodeBlob(blob) {
  if (blob.encoding !== "base64") {
    throw new Error(`Unsupported Git blob encoding: ${blob.encoding}`);
  }

  return Buffer.from(blob.content.replaceAll("\n", ""), "base64").toString(
    "utf8",
  );
}

async function blobContent(sha) {
  return decodeBlob(
    await github(`/repos/${repositoryPath}/git/blobs/${encodeURIComponent(sha)}`),
  );
}

function treeEntry(tree, filePath) {
  const entry = tree.find((item) => item.path === filePath && item.type === "blob");

  if (!entry) {
    throw new Error(`Missing required repository file: ${filePath}`);
  }

  return entry;
}

function updateChangelog(current, pullRequest, files) {
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
  const startIndex = current.indexOf(startMarker);
  const endIndex = current.indexOf(endMarker);

  if (startIndex >= 0 || endIndex >= 0) {
    if (startIndex < 0 || endIndex < startIndex) {
      throw new Error(
        `Changelog markers for pull request #${pullNumber} are incomplete.`,
      );
    }

    return (
      current.slice(0, startIndex) +
      entry +
      current.slice(endIndex + endMarker.length)
    );
  }

  const anchor = "<!-- automated-changelog -->";
  const anchorIndex = current.indexOf(anchor);

  if (anchorIndex < 0) {
    throw new Error(`Missing changelog insertion anchor: ${anchor}`);
  }

  const insertAt = anchorIndex + anchor.length;
  return current.slice(0, insertAt) + `\n\n${entry}` + current.slice(insertAt);
}

async function createBlob(content) {
  const blob = await github(`/repos/${repositoryPath}/git/blobs`, {
    method: "POST",
    body: { content, encoding: "utf-8" },
  });
  return blob.sha;
}

const pullRequest = await github(
  `/repos/${repositoryPath}/pulls/${pullNumber}`,
);

if (pullRequest.state !== "open") {
  throw new Error(`Pull request #${pullNumber} is not open.`);
}

if (pullRequest.head.repo.full_name !== REPOSITORY) {
  throw new Error(
    `Pull request #${pullNumber} is from a fork and cannot be updated automatically.`,
  );
}

const headSha = pullRequest.head.sha;
const headCommit = await github(
  `/repos/${repositoryPath}/git/commits/${encodeURIComponent(headSha)}`,
);
const treeResponse = await github(
  `/repos/${repositoryPath}/git/trees/${encodeURIComponent(headCommit.tree.sha)}?recursive=1`,
);

if (treeResponse.truncated) {
  throw new Error("Repository tree is too large to generate a complete catalog.");
}

const markdownEntries = treeResponse.tree
  .filter(
    (entry) =>
      entry.type === "blob" &&
      /^(prompts|instruction-sets)\/.+\.md$/i.test(entry.path),
  )
  .sort((left, right) => left.path.localeCompare(right.path));
const resources = await Promise.all(
  markdownEntries.map(async (entry) => ({
    path: entry.path,
    content: await blobContent(entry.sha),
  })),
);
const readmeEntry = treeEntry(treeResponse.tree, "README.md");
const changelogEntry = treeEntry(treeResponse.tree, "changelog.md");
const currentReadme = await blobContent(readmeEntry.sha);
const currentChangelog = await blobContent(changelogEntry.sha);
const updatedReadme = replaceCatalog(currentReadme, resources);
const readmeChanged = updatedReadme !== currentReadme;
const files = (await pullRequestFiles())
  .filter((file) => file.filename !== "changelog.md")
  .sort((left, right) => left.filename.localeCompare(right.filename));

if (readmeChanged && !files.some((file) => file.filename === "README.md")) {
  files.push({ filename: "README.md", status: "modified" });
  files.sort((left, right) => left.filename.localeCompare(right.filename));
}

const updatedChangelog = updateChangelog(currentChangelog, pullRequest, files);
const changelogChanged = updatedChangelog !== currentChangelog;

if (!readmeChanged && !changelogChanged) {
  console.log(
    `README catalog and changelog for pull request #${pullNumber} are current.`,
  );
  process.exit(0);
}

const tree = [];

if (readmeChanged) {
  tree.push({
    path: "README.md",
    mode: readmeEntry.mode,
    type: "blob",
    sha: await createBlob(updatedReadme),
  });
}

if (changelogChanged) {
  tree.push({
    path: "changelog.md",
    mode: changelogEntry.mode,
    type: "blob",
    sha: await createBlob(updatedChangelog),
  });
}

const newTree = await github(`/repos/${repositoryPath}/git/trees`, {
  method: "POST",
  body: { base_tree: headCommit.tree.sha, tree },
});
const newCommit = await github(`/repos/${repositoryPath}/git/commits`, {
  method: "POST",
  body: {
    message: `Update repository metadata for #${pullNumber}`,
    tree: newTree.sha,
    parents: [headSha],
  },
});
const encodedBranch = pullRequest.head.ref
  .split("/")
  .map(encodeURIComponent)
  .join("/");

await github(`/repos/${repositoryPath}/git/refs/heads/${encodedBranch}`, {
  method: "PATCH",
  body: { sha: newCommit.sha, force: false },
});

console.log(`Updated repository metadata at ${newCommit.sha}.`);

await github(
  `/repos/${repositoryPath}/actions/workflows/markdownlint.yml/dispatches`,
  {
    method: "POST",
    body: { ref: pullRequest.head.ref },
  },
);

console.log(`Dispatched Markdown lint for ${pullRequest.head.ref}.`);
