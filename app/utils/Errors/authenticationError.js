const BaseError = require('./baseError');

class AuthenticationError extends BaseError {
  constructor(message, status = 401, details = null) {
    super(message, status, details);
    this.name = 'AuthenticationError';
  }
}

module.exports = {
  AuthenticationError,
};