const path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './_public/app.js',
  output: {
    path: path.join(__dirname, '/_dist'),
    filename: '[hash].js'
  },
  devtool: 'source-map',
  devServer: {
    port: 3001
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.s?css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline'
            }
          },
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['_dist']),
    new HtmlWebpackPlugin({
      template: './_public/html/index.html',
      minify: {
        removeComments: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        sortAttributes: true,
        sortClassName: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: './_server/404.html',
      minify: {
        removeComments: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        sortAttributes: true,
        sortClassName: true
      }
    }),
    new ExtractTextPlugin({
      filename: '[hash].css'
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ],
  externals: [
    require('webpack-require-http')
  ]
};