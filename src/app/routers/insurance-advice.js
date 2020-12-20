const Router = require('@koa/router');

const { postSchema } = require('../schemas/insurance-advice');
const getSchemaValidatorMiddleware = require('../middlewares/get-schema-validator');

const router = new Router({
  prefix: '/insurance-advice',
});

router.post('/', getSchemaValidatorMiddleware(postSchema));

module.exports = router;
