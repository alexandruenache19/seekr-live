module.exports = {
  distDir: 'nextjs',
  env: {
    FIREBASE_PROJECT_ID: 'seekr-live'
  },
  experimental: {
    sprFlushToDisk: false
  }
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //   }

  //   return config
  // }
}
