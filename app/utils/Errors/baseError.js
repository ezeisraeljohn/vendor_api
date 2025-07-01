class BaseError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status
    Error.captureStackTrace(this, this.constructor);
    this.isOperational = true; // This is an operational error, not a programming error
  }
}

module.exports = BaseError;