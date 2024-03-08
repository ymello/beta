/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tailwindui.com", "cdn.dummyjson.com", "w3.org"],
    unoptimized: true,
  },
};

export default nextConfig;
