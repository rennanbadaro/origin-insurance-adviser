const { isNil, isNull } = require('lodash');

const Score = require('../Score');
const BaseProfiler = require('./BaseProfiler');

class IncomeProfiler extends BaseProfiler {
  constructor(nextProfiler = null) {
    super(nextProfiler)
  }

  run(adviceInput, score) {
    const hasIncome = !isNil(adviceInput.income) && adviceInput.income > 0;

    let profilerResult = new Score({ ...score });

    if (!hasIncome) {
      profilerResult = new Score({
        ...profilerResult,
        auto: null,
        disability: null,
        home: null,
      })

      return this.handleNext(adviceInput, profilerResult);
    }

    const shouldDeduct = adviceInput.income > this.topLevelIncome;

    if (shouldDeduct) {
      profilerResult = new Score({
        auto: isNull(profilerResult.auto) ? null : profilerResult.auto - 1,
        disability: isNull(profilerResult.disability) ? null : profilerResult.disability - 1,
        home: isNull(profilerResult.home) ? null : profilerResult.home - 1,
        life: isNull(profilerResult.life) ? null : profilerResult.life - 1,
      })

      return this.handleNext(adviceInput, profilerResult);
    }

    return this.handleNext(adviceInput, profilerResult);
  }
}

module.exports = IncomeProfiler;
