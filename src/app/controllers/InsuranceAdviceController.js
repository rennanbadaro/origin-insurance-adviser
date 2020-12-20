const { StatusCodes } = require('http-status-codes');

const InsuranceAdviceInput = require('../../shared/InsuranceAdviceInput');

class InsuranceAdviceController {
  constructor(params) {
    this.generateInsuranceAdviceUseCase = params.generateInsuranceAdviceUseCase;
  }

  generateInsuranceAdvice(ctx) {
    const { body } = ctx.request;

    const adviceInput = new InsuranceAdviceInput(body);

    const insuranceAdvice = this.generateInsuranceAdviceUseCase.run(adviceInput);

    ctx.response.status = StatusCodes.OK;
    ctx.response.body = insuranceAdvice;
  }
}

module.exports = InsuranceAdviceController;
