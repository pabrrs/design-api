const loader = require('@b2wads/env-o-loader')

const appConfig = Object.freeze(
  loader({
    defaults: {
      url: 'http://localhost:3000'
    },
    production: {
      url: 'env:APP_URL'
    }
  })
)

module.exports = appConfig
