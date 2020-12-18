const { isNull } = require('lodash');

const Score = require('../Score');

class AgeProfiler {
  run(adviceInput = {}, score = {}) {
    const { age } = adviceInput;

    const isMoreThan60 = age > 60;
    const profilerResult = new Score({ ...score });

    if (isMoreThan60) {
      return new Score({
        ...profilerResult,
        disability: null,
        life: null,
      });
    }

    const isUnder30 = age < 30;

    if (isUnder30) {
      return new Score({
        auto: isNull(profilerResult.auto) ? null : profilerResult.auto - 2,
        disability: isNull(profilerResult.disability) ? null : profilerResult.disability - 2,
        home: isNull(profilerResult.home) ? null : profilerResult.home - 2,
        life: isNull(profilerResult.life) ? null : profilerResult.life - 2,
      });
    }

    const isBetween30And40 = age >= 30 && age <= 40

    if (isBetween30And40) {
      return new Score({
        auto: isNull(profilerResult.auto) ? null : profilerResult.auto - 1,
        disability: isNull(profilerResult.disability) ? null : profilerResult.disability - 1,
        home: isNull(profilerResult.home) ? null : profilerResult.home - 1,
        life: isNull(profilerResult.life) ? null : profilerResult.life - 1,
      });
    }

    return profilerResult;
  }
}

module.exports = AgeProfiler;
