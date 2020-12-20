const InsuranceAdviceController = require('../../app/controllers/InsuranceAdviceController');
const ProfilerChainFactory = require('../../domain/score/factories/ProfilerChainFactory');
const GenerateScoreUseCase = require('../../domain/score/use-cases/GenerateScore');
const GenerateInsuranceAdviceUseCase = require('../../domain/insurance-advice/use-cases/GenerateInsuranceAdvice');

const dependenciesEnum = require('./dependencies.enum');

const enumMapping = {
    [dependenciesEnum.INSURANCE_ADVICE_CONTROLLER]: 'insuranceAdviceController',
    [dependenciesEnum.GENERATE_INSURANCE_ADVICE_USE_CASE]: 'generateInsuranceAdviceUseCase',
    [dependenciesEnum.GENERATE_SCORE_USE_CASE]: 'generateScoreUseCase',
}

class DependencyContainer {
  constructor() {
    this.generateScoreUseCase = new GenerateScoreUseCase({
      ProfilerChainFactory,
    });

    this.generateInsuranceAdviceUseCase = new GenerateInsuranceAdviceUseCase({
      generateScoreUseCase: this.generateScoreUseCase,
    });

    this.insuranceAdviceController = new InsuranceAdviceController({
      generateInsuranceAdviceUseCase: this.generateInsuranceAdviceUseCase,
    });
  }

  get(dependency) {
    const requestedDependency = enumMapping[dependency];

    if (!requestedDependency) {
      throw Error('Invalid Dependency');
    }

    return this[requestedDependency];
  }
}

module.exports = new DependencyContainer();
