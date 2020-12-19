const ScoreUseCaseFactory = require('../../score/factories/ScoreUseCaseFactory');
const GenerateInsuranceAdvice = require('../use-cases/GenerateInsuranceAdvice');

class InsuranceAdviceUseCaseFactory {
  static getGenerateInsuranceAdvice() {
    const generateScoreUseCase = ScoreUseCaseFactory.getGenerateScore();

    return new GenerateInsuranceAdvice({ generateScoreUseCase });
  }
}

module.exports = InsuranceAdviceUseCaseFactory;
