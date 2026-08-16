#!/usr/bin/env node
/**
 * One-off: import approved WordPress comments into content/comments/{slug}.json
 *
 * Usage:
 *   node scripts/import-wp-comments.mjs [path-to-wordpress-xml]
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DEFAULT_XML = path.join(
  process.env.HOME || "",
  "Desktop/ktc-site/krishanthecoder.WordPress.2026-08-01.xml",
);

const xmlPath = process.argv[2] || DEFAULT_XML;
const lessonsDir = path.join(ROOT, "content/lessons");
const outDir = path.join(ROOT, "content/comments");

/**
 * Current lesson folder slug → WordPress post_name(s) to pull comments from.
 * Keep in sync with permanent redirects in next.config.ts.
 */
const WP_SLUG_ALIASES = {
  "cs50-library": ["installing-cs50-library-locally-on-macos"],
  "macos-ready-for-c": ["getting-your-macos-ready-for-c"],
  "command-line": ["learn-your-tools-solid-foundation-in-command-line"],
  "why-learn-basics": ["why-learn-basics-of-coding"],
  "hello-world": ["how-to-compile-hello-world-program-in-c"],
};

function cdataOrText(block, name) {
  const cdata = block.match(
    new RegExp(`<wp:${name}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></wp:${name}>`),
  );
  if (cdata) return cdata[1];
  const plain = block.match(new RegExp(`<wp:${name}>([\\s\\S]*?)</wp:${name}>`));
  return plain ? plain[1] : "";
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ""));
}

function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(
        /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
        (_, href, text) => {
          const label = stripTags(text).trim() || href;
          return `[${label}](${href})`;
        },
      )
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function authorUrl(block) {
  const raw = cdataOrText(block, "comment_author_url").trim();
  if (!raw) return undefined;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return undefined;
    }
    return parsed.href;
  } catch {
    return undefined;
  }
}

function displayAuthor(name) {
  const trimmed = name.trim();
  if (!trimmed) return "Anonymous";
  if (trimmed === "Krishan") return "Kulwinder Krishan";
  return trimmed;
}

function toIsoDate(wpDate) {
  // "2019-11-15 12:34:56" → "2019-11-15"
  const m = wpDate.trim().match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : wpDate.trim();
}

const xml = readFileSync(xmlPath, "utf8");
const slugs = (await readdir(lessonsDir, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

await mkdir(outDir, { recursive: true });

let total = 0;

for (const slug of slugs) {
  const wpNames = [slug, ...(WP_SLUG_ALIASES[slug] ?? [])];
  let comments = [];

  for (const wpName of wpNames) {
    const needle = `<wp:post_name><![CDATA[${wpName}]]></wp:post_name>`;
    const idx = xml.indexOf(needle);
    if (idx === -1) continue;

    const start = xml.lastIndexOf("<item>", idx);
    const end = xml.indexOf("</item>", idx);
    const chunk = xml.slice(start, end);
    const blocks = [...chunk.matchAll(/<wp:comment>([\s\S]*?)<\/wp:comment>/g)].map(
      (m) => m[1],
    );

    const found = blocks
      .map((block) => {
        const approved = cdataOrText(block, "comment_approved").trim();
        if (approved !== "1" && approved.toLowerCase() !== "true") return null;

        const id = Number(cdataOrText(block, "comment_id").trim());
        const parentRaw = cdataOrText(block, "comment_parent").trim();
        const parentId = Number(parentRaw) || 0;

        const url = authorUrl(block);
        return {
          id,
          parentId: parentId > 0 ? parentId : null,
          author: displayAuthor(cdataOrText(block, "comment_author").trim()),
          ...(url ? { authorUrl: url } : {}),
          date: toIsoDate(cdataOrText(block, "comment_date")),
          content: stripHtml(cdataOrText(block, "comment_content")),
        };
      })
      .filter(Boolean);

    if (found.length > comments.length) {
      comments = found;
    }
  }

  comments.sort((a, b) => {
    if (a.date === b.date) return a.id - b.id;
    return a.date < b.date ? -1 : 1;
  });

  const outPath = path.join(outDir, `${slug}.json`);
  await writeFile(outPath, `${JSON.stringify(comments, null, 2)}\n`, "utf8");
  total += comments.length;
  if (comments.length) {
    console.log(`${String(comments.length).padStart(3)}  ${slug}`);
  }
}

console.log(`Wrote ${slugs.length} files, ${total} approved comments → ${outDir}`);
