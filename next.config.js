/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api-ninjas.com', 'images.pexels.com', 'images.unsplash.com', 'cdn.pixabay.com', 'https://joaocupido.github.io/sgm_project'],
    unoptimized: true
  }
}

module.exports = nextConfig
