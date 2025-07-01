const BaseError  = require('./baseError');

class ValidationError extends BaseError {
  constructor(message, status = 400, details = null) {
    super(message, status, details);
    this.name = 'ValidationError';
    this.isOperational = true; // This is an operational error, not a programming error
  }
}

module.exports = ValidationError;
