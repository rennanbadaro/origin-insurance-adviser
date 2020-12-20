const SchemaValidationError = require('../../shared/errors/SchemaValidationError');

module.exports = (schema, obj) => {
  const { error } = schema.validate(obj, { abortEarly: false });

  if (!error) {
    return;
  }

  const { details } = error;

  const errorResult = details.map(
    error => new SchemaValidationError(error.message)
  );

  throw errorResult;
};
