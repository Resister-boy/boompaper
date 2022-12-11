/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { 
    externalDir: true,
  },
  images: {
    domains: [
      "ipfs.io"
    ]
  },
  env: {
    NFTStorageAPIKey: process.env.STORAGE_API_KEY,
    ALCHEMY_ID: process.env.ALCHEMY_ID
  }
}

module.exports = nextConfig
