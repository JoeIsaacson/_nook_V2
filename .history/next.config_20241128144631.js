/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle source map files
    config.module.rules.push({
      test: /\.js\.map$/,
      use: ['source-map-loader'],
      enforce: 'pre'
    });

    // Disable MetaMask SDK
    config.resolve.alias = {
      ...config.resolve.alias,
      '@metamask/sdk': false,
    };

    // Add punycode fallback
    config.resolve.fallback = {
      ...config.resolve.fallback,
      punycode: false,
    };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/welcome',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
