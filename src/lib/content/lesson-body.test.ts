import { describe, expect, it } from "vitest";
import {
  extractYoutubeId,
  getLessonBody,
  splitAtHeadingId,
  splitLessonBody,
} from "@/lib/content/lesson-body";

describe("extractYoutubeId", () => {
  it("reads watch, embed, and short URLs", () => {
    expect(
      extractYoutubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
    ).toBe("dQw4w9WgXcQ");
    expect(extractYoutubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(extractYoutubeId("https://youtube.com/embed/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
    expect(
      extractYoutubeId("https://m.youtube.com/watch?v=dQw4w9WgXcQ"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("accepts URLs without a scheme and escaped underscores", () => {
    expect(extractYoutubeId("youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(extractYoutubeId("https://youtu.be/ab\\_cd")).toBe("ab_cd");
  });

  it("returns null for non-YouTube hosts", () => {
    expect(extractYoutubeId("https://example.com/watch?v=abc")).toBeNull();
  });
});

describe("splitLessonBody", () => {
  it("strips nothing itself and splits gist / youtube markers", () => {
    const segments = splitLessonBody(
      [
        "Intro paragraph.",
        "",
        "<!-- gist:octocat/abc123def456 -->",
        "",
        "Middle.",
        "",
        "<!-- youtube:dQw4w9WgXcQ -->",
        "",
        "Outro.",
      ].join("\n"),
    );

    expect(segments).toEqual([
      { type: "markdown", value: "Intro paragraph." },
      { type: "gist", user: "octocat", id: "abc123def456" },
      { type: "markdown", value: "Middle." },
      { type: "youtube", id: "dQw4w9WgXcQ" },
      { type: "markdown", value: "Outro." },
    ]);
  });

  it("turns a bare YouTube URL line into a youtube segment", () => {
    const segments = splitLessonBody(
      "Before.\n\nhttps://youtu.be/dQw4w9WgXcQ\n\nAfter.",
    );
    expect(segments).toEqual([
      { type: "markdown", value: "Before." },
      { type: "youtube", id: "dQw4w9WgXcQ" },
      { type: "markdown", value: "After." },
    ]);
  });
});

describe("splitAtHeadingId", () => {
  it("splits markdown so the matching heading starts the after group", () => {
    const { before, after } = splitAtHeadingId(
      [
        {
          type: "markdown",
          value: "Intro.\n\n## Why this matters\n\nBody.",
        },
      ],
      "why-this-matters",
    );

    expect(before).toEqual([{ type: "markdown", value: "Intro." }]);
    expect(after).toEqual([
      { type: "markdown", value: "## Why this matters\n\nBody." },
    ]);
  });

  it("puts everything in after when the heading is missing", () => {
    const segments = [{ type: "markdown" as const, value: "Just copy." }];
    expect(splitAtHeadingId(segments, "missing")).toEqual({
      before: [],
      after: segments,
    });
  });
});

describe("getLessonBody", () => {
  it("loads a published lesson without frontmatter", async () => {
    const segments = await getLessonBody("hello-world");
    expect(segments.length).toBeGreaterThan(0);
    expect(segments[0]?.type).toBe("markdown");
    if (segments[0]?.type === "markdown") {
      expect(segments[0].value.startsWith("---")).toBe(false);
      expect(segments[0].value.toLowerCase()).toMatch(/hello/);
    }
  });
});
