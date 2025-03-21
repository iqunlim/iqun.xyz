/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Trying out "use cache" directive"
  experimental: {
    dynamicIO: true,
  },
};

export default nextConfig;
