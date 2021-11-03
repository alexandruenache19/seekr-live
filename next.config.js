module.exports = {
  images: {
    domains: ["images.unsplash.com"]
  },
  distDir: "nextjs",
  env: {
    FIREBASE_PROJECT_ID: "seekr-live",
    STRIPE_PUBLISHABLE_KEY:
      "pk_live_51JqH7mJS5YvXoP5fXZxVMzl7NZJBEf5y439bUpgYhYf7MDIy5hcusqMs8CwexRjGZPD9vBP53Fu8SkzkdBucDVbL00RjfEQC7C"
  },
  experimental: {
    sprFlushToDisk: false
  },
  webpack5: true,
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web"
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions
    ];
    config.module.rules.push({
      /**
       * Developers packaging the IVS player into an app are required to resolve and import the following assets via URL:
       *
       * 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm'
       * 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';
       * 'amazon-ivs-player/dist/assets/amazon-ivs-worker.min.js';
       *
       * These assets must not be re-compiled during packaging.
       * The webpack file-loader (https://webpack.js.org/loaders/file-loader/) accomplishes this.
       * Rollup's plugin-url (https://github.com/rollup/plugins/tree/master/packages/url) also seems to do this, but has not been tested.
       */
      test: /[\/\\]amazon-ivs-player[\/\\].*dist[\/\\]assets[\/\\]/,
      loader: "file-loader",
      type: "javascript/auto",
      options: {
        name: "[name].[ext]",
        outputPath: "static/ivs-player",
        publicPath: "/_next/static/ivs-player"
      }
    });
    return config;
  }
};
