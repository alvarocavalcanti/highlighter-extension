const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    popup: './src/popup/index.tsx',
    background: './src/background/index.ts',
    content: './src/content/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(process.env.BROWSER || 'chrome')
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' },
        {
          from: 'src/manifest.ts',
          to: 'manifest.json',
          transform: (content, path) => {
            const manifest = require('./src/manifest.ts');
            return JSON.stringify(manifest.default, null, 2);
          },
        },
      ],
    }),
  ],
};
