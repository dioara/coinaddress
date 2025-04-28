/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export", // Enables static export
  // Optional: Add basePath if deploying to a subdirectory like username.github.io/repo-name
  // basePath: "/coinaddress-app", 
  // Optional: Add assetPrefix if using a custom domain with GitHub Pages
  // assetPrefix: "https://coinaddress.io",
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;

