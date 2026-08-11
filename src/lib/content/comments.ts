import { readFile } from "node:fs/promises";
import path from "node:path";

export type LegacyComment = {
  id: number;
  parentId: number | null;
  author: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  content: string;
};

export type LegacyCommentNode = LegacyComment & {
  replies: LegacyCommentNode[];
};

export async function getCommentsForSlug(
  slug: string,
): Promise<LegacyComment[]> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "comments",
    `${slug}.json`,
  );

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as LegacyComment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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
