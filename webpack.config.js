const webpack = require('webpack');
const fs = require('fs');

const useSourceMaps = false;
const minify = false;

const plugins = [];
if (minify) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }));
}

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });
const bundle = {
  entry: {
    scripts: './src/index.js',
  },
  output: {
    path: `${__dirname}/build`,
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  devtool: useSourceMaps ? 'eval-cheap-module-source-map' : null,
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/assets`,
        exclude: /bundle\.js$/,
      },
    ],
    loaders: [
      { test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: plugins.length > 0 ? plugins : null,
};


module.exports = bundle;
