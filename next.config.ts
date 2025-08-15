import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination:
          'https://api.farcaster.xyz/miniapps/hosted-manifest/<app-id>',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
