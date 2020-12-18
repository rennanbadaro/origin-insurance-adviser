const { isNil, isNull } = require('lodash');

const Score = require('../Score');

class IncomeProfile {
  constructor() {
    this.topLevelIncome = 200000;
    this.deductionForTopLevelIncome = 1;
  }

  calculateDeduction(currentValue) {
    if (isNull(currentValue)) {
      return currentValue;
    }

    return currentValue - this.deductionForTopLevelIncome;
  }

  run(adviceInput = {}, score = {}) {
    const hasIncome = !isNil(adviceInput.income) && adviceInput.income > 0;

    const profilerResult = new Score({ ...score });

    if (!hasIncome) {
      profilerResult.auto = null;
      profilerResult.disability = null;
      profilerResult.home = null;

      return profilerResult;
    }

    const shouldDeduct = adviceInput.income > this.topLevelIncome;

    if (shouldDeduct) {
      profilerResult.auto = this.calculateDeduction(profilerResult.auto);
      profilerResult.disability = this.calculateDeduction(profilerResult.disability);
      profilerResult.home = this.calculateDeduction(profilerResult.home);
      profilerResult.life = this.calculateDeduction(profilerResult.life);

      return profilerResult;
    }

    return profilerResult;
  }
}

module.exports = IncomeProfile;
