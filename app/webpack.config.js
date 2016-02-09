var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      exclude: /(node_modules)/,
      loader: 'babel',
      include: path.join(__dirname, 'client'),
      query: {
        presets: ['react', 'es2015', 'stage-2']
      }
    },
    {
     test: /\.css$/,
     exclude: /node_modules/,
     loader: 'style!css'
   }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};