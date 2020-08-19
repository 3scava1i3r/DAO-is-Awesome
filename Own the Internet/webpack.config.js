var path = require('path');

module.exports = {
  entry: './src/index.js',
  node: {
   fs: "empty"
},
  //node: { global: true, fs: 'empty' },
  node: {global: true},
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 9000
  }

};
