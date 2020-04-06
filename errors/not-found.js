class NotFound extends Error {
  constructor({ message, statusCode }) {
    super(message)
    this.name = 'NotFound'
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = NotFound
