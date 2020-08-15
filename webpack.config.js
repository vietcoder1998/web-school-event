const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

var path = require("path")

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    inline: false,
    contentBase: path.join(__dirname, './public'),
    devtool: 'cheap-module-eval-source-map',
    stats: 'errors-only',
    open: true,
    port: 3000,
    compress: true
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './static/[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './build/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //     config: JSON.stringify(config)
    // })
  ],

  module: {
    rules: [
      // scss config
      {
        test: /\.(c|s[ac])ss$/i,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'scss-loader',
            options: {
              sourceMap: true,
            },
          }
        ],
      },
      // file config
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './build/static/',
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        exclude: [path.resolve(__dirname, 'node_modules')],
        options: {
          name: '[name].[ext]',
          outputPath: './build/static/',
        },
      },
      // tsx config
      {
        test: /\.(tsx|js|jsx)?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ['@babel/react', '@babel/es2015'],
              plugins: ['@babel/proposal-class-properties']
            }
          }
        ],
      }
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  // plugins: [
  //   new MiniCssExtractPlugin({
  //     // Options similar to the same options in webpackOptions.output
  //     // both options are optional
  //     filename: '[name].css',
  //     chunkFilename: '[id].css',
  //   }),
  // ],
};