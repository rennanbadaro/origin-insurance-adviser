const { StatusCodes } = require('http-status-codes');
const errorCodes = require('./error-codes');

class UnprocessableScoreValueError extends Error {
  constructor(value) {
    super(`Unprocessable score value ${value}`);
    this.name = 'UnprocessableScoreValueError';
    this.code = errorCodes.UNPROCESSABLE_SCORE_VALUE;
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = UnprocessableScoreValueError;
