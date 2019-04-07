const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'jsDiceCodes',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};
