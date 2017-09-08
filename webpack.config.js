const path = require("path");

module.exports = {
 entry: [
   './src/main.jsx'
 ],
 target: 'web',
 output: {
  path: path.join(__dirname, '/public'),
  filename: "bundle.js"
 },
 module: {
   loaders: [
     {
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015', 'stage-1']
       },
     },
   ]
 },
 resolve: {
   extensions: ['.js', '.jsx']
 },
 devServer: {
   historyApiFallback: true,
   contentBase: './',
   port: 5000
 }
};
