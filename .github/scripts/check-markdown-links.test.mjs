import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { validateMarkdownLinks } from "./check-markdown-links.mjs";

async function fixture(files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "prompt-repo-links-"));

  for (const [filePath, content] of Object.entries(files)) {
    const absolutePath = path.join(root, filePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content, "utf8");
  }

  return root;
}

test("valid local links pass", async (context) => {
  const root = await fixture({
    "README.md": "See [the guide](docs/guide.md).",
    "docs/guide.md": "# Guide\n",
  });
  context.after(() => rm(root, { recursive: true, force: true }));

  const result = await validateMarkdownLinks(root);

  assert.equal(result.checkedFiles, 2);
  assert.deepEqual(result.findings, []);
});

test("missing local links are reported", async (context) => {
  const root = await fixture({
    "README.md": "See [the missing guide](docs/missing.md).",
  });
  context.after(() => rm(root, { recursive: true, force: true }));

  const result = await validateMarkdownLinks(root);

  assert.deepEqual(result.findings, [
    {
      source: "README.md",
      target: "docs/missing.md",
      reason: "target does not exist",
    },
  ]);
});

test("remote links, page anchors, and fenced examples are ignored", async (context) => {
  const root = await fixture({
    "README.md": [
      "[Website](https://example.com)",
      "[Section](#section)",
      "```markdown",
      "[Example](not-a-real-file.md)",
      "```",
    ].join("\n"),
  });
  context.after(() => rm(root, { recursive: true, force: true }));

  const result = await validateMarkdownLinks(root);

  assert.deepEqual(result.findings, []);
});

test("URL-encoded relative paths resolve", async (context) => {
  const root = await fixture({
    "README.md": "See [the guide](docs/encoded%20name.md).",
    "docs/encoded name.md": "# Guide\n",
  });
  context.after(() => rm(root, { recursive: true, force: true }));

  const result = await validateMarkdownLinks(root);

  assert.deepEqual(result.findings, []);
});
