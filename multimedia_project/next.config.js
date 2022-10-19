/** @type {import('next').NextConfig} */
const nextConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api-ninjas.com'],
  },
}

module.exports = nextConfig
