const { isNil, isNull } = require('lodash');

const Score = require('../Score');
const BaseProfiler = require('./BaseProfiler');

class VehicleProfiler extends BaseProfiler {
  run(adviceInput = {}, score = {}) {
    const hasVehicle = !isNil(adviceInput.vehicle) && adviceInput.vehicle.year;

    let profilerResult = new Score({ ...score });

    if (!hasVehicle) {
      profilerResult = new Score({
        ...profilerResult,
        auto: null,
        disability: null,
        home: null,
      });

      return this.handleNext(adviceInput, profilerResult);
    }

    const { year: yearOfManufacture } = adviceInput.vehicle;
    const hasMoreThanFiveYears =
      new Date().getFullYear() - yearOfManufacture > 5;

    if (hasMoreThanFiveYears) {
      return this.handleNext(adviceInput, profilerResult);
    }

    profilerResult = new Score({
      ...profilerResult,
      auto: isNull(profilerResult.auto) ? null : profilerResult.auto + 1,
    });

    return this.handleNext(adviceInput, profilerResult);
  }
}

module.exports = VehicleProfiler;
