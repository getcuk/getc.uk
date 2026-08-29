import { describe, expect, it } from "vitest";
import { lessonHighlightOptions } from "@/lib/content/lesson-highlight";

describe("lessonHighlightOptions", () => {
  it("registers only the fence languages used in lessons", () => {
    expect(Object.keys(lessonHighlightOptions.languages ?? {}).sort()).toEqual([
      "bash",
      "c",
      "plaintext",
    ]);
    expect(lessonHighlightOptions.aliases).toEqual({
      text: "plaintext",
      sh: "bash",
    });
  });
});
