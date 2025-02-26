/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/login/student",
        destination: "/login/student/",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/login/",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/register/",
        permanent: true,
      },
    ];
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  webpack: (config) => config,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
