const Score = require('../Score');
const AgeProfiler = require('./AgeProfiler');

let profiler;
let baseInput;
let baseScore;

describe('AgeProfiler', () => {
  beforeEach(() => {
    profiler = new AgeProfiler();
    baseInput = {
      age: 61,
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
    it('Should set null for disability and life insurance if user is more than 60 years old', () => {
      const result = profiler.run(baseInput, baseScore);

      const expectedResult = new Score({
        ...baseScore,
        disability: null,
        life: null,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should deduct 2 points from all insurance life if user is under 30 years old', () => {
      const input = {
        ...baseInput,
        age: 29,
      };

      const result = profiler.run(input, baseScore);

      const expectedResult = new Score({
        auto: baseScore.auto - 2,
        disability: baseScore.disability - 2,
        home: baseScore.home - 2,
        life: baseScore.life - 2,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should deduct 1 point from all insurance life if user is between 30 and 40 years old', () => {
      const input = {
        ...baseInput,
        age: 35,
      };

      const result = profiler.run(input, baseScore);

      const expectedResult = new Score({
        auto: baseScore.auto - 1,
        disability: baseScore.disability - 1,
        home: baseScore.home - 1,
        life: baseScore.life - 1,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not affect score if user is more than 40 and less than 60 old', () => {
      const input = {
        ...baseInput,
        age: 45,
      };

      const result = profiler.run(input, baseScore);

      expect(result).toStrictEqual(baseScore);
    });
  });
});
