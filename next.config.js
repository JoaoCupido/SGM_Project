/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api-ninjas.com', 'images.pexels.com', 'images.unsplash.com', 'https://joaocupido.github.io/sgm_project'],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/animals/rabbit',
        destination: '/animals/bunny'
      },
      {
        source: '/animals/ladybeetle',
        destination: '/animals/ladybug'
      },
      {
        source: '/animals/lady-beetle',
        destination: '/animals/ladybug'
      }
    ];
  }
}

module.exports = nextConfig
