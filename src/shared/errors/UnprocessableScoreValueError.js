class UnprocessableScoreValueError extends Error {
  constructor(value) {
    super(`Unprocessable score value ${value}`);
    this.name = 'UnprocessableScoreValueError';
    this.code = 'IA001';
  }
}

module.exports = UnprocessableScoreValueError;
