import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
 
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
      {
        hostname: "via.placeholder.com", 
      },
    ],
  },
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || "",
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN || "",
    TMDB_IMAGE_URL: process.env.TMDB_IMAGE_URL || "",
  },
};

export default nextConfig;
