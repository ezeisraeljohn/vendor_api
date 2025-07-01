const BaseError  = require('./baseError');

class VendorError extends BaseError {
  constructor(message, status = 500, details = null) {
    super(message, status, details);
    this.name = 'VendorError';
    Error.captureStackTrace(this, this.constructor);
    this.isOperational = true; // This is an operational error, not a programming error
    }
}

module.exports = VendorError;
