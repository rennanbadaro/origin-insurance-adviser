const { isNil, isNull } = require('lodash');

const Score = require('../Score');

class VehicleProfiler {
  run(adviceInput = {}, score = {}) {
    const hasVehicle = !isNil(adviceInput.vehicle) && adviceInput.vehicle.year;

    const profilerResult = new Score({ ...score });

    if (!hasVehicle) {
      profilerResult.auto = null;
      profilerResult.disability = null;
      profilerResult.home = null;

      return profilerResult;
    }

    const { year: yearOfManufacture } = adviceInput.vehicle;
    const hasMoreThanFiveYears =
      new Date().getFullYear() - yearOfManufacture > 5;

    if (hasMoreThanFiveYears) {
      return profilerResult;
    }

    return new Score({
      ...profilerResult,
      auto: isNull(profilerResult.auto) ? profilerResult.auto : profilerResult.auto + 1,
    });
  }
}

module.exports = VehicleProfiler;
