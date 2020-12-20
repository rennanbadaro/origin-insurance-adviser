const { StatusCodes } = require('http-status-codes');
const errorCodes = require('./error-codes');

class SchemaValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SchemaValidationError';
    this.code = errorCodes.SCHEMA_VALIDATION;
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = SchemaValidationError;
