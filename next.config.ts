import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
