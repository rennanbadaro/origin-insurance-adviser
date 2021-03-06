const Score = require('src/domain/score/Score');
const DependentProfiler = require('src/domain/score/profilers/DependentProfiler');

let profiler;
let baseInput;
let baseScore;

describe('DependentProfiler', () => {
  beforeEach(() => {
    profiler = new DependentProfiler();
    baseInput = {
      age: 35,
      dependents: 0,
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
    it('Should not affect score if user has no dependents', () => {
      const result = profiler.run(baseInput, baseScore);

      expect(result).toStrictEqual(baseScore);
    });

    it('Should increase 1 risk point to disability and life insurance if user has dependents', () => {
      const input = {
        ...baseInput,
        dependents: 1,
      };

      const result = profiler.run(input, baseScore);

      const expectedResult = new Score({
        ...baseScore,
        disability: baseScore.disability + 1,
        life: baseScore.life + 1,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not affect score even if user has dependents if disability and life insurance lines are already null', () => {
      const input = {
        ...baseInput,
        dependents: 99,
      };

      const score = new Score({
        ...baseScore,
        disability: null,
        life: null,
      });

      const result = profiler.run(input, score);

      expect(result).toStrictEqual(score);
    });
  });
});
