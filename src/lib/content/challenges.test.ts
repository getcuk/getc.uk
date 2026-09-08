import { describe, expect, it } from "vitest";
import {
  challengePath,
  formatChallengeNumber,
  getAllChallenges,
  getChallengeById,
  getChallengeForLessonSlug,
  getChallengeNeighbors,
  getChallengeParamIds,
  getFirstChallenge,
  getFirstChallengePath,
  getFirstIncompleteChallenge,
  isChallengeUnlocked,
} from "@/lib/content/challenges";

describe("challenges", () => {
  it("resolves the hello-world challenge by numeric and slug ids", () => {
    const byNumber = getChallengeById("1");
    const bySlug = getChallengeById("hello-world");
    expect(byNumber?.title).toBe("Hello, world");
    expect(bySlug).toBe(byNumber);
    expect(byNumber?.expectedStdout).toBe("hello, world\n");
    expect(byNumber?.starterCode).toContain("#include <stdio.h>");
  });

  it("resolves the fahrenheit-celsius challenge by numeric and slug ids", () => {
    const byNumber = getChallengeById("2");
    const bySlug = getChallengeById("fahrenheit-celsius");
    expect(byNumber?.title).toBe("Fahrenheit to Celsius");
    expect(bySlug).toBe(byNumber);
    expect(byNumber?.expectedStdout).toBe("0 -17\n20 -6\n40 4\n");
  });

  it("lists unique challenges in series order", () => {
    const titles = getAllChallenges().map((challenge) => challenge.title);
    expect(titles).toEqual(["Hello, world", "Fahrenheit to Celsius"]);
  });

  it("exposes numeric and slug ids for static params", () => {
    expect(getChallengeParamIds()).toEqual([
      "1",
      "hello-world",
      "2",
      "fahrenheit-celsius",
    ]);
  });

  it("returns undefined for unknown ids", () => {
    expect(getChallengeById("missing")).toBeUndefined();
  });

  it("builds numbered paths from the first challenge", () => {
    const first = getFirstChallenge();
    expect(first.id).toBe("1");
    expect(challengePath(first)).toBe("/challenge/1");
    expect(getFirstChallengePath()).toBe("/challenge/1");
    expect(formatChallengeNumber(first)).toBe("01");
  });

  it("walks to adjacent challenges in series order", () => {
    expect(getChallengeNeighbors("1")).toEqual({
      previous: undefined,
      next: getChallengeById("2"),
    });
    expect(getChallengeNeighbors("2")).toEqual({
      previous: getChallengeById("1"),
      next: undefined,
    });
    expect(getChallengeNeighbors("missing")).toEqual({});
  });

  it("maps lessons onto their related challenge", () => {
    expect(getChallengeForLessonSlug("hello-world")?.id).toBe("1");
    expect(getChallengeForLessonSlug("fahrenheit-to-celsius")?.id).toBe(
      "2",
    );
    expect(getChallengeForLessonSlug("command-line")).toBeUndefined();
  });

  it("unlocks later challenges only after earlier ones are passed", () => {
    expect(isChallengeUnlocked("1", [])).toBe(true);
    expect(isChallengeUnlocked("2", [])).toBe(false);
    expect(isChallengeUnlocked("2", ["1"])).toBe(true);
    expect(isChallengeUnlocked("missing", ["1"])).toBe(false);
    expect(getFirstIncompleteChallenge([])).toBe(getFirstChallenge());
    expect(getFirstIncompleteChallenge(["1"])).toBe(getChallengeById("2"));
    expect(getFirstIncompleteChallenge(["1", "2"]).id).toBe(
      getAllChallenges()[0]?.id,
    );
  });
});
