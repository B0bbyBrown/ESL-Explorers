/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["./src/styles"],
    prependData: `@import "variables.scss"; @import "mixins.scss";`,
  },
  images: {
    domains: [], // Add any external domains you'll load images from
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: process.env.NODE_ENV === "development",
  },
  transpilePackages: ["global-comps"],
  webpack: (config, { isServer }) => {
    // Add any custom webpack configuration here
    return config;
  },
};

module.exports = nextConfig;
