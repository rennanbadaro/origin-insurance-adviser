const validator = require('../utils/schema-validator');

module.exports = (schema) => async (ctx, next) => {
  const { body } = ctx.request;

  validator(schema, body);

  await next();
};
