/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ['ipfs-2.thirdwebcdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs-2.thirdwebcdn.com',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
};

module.exports = nextConfig;
