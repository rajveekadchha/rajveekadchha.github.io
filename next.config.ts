import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export, so it can live on GitHub Pages.
  output: "export",
  // Pages are written as work.html, about.html, … GitHub Pages serves them at
  // /work, /about, … (the same URLs as the old site), with no trailing slash.
  trailingSlash: false,
  images: { unoptimized: true },
  // If this is served from a sub-path (e.g. rajveekadchha.github.io/work),
  // uncomment and match it. Links and router.push pick it up automatically.
  // basePath: "/work",
};

export default nextConfig;
