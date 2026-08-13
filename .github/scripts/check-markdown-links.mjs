#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const IGNORED_DIRECTORIES = new Set([".git", "node_modules"]);

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await markdownFiles(entryPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(entryPath);
    }
  }

  return files;
}

function withoutFencedCode(content) {
  const lines = content.split(/\r?\n/);
  let fenceCharacter;
  let fenceLength = 0;

  return lines
    .map((line) => {
      const match = line.match(/^\s*(`{3,}|~{3,})/);

      if (!match) {
        return fenceCharacter ? "" : line;
      }

      const marker = match[1];

      if (!fenceCharacter) {
        fenceCharacter = marker[0];
        fenceLength = marker.length;
        return "";
      }

      if (marker[0] === fenceCharacter && marker.length >= fenceLength) {
        fenceCharacter = undefined;
        fenceLength = 0;
      }

      return "";
    })
    .join("\n");
}

function linkTargets(content) {
  const targets = [];
  const linkPattern = /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))/g;

  for (const match of withoutFencedCode(content).matchAll(linkPattern)) {
    targets.push(match[1] ?? match[2]);
  }

  return targets;
}

function isRemoteOrPageAnchor(target) {
  return (
    target.startsWith("#") ||
    target.startsWith("//") ||
    target.startsWith("/") ||
    /^[a-z][a-z\d+.-]*:/i.test(target)
  );
}

function decodeLinkPath(target) {
  const pathPart = target.split("#", 1)[0].split("?", 1)[0];

  try {
    return decodeURIComponent(pathPart);
  } catch {
    return undefined;
  }
}

export async function validateMarkdownLinks(repositoryRoot) {
  const root = path.resolve(repositoryRoot);
  const files = (await markdownFiles(root)).sort();
  const findings = [];

  for (const file of files) {
    const source = path.relative(root, file).split(path.sep).join("/");
    const content = await readFile(file, "utf8");

    for (const target of linkTargets(content)) {
      if (isRemoteOrPageAnchor(target)) {
        continue;
      }

      const decodedPath = decodeLinkPath(target);

      if (!decodedPath) {
        findings.push({ source, target, reason: "invalid URL encoding" });
        continue;
      }

      const resolved = path.resolve(path.dirname(file), decodedPath);
      const relativeToRoot = path.relative(root, resolved);

      if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
        findings.push({ source, target, reason: "link leaves the repository" });
        continue;
      }

      try {
        await access(resolved);
      } catch {
        findings.push({ source, target, reason: "target does not exist" });
      }
    }
  }

  return { checkedFiles: files.length, findings };
}

async function main() {
  const result = await validateMarkdownLinks(process.cwd());

  if (result.findings.length) {
    for (const finding of result.findings) {
      console.error(
        `${finding.source}: ${finding.target} (${finding.reason})`,
      );
    }

    throw new Error(`${result.findings.length} local Markdown link(s) failed.`);
  }

  console.log(
    `Checked ${result.checkedFiles} Markdown files; all local links resolve.`,
  );
}

const invokedPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : undefined;

if (invokedPath === import.meta.url) {
  await main();
}
