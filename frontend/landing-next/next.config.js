const UnoCSS = require('@unocss/webpack').default;

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // config.cache = false;
    config.plugins.push(
      UnoCSS(),
    );
    return config;
  },
  i18n,
};

module.exports = nextConfig;
