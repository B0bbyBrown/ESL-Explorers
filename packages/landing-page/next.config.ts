import type { NextConfig } from "next";

const config: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Add other configuration options here
};

export default config;

module.exports = {
  async headers() {
    return [
      {
        source: "/admin(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};
