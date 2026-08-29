import { describe, expect, it } from "vitest";
import { formatLessonDate } from "@/lib/format-lesson-date";

describe("formatLessonDate", () => {
  it("uses English ordinals and month names", () => {
    expect(formatLessonDate("2019-07-16")).toBe("16th July 2019");
    expect(formatLessonDate("2019-02-01")).toBe("1st February 2019");
    expect(formatLessonDate("2019-02-02")).toBe("2nd February 2019");
    expect(formatLessonDate("2019-02-03")).toBe("3rd February 2019");
    expect(formatLessonDate("2019-02-21")).toBe("21st February 2019");
    expect(formatLessonDate("2019-02-22")).toBe("22nd February 2019");
    expect(formatLessonDate("2019-02-23")).toBe("23rd February 2019");
  });

  it("uses th for 11–13", () => {
    expect(formatLessonDate("2019-11-11")).toBe("11th November 2019");
    expect(formatLessonDate("2019-11-12")).toBe("12th November 2019");
    expect(formatLessonDate("2019-11-13")).toBe("13th November 2019");
  });

  it("returns the original string when the date is incomplete", () => {
    expect(formatLessonDate("2019-07")).toBe("2019-07");
    expect(formatLessonDate("not-a-date")).toBe("not-a-date");
  });
});
