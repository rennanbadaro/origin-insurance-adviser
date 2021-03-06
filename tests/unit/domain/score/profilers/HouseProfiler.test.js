const Score = require('src/domain/score/Score');
const HouseProfiler = require('src/domain/score/profilers/HouseProfiler');
const HouseOwnershipEnum = require('src/shared/enums/HouseOwnershipStatus');

let profiler;
let baseInput;
let baseScore;

describe('HouseProfile', () => {
  beforeEach(() => {
    profiler = new HouseProfiler();
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
    it('Should set null for disability, auto and home insurance if user has no house', () => {
      const result = profiler.run(baseInput, baseScore);

      const expectedResult = new Score({
        ...baseScore,
        auto: null,
        disability: null,
        home: null,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not affect score if the house is owned', () => {
      const input = {
        ...baseInput,
        house: { ownership_status: HouseOwnershipEnum.OWNED },
      };
      const result = profiler.run(input, baseScore);

      expect(result).toStrictEqual(baseScore);
    });

    it('Should increase one to house and disability lines if house is mortgaged', () => {
      const input = {
        ...baseInput,
        house: { ownership_status: HouseOwnershipEnum.MORTGAGED },
      };

      const expectedResult = new Score({
        ...baseScore,
        disability: baseScore.disability + 1,
        home: baseScore.home + 1,
      });
      const result = profiler.run(input, baseScore);

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not affect score event if the house is mortgaged if disability and home insurance lines are already null', () => {
      const input = {
        ...baseInput,
        house: { ownership_status: HouseOwnershipEnum.MORTGAGED },
      };

      const score = new Score({
        ...baseScore,
        disability: null,
        home: null,
      });

      const result = profiler.run(input, score);

      expect(result).toStrictEqual(score);
    });
  });
});
