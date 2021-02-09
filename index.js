'use strict';

const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

function modifyWebpackConfig({ env: { target, dev }, webpackConfig: config, options: { pluginOptions: options } }) {
  if (!dev && target === 'web') {
    const pkg = require(path.resolve('package.json'));

    config.plugins.push(
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        navigateFallback: '/',
        navigateFallbackDenylist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp('/[^/?]+\\.[^/]+$'),
        ],
        additionalManifestEntries: [
          { url: '/', revision: `${pkg.name}-${pkg.version}` },
        ],
        ...options,
      }),
    );
  }

  return config;
}

module.exports = { modifyWebpackConfig };
