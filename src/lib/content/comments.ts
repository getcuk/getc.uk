import { readFile } from "node:fs/promises";
import path from "node:path";

export type LegacyComment = {
  id: number;
  parentId: number | null;
  author: string;
  /** Personal site / profile URL from the original WordPress comment, if any. */
  authorUrl?: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  content: string;
};

export type LegacyCommentNode = LegacyComment & {
  replies: LegacyCommentNode[];
};

/**
 * When a lesson slug is shortened, keep loading comments from the old
 * WordPress-era filename until/unless the JSON is renamed to match.
 */
const COMMENT_FILE_ALIASES: Record<string, string[]> = {
  "cs50-library": ["installing-cs50-library-locally-on-macos"],
  "macos-ready-for-c": ["getting-your-macos-ready-for-c"],
  "command-line": ["learn-your-tools-solid-foundation-in-command-line"],
  "why-learn-basics": ["why-learn-basics-of-coding"],
  "hello-world": ["how-to-compile-hello-world-program-in-c"],
};

async function readCommentsFile(fileSlug: string): Promise<LegacyComment[] | null> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "comments",
    `${fileSlug}.json`,
  );

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as LegacyComment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return null;
  }
}

export async function getCommentsForSlug(
  slug: string,
): Promise<LegacyComment[]> {
  const candidates = [slug, ...(COMMENT_FILE_ALIASES[slug] ?? [])];
  let emptyHit: LegacyComment[] | null = null;

  for (const fileSlug of candidates) {
    const comments = await readCommentsFile(fileSlug);
    if (comments === null) continue;
    if (comments.length > 0) return comments;
    emptyHit ??= comments;
  }

  return emptyHit ?? [];
}

export function buildCommentTree(
  comments: LegacyComment[],
): LegacyCommentNode[] {
  const byId = new Map<number, LegacyCommentNode>();
  for (const comment of comments) {
    byId.set(comment.id, { ...comment, replies: [] });
  }

  const roots: LegacyCommentNode[] = [];
  for (const comment of comments) {
    const node = byId.get(comment.id);
    if (!node) continue;

    if (comment.parentId != null && byId.has(comment.parentId)) {
      byId.get(comment.parentId)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
