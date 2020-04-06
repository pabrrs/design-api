const loader = require('@b2wads/env-o-loader')

module.exports = Object.freeze(
  loader({
    defaults: {
      hostname: '127.0.0.1',
      username: 'root',
      password: '',
      port: 3306,
      database: 'design_api'
    },
    production: {
      hostname: 'env:APP_MYSQL_HOSTNAME',
      username: 'env:APP_MYSQL_USERNAME',
      password: 'env:APP_MYSQL_PASSWORD',
      port: 'env:APP_MYSQL_PORT',
      database: 'env:APP_MYSQL_DATABASE'
    }
  })
)
