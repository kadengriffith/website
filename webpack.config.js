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
      template: './_public/routes/html/index.html',
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
      filename: 'browse/index.html',
      template: './_public/routes/html/browse.html',
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
      filename: 'pricing/index.html',
      template: './_public/routes/html/pricing.html',
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
      filename: 'shop/index.html',
      template: './_public/routes/html/shop.html',
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
      filename: 'signup/index.html',
      template: './_public/routes/html/signup.html',
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
      filename: 'login/index.html',
      template: './_public/routes/html/login.html',
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
      filename: 'profile/index.html',
      template: './_public/routes/html/profile.html',
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
      filename: 'add/index.html',
      template: './_public/routes/html/add.html',
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
      filename: 'files/index.html',
      template: './_public/routes/html/files.html',
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
      filename: 'contact/index.html',
      template: './_public/routes/html/contact.html',
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
      filename: 'signup/index.html',
      template: './_public/routes/html/signup.html',
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
      filename: 'privacy/index.html',
      template: './_public/routes/html/privacy.html',
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
      filename: 'terms/index.html',
      template: './_public/routes/html/terms.html',
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
      filename: 'auth/index.html',
      template: './_public/routes/html/auth.html',
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
      filename: 'pay/index.html',
      template: './_public/routes/html/pay.html',
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
      filename: 'admin/index.html',
      template: './_public/routes/html/admin.html',
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