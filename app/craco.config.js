const CracoLessPlugin = require('craco-less')
const theme = require('./antd.theme')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: theme,
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}