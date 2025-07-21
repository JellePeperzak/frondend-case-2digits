/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '2digits.stream.prepr.io',
      },
    ],
  },
  reactStrictMode: true,
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;
