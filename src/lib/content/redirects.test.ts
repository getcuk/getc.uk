import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";
import { COMMENT_FILE_ALIASES } from "@/lib/content/comments";
import { getLessonBySlug } from "@/lib/content/lessons";

describe("lesson slug redirects", () => {
  it("permanently maps old WordPress paths onto current slugs", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const lessonRedirects = redirects.filter((redirect) =>
      redirect.source.startsWith("/lessons/"),
    );
    expect(lessonRedirects.length).toBeGreaterThan(0);

    for (const redirect of lessonRedirects) {
      expect(redirect.permanent).toBe(true);
      expect(redirect.destination.startsWith("/lessons/")).toBe(true);

      const oldSlug = redirect.source.slice("/lessons/".length);
      const newSlug = redirect.destination.slice("/lessons/".length);
      expect(getLessonBySlug(newSlug)).toBeDefined();
      expect(COMMENT_FILE_ALIASES[newSlug] ?? []).toContain(oldSlug);
    }
  });

  it("sends /challenge and /challenges to the first challenge", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual({
      source: "/challenge",
      destination: "/challenge/1",
      permanent: true,
    });
    expect(redirects).toContainEqual({
      source: "/challenges",
      destination: "/challenge/1",
      permanent: true,
    });
  });
});
