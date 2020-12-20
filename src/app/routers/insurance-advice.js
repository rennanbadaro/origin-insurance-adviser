const Router = require('@koa/router');

const { postSchema } = require('../schemas/insurance-advice');
const schemaValidator = require('../middlewares/schema-validator');

const dependencyContainer = require('../../shared/dependency-container/container');
const dependenciesEnum = require('../../shared/dependency-container/dependencies.enum');

const controller = dependencyContainer.get(
  dependenciesEnum.INSURANCE_ADVICE_CONTROLLER
);

const router = new Router({
  prefix: '/insurance-advice',
});

router.post(
  '/',
  schemaValidator(postSchema),
  (...args) => controller.generateInsuranceAdvice(...args),
);

module.exports = router;
