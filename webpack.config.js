const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
    ],
  },
  resolve: {
    alias: {
      utilitarios: path.resolve(__dirname, 'node_modules/utilitarios')
    }
  }
};
