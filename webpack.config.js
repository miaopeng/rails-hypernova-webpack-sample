const webpack = require('webpack');
const path = require('path');
const staticConfig = require('./static.config.js');
const validate = require('webpack-validator');
const minimist = require('minimist');
const knownOptions = {
  string: 'app',
  boolean: 'release',
  default: { app: '', release: true },
};
const options = minimist(process.argv.slice(2), knownOptions);
const { app, release } = options;
const entry = staticConfig.getAppEntry(app);
const jsRoot = path.resolve(staticConfig.jsRoot);
const GLOBALS = {
  'process.env.NODE_ENV': release ? '"production"' : '"development"',
};

module.exports = validate({
  entry,
  resolve: {
    root: [ jsRoot ],
    alias: staticConfig.alias,
  },
  output: {
    library: 'App',
    path: `${jsRoot}/apps`,
    filename: '[name]/index.public.js',
  },
  externals: staticConfig.externals,
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
});
