import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tdmb.org",
      },
    ],
  },
  env: {
    TDMB_BASE_URL: process.env.TDMB_BASE_URL || "",
    TDMB_API_TOKEN: process.env.TDMB_API_TOKEN || "",
    TDMB_IMAGE_SERVICE_URL: process.env.TDMB_IMAGE_SERVICE_URL || "",
  },
};

export default nextConfig;

