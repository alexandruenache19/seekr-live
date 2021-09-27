module.exports = {
  images: {
    domains: [
      'images.unsplash.com'
    ]
  },
  distDir: 'nextjs',
  env: {
    FIREBASE_PROJECT_ID: 'seekr-live'
  },
  experimental: {
    sprFlushToDisk: false
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web'
    }
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions
    ]
    return config
  }
}
