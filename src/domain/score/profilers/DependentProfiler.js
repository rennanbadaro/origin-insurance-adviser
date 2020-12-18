const { isNull } = require('lodash');

const Score = require('../Score');

class DependentProfiler {
  run(adviceInput = {}, score = {}) {
    const profilerResult = new Score({ ...score });

    const hasDependents = adviceInput.dependents > 0;

    if (!hasDependents) {
      return profilerResult;
    }

    return new Score({
      ...profilerResult,
      disability: isNull(profilerResult.disability) ? null : profilerResult.disability + 1,
      life: isNull(profilerResult.life) ? null : profilerResult.life + 1,
    });
  }
}

module.exports = DependentProfiler;
