import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export configuration for GitHub Pages
  output: 'export',
  trailingSlash: true,

  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/gradienter' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gradienter/' : '',

  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },

  // Performance optimizations (swcMinify is enabled by default in Next.js 15+)

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // PoweredByHeader disabled for security
  poweredByHeader: false,

  // Disable server-side features for static export
  experimental: {
    // Clean experimental config
  },

  // TypeScript configuration
  typescript: {
    // Type checking is handled by separate script
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Linting is handled by separate script
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
