/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "zodsj17c",
    NEXT_PUBLIC_SANITY_DATASET: "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
