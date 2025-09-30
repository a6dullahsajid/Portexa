/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure hot reload works properly
  reactStrictMode: true,
  // Enable fast refresh
  experimental: {
    // This helps with hot reload on Windows
    esmExternals: true,
  },
  // Ensure proper file watching
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
};


export default nextConfig;
