/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nimble/core', '@nimble/utils'],
  images: {
    domains: ['localhost', process.env.AWS_S3_BUCKET || 'nimble-uploads'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
