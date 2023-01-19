/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "default",
    domains: ["res.cloudinary.com", "avataaars.io"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,      
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  }
}

module.exports = nextConfig
