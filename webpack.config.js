const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  return {
    entry: './src/index.js',
    module: {
      rules: rules(),
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      port: 3000,
      hot: true,
      open: true,
    },
    plugins: plugins(),
  }
}

let rules = () => {
  return [js(), scssModule(), scssGlobal(), images()]
}

function js() {
  return {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  }
}

function scssModule() {
  return {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      'sass-loader',
    ],
    include: /\.mod\.scss$/,
  }
}

function scssGlobal() {
  return {
    test: /\.(css|scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /\.mod\.scss$/,
  }
}

function images() {
  return {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/images',
        },
      },
    ],
  }
}

let plugins = () => {
  return [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ]
}