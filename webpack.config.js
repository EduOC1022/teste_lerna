const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './packages/utilitarios/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'packages/utilitarios/dist')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './packages/utilitarios/', to: '.' }
      ],
    }),
  ],
};

/// Anotação = fazer um bundler para o utilitarios