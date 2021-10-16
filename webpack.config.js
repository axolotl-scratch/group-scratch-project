const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["regenerator-runtime/runtime.js",path.join(__dirname, './src/index.js')],
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/',
    },
      mode: process.env.NODE_ENV,
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
          publicPath: './',
        },
        compress: true,
        host: 'localhost',
        hot: true,
        port: 8080,
        proxy: {
          '/**/**': {
          target: 'http://localhost:3000/',
          secure: null,
          }
        },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'},
    },
      plugins: [
          new HtmlWebpackPlugin({
            template: './src/index.html',
          }),
        ],
      module:{
        rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', `@babel/preset-react`],
              plugins: ["react-hot-loader/babel"]
            }
          }]
        }, 
        {
            test: /.(css|scss)$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }