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
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file'
      }
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
