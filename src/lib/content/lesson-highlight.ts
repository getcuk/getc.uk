import { common } from "lowlight";
import type { Options } from "rehype-highlight";

function language(name: keyof typeof common) {
  const fn = common[name];
  if (!fn) {
    throw new Error(`Missing highlight.js grammar: ${String(name)}`);
  }
  return fn;
}

/** Only the fence languages used in lesson markdown — keeps SSG highlighting lean. */
export const lessonHighlightOptions: Options = {
  languages: {
    c: language("c"),
    bash: language("bash"),
    plaintext: language("plaintext"),
  },
  aliases: { text: "plaintext", sh: "bash" },
};
