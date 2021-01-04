const logger = require('koa-pino-logger');

const isDevEnv = process.env.NODE_ENV !== 'production';
const logLevel = process.env.LOG_LEVEL || 'info';

module.exports = () =>
  logger({
    prettyPrint: isDevEnv,
    level: logLevel,
  });
