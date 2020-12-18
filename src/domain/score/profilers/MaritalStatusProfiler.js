const { isNull } = require('lodash');
const MaritalStatusEnum = require('../../../shared/enums/MaritalStatus');

const Score = require('../Score');

class MaritalStatusProfiler {
  run(adviceInput = {}, score = {}) {
    const profilerResult = new Score({ ...score });

    const isSingle = adviceInput.marital_status === MaritalStatusEnum.SINGLE;

    if (isSingle) {
      return profilerResult;
    }

    return new Score({
      ...profilerResult,
      disability: isNull(profilerResult.disability) ? null : profilerResult.disability + 1,
      life: isNull(profilerResult.life) ? null : profilerResult.life - 1,
    });
  }
}

module.exports = MaritalStatusProfiler;
