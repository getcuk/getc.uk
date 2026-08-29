import { describe, expect, it } from "vitest";
import { gradeStdout } from "@/lib/challenges/grade";

const expected = "hello, world\n";

describe("gradeStdout", () => {
  it("passes when stdout matches including trailing newline", () => {
    const result = gradeStdout("hello, world\n", expected);
    expect(result).toEqual({
      passed: true,
      label: "PASSED",
      reasons: ["stdout matches the expected output (including \\n)."],
    });
  });

  it("passes when the runner strips the trailing newline but source has \\n", () => {
    const source = 'printf("hello, world\\n");';
    const result = gradeStdout("hello, world", expected, source);
    expect(result.passed).toBe(true);
    expect(result.label).toBe("PASSED");
    expect(result.reasons[0]).toMatch(/verified in your code/);
  });

  it("fails when text matches but printf is missing \\n", () => {
    const source = 'printf("hello, world");';
    const result = gradeStdout("hello, world", expected, source);
    expect(result).toEqual({
      passed: false,
      label: "FAILED",
      reasons: ["Missing required trailing newline (\\n) in your printf string."],
    });
  });

  it("does not false-fail when source is unavailable and the runner omitted \\n", () => {
    const result = gradeStdout("hello, world", expected);
    expect(result.passed).toBe(true);
    expect(result.label).toBe("PASSED");
  });

  it("fails when stdout text does not match", () => {
    const result = gradeStdout("hello world\n", expected);
    expect(result.passed).toBe(false);
    expect(result.label).toBe("FAILED");
    expect(result.reasons[0]).toBe("stdout does not match the expected output.");
  });

  it("notes whitespace-only differences", () => {
    const result = gradeStdout(" hello, world \n", expected);
    expect(result.passed).toBe(false);
    expect(result.reasons).toContain("Only leading/trailing whitespace differs.");
  });

  it("passes without a newline requirement when expected has none", () => {
    const result = gradeStdout("ok", "ok");
    expect(result).toEqual({
      passed: true,
      label: "PASSED",
      reasons: ["stdout matches the expected output."],
    });
  });
});
