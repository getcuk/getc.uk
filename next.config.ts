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
    ];
  },
};

export default nextConfig;
