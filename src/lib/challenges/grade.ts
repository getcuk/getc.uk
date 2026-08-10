export type GradeResult = {
  passed: boolean;
  label: "PASSED" | "FAILED";
  reasons: string[];
};

/**
 * True when source contains expected text followed by a \\n escape
 * inside a string (e.g. printf("hello, world\\n")).
 */
function sourceHasNewlineEscape(source: string, expectedCore: string): boolean {
  const escaped = expectedCore.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`${escaped}\\\\n`).test(source);
}

/**
 * Grade stdout against expected output.
 *
 * Online runners (including JDoodle) often strip a trailing newline from
 * reported stdout even when the program printed one. When expected output
 * ends with \\n, we also check the source for a \\n escape.
 */
export function gradeStdout(
  actual: string,
  expected: string,
  source?: string,
): GradeResult {
  const expectedNeedsNewline = expected.endsWith("\n");
  const actualCore = actual.replace(/\n$/, "");
  const expectedCore = expected.replace(/\n$/, "");

  if (actualCore !== expectedCore) {
    const reasons: string[] = ["stdout does not match the expected output."];
    if (actual.trim() === expected.trim() || actualCore.trim() === expectedCore.trim()) {
      reasons.push("Only leading/trailing whitespace differs.");
    }
    return {
      passed: false,
      label: "FAILED",
      reasons,
    };
  }

  // Text matches. Check newline requirement if needed.
  if (!expectedNeedsNewline) {
    return {
      passed: true,
      label: "PASSED",
      reasons: ["stdout matches the expected output."],
    };
  }

  if (actual.endsWith("\n")) {
    return {
      passed: true,
      label: "PASSED",
      reasons: ["stdout matches the expected output (including \\n)."],
    };
  }

  // Runner likely stripped trailing \\n — verify it exists in source.
  if (source && sourceHasNewlineEscape(source, expectedCore)) {
    return {
      passed: true,
      label: "PASSED",
      reasons: [
        "stdout matches. Trailing \\n was verified in your code (some runners omit it from displayed output).",
      ],
    };
  }

  if (source && !sourceHasNewlineEscape(source, expectedCore)) {
    return {
      passed: false,
      label: "FAILED",
      reasons: [
        "Missing required trailing newline (\\n) in your printf string.",
      ],
    };
  }

  // No source available and runner omitted newline — don't false-fail on text match alone.
  return {
    passed: true,
    label: "PASSED",
    reasons: ["stdout matches the expected output."],
  };
}
