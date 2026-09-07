import { describe, expect, it } from "vitest";
import {
  PASSED_CHALLENGES_STORAGE_KEY,
  hasPassedChallenge,
  markChallengePassed,
  readPassedChallengeIds,
  type ProgressStorage,
} from "@/lib/challenges/progress";

function memoryStorage(initial: Record<string, string> = {}): ProgressStorage {
  const data = { ...initial };
  return {
    getItem(key: string) {
      return data[key] ?? null;
    },
    setItem(key: string, value: string) {
      data[key] = value;
    },
  };
}

describe("challenge progress", () => {
  it("starts empty when storage is missing or invalid", () => {
    expect(readPassedChallengeIds(null)).toEqual([]);
    expect(
      readPassedChallengeIds(memoryStorage({ [PASSED_CHALLENGES_STORAGE_KEY]: "{" })),
    ).toEqual([]);
  });

  it("records a passed challenge and keeps later marks", () => {
    const storage = memoryStorage();
    expect(markChallengePassed("1", storage)).toEqual(["1"]);
    expect(markChallengePassed("2", storage)).toEqual(["1", "2"]);
    expect(readPassedChallengeIds(storage)).toEqual(["1", "2"]);
    expect(hasPassedChallenge("1", ["1", "2"])).toBe(true);
    expect(hasPassedChallenge("3", ["1", "2"])).toBe(false);
  });
});
