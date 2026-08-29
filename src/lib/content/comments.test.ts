import { describe, expect, it } from "vitest";
import {
  buildCommentTree,
  COMMENT_FILE_ALIASES,
  getCommentsForSlug,
  type LegacyComment,
} from "@/lib/content/comments";
import { getLessonBySlug } from "@/lib/content/lessons";

describe("buildCommentTree", () => {
  const comments: LegacyComment[] = [
    {
      id: 1,
      parentId: null,
      author: "Ada",
      date: "2019-01-01",
      content: "root",
    },
    {
      id: 2,
      parentId: 1,
      author: "Grace",
      date: "2019-01-02",
      content: "reply",
    },
    {
      id: 3,
      parentId: 99,
      author: "Lin",
      date: "2019-01-03",
      content: "orphan",
    },
  ];

  it("nests replies under their parent and treats missing parents as roots", () => {
    const tree = buildCommentTree(comments);
    expect(tree).toHaveLength(2);
    expect(tree[0]?.author).toBe("Ada");
    expect(tree[0]?.replies).toHaveLength(1);
    expect(tree[0]?.replies[0]?.author).toBe("Grace");
    expect(tree[1]?.author).toBe("Lin");
    expect(tree[1]?.replies).toHaveLength(0);
  });
});

describe("comment file aliases", () => {
  it("only aliases slugs that exist in the lesson catalogue", () => {
    for (const slug of Object.keys(COMMENT_FILE_ALIASES)) {
      expect(getLessonBySlug(slug)).toBeDefined();
    }
  });

  it("loads stored comments for a current lesson slug", async () => {
    const comments = await getCommentsForSlug("command-line");
    expect(comments.length).toBeGreaterThan(0);
    expect(comments[0]?.author).toBeTruthy();
    expect(comments[0]?.content).toBeTruthy();
  });

  it("returns an empty list when the comment file exists but has no comments", async () => {
    await expect(getCommentsForSlug("hello-world")).resolves.toEqual([]);
  });
});
