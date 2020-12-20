const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const insuranceAdvice = require('./routers/insurance-advice');

const errorHandler = require('./middlewares/error-handler');

const app = new Koa();

app.use(bodyParser());
app.use(errorHandler());

app.use(insuranceAdvice.routes());

module.exports = app;
