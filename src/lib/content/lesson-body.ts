import { readFile } from "node:fs/promises";
import path from "node:path";

export type LessonSegment =
  | { type: "markdown"; value: string }
  | { type: "gist"; user: string; id: string }
  | { type: "youtube"; id: string };

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
const SEGMENT_RE =
  /<!--\s*gist:([\w-]+)\/([a-f0-9]+)\s*-->|<!--\s*youtube:([A-Za-z0-9_-]+)\s*-->/g;

/** Standalone YouTube URL on its own line (watch, embed, or youtu.be). */
const YOUTUBE_LINE_RE =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?[^\s]*?\bv=|embed\/)|youtu\.be\/)([^\s]+)\s*$/gm;

function stripFrontmatter(raw: string): string {
  return raw.replace(FRONTMATTER_RE, "");
}

export function extractYoutubeId(rawUrl: string): string | null {
  const cleaned = rawUrl.replace(/\\_/g, "_").trim();
  try {
    const url = new URL(
      cleaned.startsWith("http") ? cleaned : `https://${cleaned}`,
    );
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? id.replace(/[^A-Za-z0-9_-]/g, "") : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) {
        const id = url.pathname.split("/")[2];
        return id ? id.replace(/[^A-Za-z0-9_-]/g, "") : null;
      }
      const id = url.searchParams.get("v");
      return id ? id.replace(/[^A-Za-z0-9_-]/g, "") : null;
    }
  } catch {
    return null;
  }
  return null;
}

function normalizeMediaMarkers(body: string): string {
  return body.replace(YOUTUBE_LINE_RE, (line) => {
    const id = extractYoutubeId(line);
    return id ? `\n\n<!-- youtube:${id} -->\n\n` : line;
  });
}

export function splitLessonBody(body: string): LessonSegment[] {
  const normalized = normalizeMediaMarkers(body);
  const segments: LessonSegment[] = [];
  let lastIndex = 0;

  for (const match of normalized.matchAll(SEGMENT_RE)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      const value = normalized.slice(lastIndex, index).trim();
      if (value) segments.push({ type: "markdown", value });
    }

    if (match[1] && match[2]) {
      segments.push({ type: "gist", user: match[1], id: match[2] });
    } else if (match[3]) {
      segments.push({ type: "youtube", id: match[3] });
    }

    lastIndex = index + match[0].length;
  }

  const trailing = normalized.slice(lastIndex).trim();
  if (trailing) segments.push({ type: "markdown", value: trailing });

  return segments;
}

export async function getLessonBody(slug: string): Promise<LessonSegment[]> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "lessons",
    slug,
    "index.md",
  );
  const raw = await readFile(filePath, "utf8");
  return splitLessonBody(stripFrontmatter(raw));
}
