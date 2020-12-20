const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = err || {};

    // deals with schema validation exceptions where an array of errors is thrown
    if (Array.isArray(err)) {
      ctx.response.status = StatusCodes.UNPROCESSABLE_ENTITY;
      ctx.response.body = error.map(e => ({
        code: e.code,
        message: e.message,
      }));

      return;
    }

    ctx.response.status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.response.body = {
      code: error.code,
      message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }
};

module.exports = errorHandler;
