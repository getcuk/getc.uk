export type Challenge = {
  id: string;
  title: string;
  summary: string;
  instructionsMarkdown: string;
  starterCode: string;
  /** Exact stdout required to pass (include trailing \\n when required). */
  expectedStdout: string;
};

const helloWorldInstructions = `# Challenge 01 — Hello, world

Welcome to the terminal. Your job is to make this program speak.

## Objective

Write a C program that prints **exactly**:

\`\`\`
hello, world
\`\`\`

(with a trailing newline — use \`\\n\` inside \`printf\`)

## Spec

1. Include \`stdio.h\`.
2. Use \`printf\` (not \`puts\`) for this exercise.
3. End the line with a newline (\`\\n\`).
4. No extra characters (no \`!\`, no spaces before/after).

## Hint

\`\`\`c
printf("hello, world\\n");
\`\`\`

When you are ready, hit **Run Code**. The terminal will tell you clearly whether you **PASSED** or **FAILED**.
`;

const helloWorldStarter = `#include <stdio.h>

int main(void)
{
    /* print hello, world here */
    return 0;
}
`;

const challenges: Record<string, Challenge> = {
  "1": {
    id: "1",
    title: "Hello, world",
    summary: "Print a greeting with printf.",
    instructionsMarkdown: helloWorldInstructions,
    starterCode: helloWorldStarter,
    expectedStdout: "hello, world\n",
  },
  "hello-world": {
    id: "hello-world",
    title: "Hello, world",
    summary: "Print a greeting with printf.",
    instructionsMarkdown: helloWorldInstructions.replace(
      "Challenge 01 — Hello, world",
      "Challenge — Hello, world",
    ),
    starterCode: helloWorldStarter,
    expectedStdout: "hello, world\n",
  },
};

export function getChallengeById(id: string): Challenge | undefined {
  return challenges[id];
}

export function getAllChallenges(): Challenge[] {
  return Object.values(challenges).filter(
    (challenge, index, list) =>
      list.findIndex((item) => item.title === challenge.title) === index,
  );
}
