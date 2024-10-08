/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // missingSuspenseWithCSRBailout: false,
  },
  env: {
    DB_URL: '211.233...',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
