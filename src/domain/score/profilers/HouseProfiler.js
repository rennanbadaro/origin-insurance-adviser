const { isNil, isNull } = require('lodash');

const HouseOwnershipStatusEnum = require('../../../shared/enums/HouseOwnershipStatus');
const Score = require('../Score');

class HouseProfiler {
  run(adviceInput = {}, score = {}) {
    const hasHouse =
      !isNil(adviceInput.house) && !isNil(adviceInput.house.ownership_status);

    const profilerResult = new Score({ ...score });

    if (!hasHouse) {
      profilerResult.auto = null;
      profilerResult.disability = null;
      profilerResult.home = null;

      return profilerResult;
    }

    const ownershipStatus = adviceInput.house.ownership_status;

    if (ownershipStatus === HouseOwnershipStatusEnum.MORTGAGED) {
      profilerResult.disability = !isNull(profilerResult.disability)
        && profilerResult.disability + 1;

        profilerResult.home = !isNull(profilerResult.home)
        && profilerResult.home + 1;
    }

    return profilerResult;
  }
}

module.exports = HouseProfiler;
