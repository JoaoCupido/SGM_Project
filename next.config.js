/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api-ninjas.com', 'images.pexels.com', 'images.unsplash.com'],
    loader: 'akamai',
    path: ''
  }
}

module.exports = nextConfig
