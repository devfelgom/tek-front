const path = require('path')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack(config) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['constants'] = path.join(__dirname, 'constants')
    config.resolve.alias['containers'] = path.join(__dirname, 'containers')
    config.resolve.alias['utils'] = path.join(__dirname, 'utils')
    config.resolve.alias['validations'] = path.join(__dirname, 'validations')
    return config
  }
})
