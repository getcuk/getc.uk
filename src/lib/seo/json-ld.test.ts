import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/lib/constants";
import type { Lesson } from "@/lib/types/lesson";
import {
  absoluteUrl,
  lessonCoverAlt,
  lessonCoverOgUrl,
  lessonCoverUrl,
  lessonJsonLd,
} from "@/lib/seo/json-ld";

const lesson: Lesson = {
  slug: "why-learn-basics",
  title: "Why learn the basics of coding?",
  summary: "Fundamentals.",
  difficulty: "beginner",
  publishedAt: "2019-02-12",
  updatedAt: "2026-08-23",
  coverImage: "why-learn-basics-camel-rider.webp",
  coverImageOg: "why-learn-basics-camel-rider-og.jpg",
  coverImageAlt: "Sepia camel rider on getc.uk",
};

describe("url helpers", () => {
  it("builds absolute site URLs", () => {
    expect(absoluteUrl("/lessons/hello-world")).toBe(
      `${SITE_URL}/lessons/hello-world`,
    );
    expect(absoluteUrl("lessons/hello-world")).toBe(
      `${SITE_URL}/lessons/hello-world`,
    );
    expect(absoluteUrl("https://example.com/x")).toBe("https://example.com/x");
  });

  it("prefers the solid OG cover for social cards", () => {
    expect(lessonCoverUrl(lesson)).toBe(
      `${SITE_URL}/lessons/why-learn-basics/images/why-learn-basics-camel-rider.webp`,
    );
    expect(lessonCoverOgUrl(lesson)).toBe(
      `${SITE_URL}/lessons/why-learn-basics/images/why-learn-basics-camel-rider-og.jpg`,
    );
    expect(lessonCoverAlt(lesson)).toBe("Sepia camel rider on getc.uk");
  });

  it("falls back to the title when cover alt is missing", () => {
    expect(lessonCoverAlt({ ...lesson, coverImageAlt: undefined })).toBe(
      lesson.title,
    );
  });
});

describe("lessonJsonLd", () => {
  it("describes a free learning resource", () => {
    const data = lessonJsonLd(lesson);
    expect(data["@type"]).toBe("LearningResource");
    expect(data.isAccessibleForFree).toBe(true);
    expect(data.learningResourceType).toBe("Tutorial");
    expect(data.datePublished).toBe("2019-02-12");
    expect(data.dateModified).toBe("2026-08-23");
  });
});
