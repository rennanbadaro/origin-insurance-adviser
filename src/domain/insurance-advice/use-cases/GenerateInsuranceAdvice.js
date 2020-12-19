const { isFinite, isNull } = require('lodash');

const InsurancePlanEnum = require('../../../shared/enums/InsurancePlan');
const InsuranceAdvice = require('../InsuranceAdvice');
const UnprocessableScoreValueError = require('../../../shared/errors/UnprocessableScoreValueError');

class GenerateInsuranceAdvice {
  constructor(params) {
    this.generateScoreUseCase = params.generateScoreUseCase;
  }

  run(adviceInput) {
    const score = this.generateScoreUseCase.run(adviceInput);

    const processedScore = Object.keys(score).reduce((acc, curr) => {
      const value = score[curr];
      const isInvalidValue = !isNull(value) && (isNaN(value) || !isFinite(value));

      if (isInvalidValue) {
        throw new UnprocessableScoreValueError(value);
      }

      if (value === null) {
        acc[curr] = InsurancePlanEnum.INELIGIBLE;

        return acc;
      }

      if (value <= 0) {
        acc[curr] = InsurancePlanEnum.ECONOMIC;

        return acc;
      }

      if (value === 1 || value === 2) {
        acc[curr] = InsurancePlanEnum.REGULAR;

        return acc;
      }

      if (value >= 3) {
        acc[curr] = InsurancePlanEnum.RESPONSIBLE;

        return acc;
      }
    }, {});

    return new InsuranceAdvice({ ...processedScore });
  }
}

module.exports = GenerateInsuranceAdvice;
