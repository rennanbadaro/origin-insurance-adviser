const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const insuranceAdvice = require('./routers/insurance-advice');
const healthcheck = require('./routers/healthcheck');

const errorHandler = require('./middlewares/error-handler');
const requestLogger = require('./middlewares/request-logger');

const app = new Koa();

app.use(bodyParser());
app.use(errorHandler());
app.use(requestLogger());

app.use(healthcheck.routes());
app.use(insuranceAdvice.routes());

module.exports = app;
