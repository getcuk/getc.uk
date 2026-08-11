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

function cdataOrText(block, name) {
  const cdata = block.match(
    new RegExp(`<wp:${name}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></wp:${name}>`),
  );
  if (cdata) return cdata[1];
  const plain = block.match(new RegExp(`<wp:${name}>([\\s\\S]*?)</wp:${name}>`));
  return plain ? plain[1] : "";
}

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
  const needle = `<wp:post_name><![CDATA[${slug}]]></wp:post_name>`;
  const idx = xml.indexOf(needle);
  let comments = [];

  if (idx !== -1) {
    const start = xml.lastIndexOf("<item>", idx);
    const end = xml.indexOf("</item>", idx);
    const chunk = xml.slice(start, end);
    const blocks = [...chunk.matchAll(/<wp:comment>([\s\S]*?)<\/wp:comment>/g)].map(
      (m) => m[1],
    );

    comments = blocks
      .map((block) => {
        const approved = cdataOrText(block, "comment_approved").trim();
        if (approved !== "1" && approved.toLowerCase() !== "true") return null;

        const id = Number(cdataOrText(block, "comment_id").trim());
        const parentRaw = cdataOrText(block, "comment_parent").trim();
        const parentId = Number(parentRaw) || 0;

        return {
          id,
          parentId: parentId > 0 ? parentId : null,
          author: cdataOrText(block, "comment_author").trim() || "Anonymous",
          date: toIsoDate(cdataOrText(block, "comment_date")),
          content: stripHtml(cdataOrText(block, "comment_content")),
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.date === b.date) return a.id - b.id;
        return a.date < b.date ? -1 : 1;
      });
  }

  const outPath = path.join(outDir, `${slug}.json`);
  await writeFile(outPath, `${JSON.stringify(comments, null, 2)}\n`, "utf8");
  total += comments.length;
  if (comments.length) {
    console.log(`${String(comments.length).padStart(3)}  ${slug}`);
  }
}

console.log(`Wrote ${slugs.length} files, ${total} approved comments → ${outDir}`);
