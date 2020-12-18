const { isNil, isNull } = require('lodash');

const HouseOwnershipStatusEnum = require('../../../shared/enums/HouseOwnershipStatus');
const Score = require('../Score');
const BaseProfiler = require('./BaseProfiler');

class HouseProfiler extends BaseProfiler {
  constructor(nextProfiler = null) {
    super(nextProfiler)
  }

  run(adviceInput, score) {
    const hasHouse =
      !isNil(adviceInput.house) && !isNil(adviceInput.house.ownership_status);

    let profilerResult = new Score({ ...score });

    if (!hasHouse) {
      profilerResult = new Score({
        ...profilerResult,
        auto: null,
        disability: null,
        home: null,
      })

      return this.handleNext(adviceInput, profilerResult);
    }

    const ownershipStatus = adviceInput.house.ownership_status;

    if (ownershipStatus === HouseOwnershipStatusEnum.MORTGAGED) {
      profilerResult = new Score({
        ...profilerResult,
        disability: isNull(profilerResult.disability) ? null : profilerResult.disability + 1,
        home: isNull(profilerResult.home) ? null : profilerResult.home + 1,
      });

      return this.handleNext(adviceInput, profilerResult);
    }

    return this.handleNext(adviceInput, profilerResult);
  }
}

module.exports = HouseProfiler;
