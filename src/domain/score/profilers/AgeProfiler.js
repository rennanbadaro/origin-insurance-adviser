const { isNull } = require('lodash');

const Score = require('../Score');
const BaseProfiler = require('./BaseProfiler');

class AgeProfiler extends BaseProfiler {
  constructor(nextProfiler = null) {
    super(nextProfiler)
  }

  run(adviceInput, score) {
    const { age } = adviceInput;

    const isMoreThan60 = age > 60;
    let profilerResult = new Score({ ...score });

    if (isMoreThan60) {
      profilerResult = new Score({
        ...profilerResult,
        disability: null,
        life: null,
      });

      return this.handleNext(adviceInput, profilerResult);
    }

    const isUnder30 = age < 30;

    if (isUnder30) {
      profilerResult = new Score({
        auto: isNull(profilerResult.auto) ? null : profilerResult.auto - 2,
        disability: isNull(profilerResult.disability) ? null : profilerResult.disability - 2,
        home: isNull(profilerResult.home) ? null : profilerResult.home - 2,
        life: isNull(profilerResult.life) ? null : profilerResult.life - 2,
      });

      return this.handleNext(adviceInput, profilerResult);
    }

    const isBetween30And40 = age >= 30 && age <= 40

    if (isBetween30And40) {
      profilerResult = new Score({
        auto: isNull(profilerResult.auto) ? null : profilerResult.auto - 1,
        disability: isNull(profilerResult.disability) ? null : profilerResult.disability - 1,
        home: isNull(profilerResult.home) ? null : profilerResult.home - 1,
        life: isNull(profilerResult.life) ? null : profilerResult.life - 1,
      });

      return this.handleNext(adviceInput, profilerResult);
    }

    return this.handleNext(adviceInput, profilerResult);
  }
}

module.exports = AgeProfiler;
