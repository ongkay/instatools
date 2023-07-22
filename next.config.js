const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '8mb', // Set desired value here
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})
