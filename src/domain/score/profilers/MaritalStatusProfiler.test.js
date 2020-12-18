const Score = require('../Score');
const MaritalStatusProfiler = require('./MaritalStatusProfiler');
const MaritalStatusEnum = require('../../../shared/enums/MaritalStatus');

let profiler;
let baseInput;
let baseScore;

describe('MaritalStatusProfiler', () => {
  beforeEach(() => {
    profiler = new MaritalStatusProfiler();
    baseInput = {
      age: 35,
      dependents: 0,
      house: null,
      income: 100000,
      marital_status: MaritalStatusEnum.SINGLE,
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
    it('Should not affect score if user is single', () => {
      const result = profiler.run(baseInput, baseScore);

      expect(result).toStrictEqual(baseScore);
    });

    it('Should increase 1 risk to life insurance and deduct 1 from disability if user is married', () => {
      const input = {
        ...baseInput,
        marital_status: MaritalStatusEnum.MARRIED,
      };

      const result = profiler.run(input, baseScore);

      const expectedResult = new Score({
        ...baseScore,
        life: baseScore.life - 1,
        disability: baseScore.disability + 1,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not affect score even if user is married if life and disability insurance lines are null', () => {
      const input = {
        ...baseInput,
        marital_status: MaritalStatusEnum.MARRIED,
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
