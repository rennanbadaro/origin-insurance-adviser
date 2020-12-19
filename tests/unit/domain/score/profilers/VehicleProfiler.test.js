const Score = require('src/domain/score/Score');
const VehicleProfiler = require('src/domain/score/profilers/VehicleProfiler');

let profiler;
let baseInput;
let baseScore;

describe('VehicleProfiler', () => {
  beforeEach(() => {
    profiler = new VehicleProfiler();
    baseInput = {
      age: 35,
      dependents: 2,
      house: null,
      income: 100000,
      marital_status: 'single',
      risk_questions: [0, 1, 0],
      vehicle: null,
    };
    baseScore = new Score({
      auto: 3,
      disability: 3,
      home: 3,
      life: 3,
    });
  });

  describe('.run', () => {
    it('Should set null for disability, auto and home insurance when user has no vehicle', () => {
      const result = profiler.run(baseInput, baseScore);

      const expectedResult = new Score({
        ...baseScore,
        auto: null,
        disability: null,
        home: null,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not modify the result if the vehicle has more than 5 year of its manufacture', () => {
      const input = {
        ...baseInput,
        vehicle: { year: new Date().getFullYear() - 6 },
      };
      const result = profiler.run(input, baseScore);

      expect(result).toStrictEqual(baseScore);
    });

    it('Should add 1 to auto score if the vehicle was manufactured in the last 5 years', () => {
      const input = {
        ...baseInput,
        vehicle: { year: new Date().getFullYear() - 1 },
      };
      const result = profiler.run(input, baseScore);

      const expectedResult = new Score({
        ...baseScore,
        auto: baseScore.auto + 1,
      });

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
