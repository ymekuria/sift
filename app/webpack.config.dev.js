var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var buildPath = path.resolve(__dirname, 'public', 'build')
var mainPath = path.resolve(__dirname, 'client', 'app.jsx')




module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    mainPath
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
