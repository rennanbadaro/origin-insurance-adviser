const { isNull } = require('lodash');
const MaritalStatusEnum = require('../../../shared/enums/MaritalStatus');

const Score = require('../Score');
const BaseProfiler = require('./BaseProfiler');

class MaritalStatusProfiler extends BaseProfiler {
  constructor(nextProfiler = null) {
    super(nextProfiler)
  }

  run(adviceInput, score = {}) {
    let profilerResult = new Score({ ...score });

    const isSingle = adviceInput.marital_status === MaritalStatusEnum.SINGLE;

    if (isSingle) {
      return this.handleNext(adviceInput, profilerResult);
    }

    profilerResult = new Score({
      ...profilerResult,
      disability: isNull(profilerResult.disability) ? null : profilerResult.disability - 1,
      life: isNull(profilerResult.life) ? null : profilerResult.life + 1,
    });

    return this.handleNext(adviceInput, profilerResult);
  }
}

module.exports = MaritalStatusProfiler;
