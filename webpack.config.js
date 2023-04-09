const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    main: "./src/main/main.tsx",
    popup: "./src/popup/main/popup.tsx",
    background: "./src/background.ts"
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /s(a|c)ss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".sass"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/main/main.html",
      filename: "main.html",
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/popup/main/popup.html",
      filename: "popup.html",
      chunks: ['popup']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: ""}
      ]
    }),
    new MiniCssExtractPlugin({ filename: 'css/style.css'})
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    host: "localhost",
    port: 5500,
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: 'main.html'},
        {from: "/popup", to: 'popup.html'}
      ]
  },
},
  mode: "development"
}