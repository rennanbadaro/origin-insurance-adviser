const { isNull } = require('lodash');

const Score = require('../Score');
const BaseProfiler = require('./BaseProfiler');

class DependentProfiler extends BaseProfiler {
  constructor(nextProfiler = null) {
    super(nextProfiler)
  }

  run(adviceInput, score) {
    let profilerResult = new Score({ ...score });

    const hasDependents = adviceInput.dependents > 0;

    if (!hasDependents) {
      return this.handleNext(adviceInput, profilerResult);
    }

    profilerResult = new Score({
      ...profilerResult,
      disability: isNull(profilerResult.disability) ? null : profilerResult.disability + 1,
      life: isNull(profilerResult.life) ? null : profilerResult.life + 1,
    });

    return this.handleNext(adviceInput, profilerResult);
  }
}

module.exports = DependentProfiler;
