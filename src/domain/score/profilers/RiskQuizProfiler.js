const Score = require('../Score');
const BaseProfiler = require('./BaseProfiler');

class RiskQuizProfiler extends BaseProfiler {
  constructor(nextProfiler = null) {
    super(nextProfiler)
  }

  run(adviceInput) {
    const { risk_questions } = adviceInput;

    const insuranceLinesScore = risk_questions.reduce((acc, curr) => curr + acc, 0);

    const profilerResult = new Score({
      auto: insuranceLinesScore,
      disability: insuranceLinesScore,
      home: insuranceLinesScore,
      life: insuranceLinesScore,
    });

    return this.handleNext(adviceInput, profilerResult);
  }
}

module.exports = RiskQuizProfiler;
