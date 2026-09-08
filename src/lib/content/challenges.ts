export type Challenge = {
  /** Canonical URL id, e.g. "1". */
  id: string;
  slug: string;
  title: string;
  summary: string;
  instructionsMarkdown: string;
  starterCode: string;
  /** Exact stdout required to pass (include trailing \\n when required). */
  expectedStdout: string;
  relatedLessonSlug?: string;
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

const fahrenheitInstructions = `# Challenge 02 — Fahrenheit to Celsius

Hello, world was one line. Next: a tiny table, using integer arithmetic the way K&R introduce variables.

## Objective

Print a Fahrenheit–Celsius table for **0**, **20**, and **40** °F, using integer maths:

\`\`\`
celsius = 5 * (fahr - 32) / 9
\`\`\`

The program must print **exactly**:

\`\`\`
0 -17
20 -6
40 4
\`\`\`

(space between the two numbers; a newline after each row)

## Spec

1. Include \`stdio.h\`.
2. Use integer variables (not floating point) for this challenge.
3. Use the formula above — integer division is meant to truncate (so 0 °F becomes \`-17\`, not \`-17.777\`).
4. Print Fahrenheit, a single space, then Celsius. No heading, no tabs, no extra spaces.

## Hint

\`\`\`c
printf("%d %d\\n", fahr, celsius);
\`\`\`

When you are ready, hit **Run Code**.
`;

const fahrenheitStarter = `#include <stdio.h>

int main(void)
{
    int fahr, celsius;

    /* print 0, 20, and 40 °F with their Celsius values */
    return 0;
}
`;

const challengeList: Challenge[] = [
  {
    id: "1",
    slug: "hello-world",
    title: "Hello, world",
    summary: "Print a greeting with printf.",
    instructionsMarkdown: helloWorldInstructions,
    starterCode: helloWorldStarter,
    expectedStdout: "hello, world\n",
    relatedLessonSlug: "hello-world",
  },
  {
    id: "2",
    slug: "fahrenheit-celsius",
    title: "Fahrenheit to Celsius",
    summary: "Print a short integer temperature table.",
    instructionsMarkdown: fahrenheitInstructions,
    starterCode: fahrenheitStarter,
    expectedStdout: "0 -17\n20 -6\n40 4\n",
    relatedLessonSlug: "fahrenheit-to-celsius",
  },
];

const challengesById: Record<string, Challenge> = {};
for (const challenge of challengeList) {
  challengesById[challenge.id] = challenge;
  challengesById[challenge.slug] = challenge;
}

export function getChallengeById(id: string): Challenge | undefined {
  return challengesById[id];
}

export function getAllChallenges(): Challenge[] {
  return challengeList;
}

export function getChallengeParamIds(): string[] {
  return challengeList.flatMap((challenge) => [challenge.id, challenge.slug]);
}

export function challengePath(challenge: Pick<Challenge, "id">): string {
  return `/challenge/${challenge.id}`;
}

export function getFirstChallenge(): Challenge {
  const first = challengeList[0];
  if (!first) {
    throw new Error("No challenges are configured");
  }
  return first;
}

export function getFirstChallengePath(): string {
  return challengePath(getFirstChallenge());
}

export function formatChallengeNumber(
  challenge: Pick<Challenge, "id">,
): string {
  return challenge.id.padStart(2, "0");
}

export function getChallengeNeighbors(id: string): {
  previous?: Challenge;
  next?: Challenge;
} {
  const index = challengeList.findIndex((challenge) => challenge.id === id);
  if (index < 0) return {};
  return {
    previous: challengeList[index - 1],
    next: challengeList[index + 1],
  };
}

export function getChallengeForLessonSlug(
  slug: string,
): Challenge | undefined {
  return challengeList.find(
    (challenge) => challenge.relatedLessonSlug === slug,
  );
}

/** First challenge is always open; later ones need every earlier challenge passed. */
export function isChallengeUnlocked(
  id: string,
  passedIds: Iterable<string>,
): boolean {
  const index = challengeList.findIndex((challenge) => challenge.id === id);
  if (index < 0) return false;
  if (index === 0) return true;
  const passed = new Set(passedIds);
  return challengeList
    .slice(0, index)
    .every((challenge) => passed.has(challenge.id));
}

export function getFirstIncompleteChallenge(
  passedIds: Iterable<string>,
): Challenge {
  const passed = new Set(passedIds);
  return (
    challengeList.find((challenge) => !passed.has(challenge.id)) ??
    getFirstChallenge()
  );
}
