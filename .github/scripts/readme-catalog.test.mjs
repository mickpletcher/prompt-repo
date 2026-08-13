import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  CATALOG_END,
  CATALOG_START,
  collectLocalResources,
  renderCatalog,
  replaceCatalog,
} from "./readme-catalog.mjs";

const resources = [
  {
    path: "prompts/README.md",
    content: "# Prompts\n\nStore reusable prompts in this directory.\n",
  },
  {
    path: "prompts/GitHub-Repository-Settings-Audit.md",
    content: "Perform a complete audit of this GitHub repository.\n",
  },
  {
    path: "openai/instruction-sets/README.md",
    content: "# Instruction Sets\n\nStore persistent instructions here.\n",
  },
  {
    path: "openai/instruction-sets/hvac/hvac-troubleshooting.md",
    content: "# Role\n\nYou are an HVAC troubleshooting assistant.\n",
  },
];

test("renderCatalog lists every Markdown resource in its collection", () => {
  const catalog = renderCatalog(resources);

  assert.match(catalog, /GitHub Repository Settings Audit/);
  assert.match(catalog, /Prompts Directory Guide/);
  assert.match(catalog, /hvac troubleshooting/);
  assert.match(catalog, /Instruction Sets Directory Guide/);
  assert.equal((catalog.match(/^\| \[/gm) ?? []).length, resources.length);
  assert.ok(
    catalog.indexOf("### Prompts") < catalog.indexOf("### Instruction sets"),
  );
});

test("renderCatalog derives concise purposes from the first prose paragraph", () => {
  const catalog = renderCatalog(resources);

  assert.match(catalog, /Perform a complete audit of this GitHub repository\./);
  assert.match(catalog, /You are an HVAC troubleshooting assistant\./);
  assert.doesNotMatch(catalog, /\| Role \|/);
});

test("replaceCatalog updates only the generated marker block", () => {
  const readme = [
    "# Repository",
    "",
    "## Catalog",
    "",
    CATALOG_START,
    "old catalog",
    CATALOG_END,
    "",
    "## Usage",
    "",
    "Keep this content.",
  ].join("\n");
  const updated = replaceCatalog(readme, resources);

  assert.match(updated, /Keep this content\./);
  assert.doesNotMatch(updated, /old catalog/);
  assert.equal(replaceCatalog(updated, resources), updated);
});

test("removed resources disappear from the generated catalog", () => {
  const withoutHvac = resources.filter(
    (resource) => resource.path !== "openai/instruction-sets/hvac/hvac-troubleshooting.md",
  );

  assert.doesNotMatch(renderCatalog(withoutHvac), /HVAC Troubleshooting/);
});

test("replaceCatalog rejects missing or incomplete markers", () => {
  assert.throws(() => replaceCatalog("# Repository\n", resources), /must contain/);
  assert.throws(
    () => replaceCatalog(`${CATALOG_START}\n`, resources),
    /must contain/,
  );
});

test("collectLocalResources discovers additions and removals recursively", async () => {
  const repositoryRoot = await mkdtemp(path.join(tmpdir(), "readme-catalog-"));

  try {
    await mkdir(path.join(repositoryRoot, "prompts", "github"), {
      recursive: true,
    });
    await mkdir(path.join(repositoryRoot, "openai", "instruction-sets"), {
      recursive: true,
    });
    await writeFile(
      path.join(repositoryRoot, "prompts", "github", "audit.md"),
      "Audit a repository.\n",
    );
    await writeFile(
      path.join(repositoryRoot, "openai", "instruction-sets", "assistant.md"),
      "Configure an assistant.\n",
    );

    const added = await collectLocalResources(repositoryRoot);
    assert.deepEqual(
      added.map((resource) => resource.path),
      ["openai/instruction-sets/assistant.md", "prompts/github/audit.md"],
    );

    await rm(path.join(repositoryRoot, "prompts", "github", "audit.md"));
    const removed = await collectLocalResources(repositoryRoot);
    assert.deepEqual(
      removed.map((resource) => resource.path),
      ["openai/instruction-sets/assistant.md"],
    );
  } finally {
    await rm(repositoryRoot, { recursive: true, force: true });
  }
});
