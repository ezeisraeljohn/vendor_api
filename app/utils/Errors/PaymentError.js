const BaseError  = require("./baseError");

class PaymentError extends BaseError {
  constructor(message, status = 400, details = null) {
    super(message, status, details);
    this.name = 'PaymentError';
    Error.captureStackTrace(this, this.constructor);
    this.isOperational = true; // This is an operational error, not a programming error
  }
}   

module.exports = PaymentError;