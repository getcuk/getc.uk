export const PASSED_CHALLENGES_STORAGE_KEY = "getc.challenges.passed";

export type ProgressStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

function defaultStorage(): ProgressStorage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function parsePassedIds(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export function readPassedChallengeIds(
  storage: ProgressStorage | null = defaultStorage(),
): string[] {
  if (!storage) return [];
  try {
    return parsePassedIds(storage.getItem(PASSED_CHALLENGES_STORAGE_KEY));
  } catch {
    return [];
  }
}

export function markChallengePassed(
  id: string,
  storage: ProgressStorage | null = defaultStorage(),
): string[] {
  const ids = new Set(readPassedChallengeIds(storage));
  ids.add(id);
  const next = [...ids];
  if (storage) {
    try {
      storage.setItem(PASSED_CHALLENGES_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private mode or quota — keep the in-memory list for this session.
    }
  }
  return next;
}

export function hasPassedChallenge(
  id: string,
  passedIds: Iterable<string>,
): boolean {
  return new Set(passedIds).has(id);
}
