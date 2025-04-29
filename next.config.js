/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // No basePath or assetPrefix needed for custom domain on GitHub Pages
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;

