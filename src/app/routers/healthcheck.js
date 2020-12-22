const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const Router = require('@koa/router');

const router = new Router({
  prefix: '/healthcheck',
});

router.get('/', ctx => {
  // future availability checks (db status, broker connection, etc) should be placed here
  ctx.body = {
    status: ReasonPhrases.OK,
  };
  ctx.status = StatusCodes.OK;
});

module.exports = router;
