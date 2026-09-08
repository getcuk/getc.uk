import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/challenge",
        destination: "/challenge/1",
        permanent: true,
      },
      {
        source: "/challenges",
        destination: "/challenge/1",
        permanent: true,
      },
      {
        source: "/lessons/why-learn-basics-of-coding",
        destination: "/lessons/why-learn-basics",
        permanent: true,
      },
      {
        source: "/lessons/learn-your-tools-solid-foundation-in-command-line",
        destination: "/lessons/command-line",
        permanent: true,
      },
      {
        source: "/lessons/getting-your-macos-ready-for-c",
        destination: "/lessons/macos-ready-for-c",
        permanent: true,
      },
      {
        source: "/lessons/installing-cs50-library-locally-on-macos",
        destination: "/lessons/cs50-library",
        permanent: true,
      },
      {
        source: "/lessons/how-to-compile-hello-world-program-in-c",
        destination: "/lessons/hello-world",
        permanent: true,
      },
      {
        source: "/lessons/unknown-escape-sequence-in-c",
        destination: "/lessons/unknown-escape-sequences",
        permanent: true,
      },
      {
        source: "/lessons/fahrenheit-to-celsius-in-c",
        destination: "/lessons/fahrenheit-to-celsius",
        permanent: true,
      },
      {
        source: "/lessons/fahrenheit-to-celsius-using-for-loop-in-c",
        destination: "/lessons/reverse-temperature-table",
        permanent: true,
      },
      {
        source: "/lessons/celsius-to-fahrenheit-in-c",
        destination: "/lessons/celsius-to-fahrenheit",
        permanent: true,
      },
      {
        source: "/lessons/getchar-and-eof-in-c",
        destination: "/lessons/getchar-and-eof",
        permanent: true,
      },
      {
        source: "/lessons/how-to-count-blanks-tabs-and-newlines-in-c",
        destination: "/lessons/count-blanks",
        permanent: true,
      },
      {
        source: "/lessons/value-of-eof-in-c",
        destination: "/lessons/value-of-eof",
        permanent: true,
      },
      {
        source:
          "/lessons/how-would-you-test-the-word-count-program-what-kinds-of-input-are-most-likely-to-uncover-the-bugs-if-there-are-any",
        destination: "/lessons/test-word-count",
        permanent: true,
      },
      {
        source:
          "/lessons/replace-string-of-one-or-more-blanks-by-one-blank-while-copying-input-to-output",
        destination: "/lessons/collapse-blanks",
        permanent: true,
      },
      {
        source: "/lessons/c-program-that-replaces-escape-sequence-in-input",
        destination: "/lessons/make-escapes-visible",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
