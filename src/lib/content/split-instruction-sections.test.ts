import { describe, expect, it } from "vitest";
import { splitInstructionSections } from "@/lib/content/split-instruction-sections";

const sample = `# Challenge 01 — Hello, world

Welcome to the terminal.

## Objective

Write a C program.

## Spec

1. Include \`stdio.h\`.

## Hint

Use printf.
`;

describe("splitInstructionSections", () => {
  it("keeps the opening copy as intro and cards later headings", () => {
    const sections = splitInstructionSections(sample);
    expect(sections.map((section) => section.variant)).toEqual([
      "intro",
      "section",
      "spec",
      "hint",
    ]);
    expect(sections[0]?.markdown).toContain("Welcome to the terminal.");
    expect(sections[2]?.markdown).toMatch(/^## Spec/m);
    expect(sections[3]?.markdown).toMatch(/^## Hint/m);
  });

  it("treats a document that starts at a heading as that section", () => {
    const sections = splitInstructionSections("## Spec\n\nBe exact.\n");
    expect(sections).toEqual([
      { markdown: "## Spec\n\nBe exact.", variant: "spec" },
    ]);
  });
});
