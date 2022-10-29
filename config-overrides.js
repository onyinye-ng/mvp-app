// const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    querystring: require.resolve("querystring-es3"),
  }

  // config.plugins.push(
  //   new webpack.ProvidePlugin({
  //     process: 'process/browser',
  //     Buffer: ['buffer', 'Buffer'],
  //   }),
  // );

  return config
}
