const loader = require('@b2wads/env-o-loader')

const mysqlConfig = Object.freeze(
  loader({
    defaults: {
      hostname: '127.0.0.1',
      username: 'root',
      password: '',
      port: 3307,
      database: 'design_api_test'
    },
    production: {
      hostname: '127.0.0.1',
      username: 'root',
      password: '',
      port: 3306,
      database: 'design_api'
    }
  })
)

module.exports = mysqlConfig
