const webpack = require('webpack');
const path = require('path');
const validate = require('webpack-validator');
const staticConfig = require('./static.config.js');
const entry = staticConfig.getServerRenderingEntry();
const jsRoot = path.resolve(staticConfig.jsRoot);
const DEBUG = !process.argv.includes('--release');
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
};

module.exports = validate({
  entry,
  resolve: {
    root: [ jsRoot ],
    alias: staticConfig.alias,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: jsRoot,
    filename: '[name].server.js',
  },
  // externals: staticConfig.externals,
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        plugins: ['add-module-exports'],
      },
    }],
  },
});
