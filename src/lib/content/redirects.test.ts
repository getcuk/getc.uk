import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";
import { COMMENT_FILE_ALIASES } from "@/lib/content/comments";
import { getLessonBySlug } from "@/lib/content/lessons";

describe("lesson slug redirects", () => {
  it("permanently maps old WordPress paths onto current slugs", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects.length).toBeGreaterThan(0);

    for (const redirect of redirects) {
      expect(redirect.permanent).toBe(true);
      expect(redirect.source.startsWith("/lessons/")).toBe(true);
      expect(redirect.destination.startsWith("/lessons/")).toBe(true);

      const oldSlug = redirect.source.slice("/lessons/".length);
      const newSlug = redirect.destination.slice("/lessons/".length);
      expect(getLessonBySlug(newSlug)).toBeDefined();
      expect(COMMENT_FILE_ALIASES[newSlug] ?? []).toContain(oldSlug);
    }
  });
});
