import { describe, expect, it } from "vitest";
import { getAllChallenges, getChallengeById } from "@/lib/content/challenges";

describe("challenges", () => {
  it("resolves the hello-world challenge by numeric and slug ids", () => {
    const byNumber = getChallengeById("1");
    const bySlug = getChallengeById("hello-world");
    expect(byNumber?.title).toBe("Hello, world");
    expect(bySlug?.title).toBe("Hello, world");
    expect(byNumber?.expectedStdout).toBe("hello, world\n");
    expect(bySlug?.starterCode).toContain("#include <stdio.h>");
  });

  it("dedupes aliased challenges in the public list", () => {
    const titles = getAllChallenges().map((challenge) => challenge.title);
    expect(titles).toEqual([...new Set(titles)]);
    expect(titles).toContain("Hello, world");
  });

  it("returns undefined for unknown ids", () => {
    expect(getChallengeById("missing")).toBeUndefined();
  });
});
