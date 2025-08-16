import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination:
          'https://api.farcaster.xyz/miniapps/hosted-manifest/0198b22d-626d-b7dc-21d1-05b875a58dce',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
