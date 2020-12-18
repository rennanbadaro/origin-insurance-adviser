const Score = require('../Score');

class RiskQuizProfiler {
  run(adviceInput = {}) {
    const { risk_questions } = adviceInput;

    const insuranceLinesScore = risk_questions.reduce(
      (acc, curr) => curr + acc,
      0
    );

    return new Score({
      auto: insuranceLinesScore,
      disability: insuranceLinesScore,
      home: insuranceLinesScore,
      life: insuranceLinesScore,
    });
  }
}

module.exports = RiskQuizProfiler;
