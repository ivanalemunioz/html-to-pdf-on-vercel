import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // The `serverExternalPackages` option allows you to opt-out of bundling dependencies in your Server Components.
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
};

export default nextConfig;
