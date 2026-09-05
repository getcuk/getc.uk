export type InstructionSectionVariant = "intro" | "spec" | "hint" | "section";

export type InstructionSection = {
  markdown: string;
  variant: InstructionSectionVariant;
};

export function splitInstructionSections(
  markdown: string,
): InstructionSection[] {
  return markdown
    .split(/(?=^## )/m)
    .filter((chunk) => chunk.trim().length > 0)
    .map((chunk) => {
      const text = chunk.trim();
      const match = text.match(/^##\s+(.+?)\s*$/m);
      if (!match) {
        return { markdown: text, variant: "intro" as const };
      }

      const heading = match[1].trim().toLowerCase();
      if (heading === "spec") {
        return { markdown: text, variant: "spec" as const };
      }
      if (heading === "hint") {
        return { markdown: text, variant: "hint" as const };
      }
      return { markdown: text, variant: "section" as const };
    });
}
