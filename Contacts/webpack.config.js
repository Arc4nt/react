module.exports = {
  entry: [
    './source/App.js'
  ],
  output: {
    path: "./",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  }
};