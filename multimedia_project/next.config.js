/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api-ninjas.com', 'images.pexels.com'],
  },
}

module.exports = nextConfig
