const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const packageJson = require('./package.json')

function getValueFromArgs(name, args) {
  const prefix = `--${name}=`
  for (let i = 0; i < args.original.length; i += 1) {
    if (args.original[i].indexOf(prefix) === 0) {
      return args.original[i].replace(prefix, '')
    }
  }
}
const DefaultServer = getValueFromArgs(
  'server',
  JSON.parse(process.env.npm_config_argv)
) || ''

module.exports = (env = {}) => ({
  mode: env.production ? 'production' : 'development',

  entry: {
    feedback: './src/index'
  },

  output: {
    filename: env.production && env.version ? `[name]-${packageJson.version}-[contenthash:8].js` : '[name].js',
    path: env.output || path.resolve(__dirname, 'build')
  },

  devtool: env.production ? 'cheap-source-map' : 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /.ts$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              attributes: { type: 'text/css', id: 'feedback-style-initial' },
              insert: function(element) {
                const parent = document.querySelector('head')
                parent.insertBefore(element, parent.firstChild)
              }
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      DefaultServer: JSON.stringify(DefaultServer),
      CustomDefaultOption: env.CustomDefaultOption ? Buffer.from(env.CustomDefaultOption, 'base64').toString() : JSON.stringify({}),
      AutoSetup: JSON.stringify(env.AutoSetup || false),
      AppId: JSON.stringify(env.AppId || '')
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'head'
    }),
    ...(env.production ? [new CleanWebpackPlugin()] : [])
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true
  }
})
