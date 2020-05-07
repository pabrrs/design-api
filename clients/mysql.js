const { Sequelize } = require('sequelize')
const { hostname, username, database, port, password } = require('../config/mysql-config')

const URI = `mysql://${username}${password}@${hostname}:${port}/${database}`

/** @type {Sequelize} */
let connection

module.exports = {
  _connect() {
    return new Sequelize(URI, {
      logging: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    })
  },

  /**
   * Inicializar conexão com MySQL utilizando Singleton
   * @type {Sequelize}
   */
  getConnection() {
    connection = connection || this._connect()
    return connection
  },

  /**
   * Finaliza conexão com o MySQL caso exista
   */
  async closeConnection() {
    if (connection) {
      await connection.close()
    }
    connection = undefined
  }
}
