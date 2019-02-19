const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: {
    track: './src/track.js'
  }, // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, './'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: '[name].js', // string
    // the filename template for entry chunks
    library: 'track',
    libraryTarget: 'umd', // universal module definition
    // // the type of the exported library
    globalObject: 'this'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   template: './index.html',
    //   inject: 'body',
    //   filename: './index.html'
    // })
  ],
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};