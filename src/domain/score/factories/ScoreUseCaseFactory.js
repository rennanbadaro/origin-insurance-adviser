const GenerateScore = require('../use-cases/GenerateScore');
const ProfilerChainFactory = require('./ProfilerChainFactory');

class ScoreUseCaseFactory {
  static getGenerateScore() {
    return new GenerateScore({ ProfilerChainFactory });
  }
}

module.exports = ScoreUseCaseFactory;
