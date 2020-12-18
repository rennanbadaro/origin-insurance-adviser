const Score = require('../Score');
const HouseProfiler = require('./HouseProfiler');
const HouseOwnershipEnum = require('../../../shared/enums/HouseOwnershipStatus.enum');

let sut;
let baseInput;
let baseScore;

describe('IncomeProfile', () => {
  beforeEach(() => {
    sut = new HouseProfiler();
    baseInput = {
      age: 35,
      dependents: 2,
      house: null,
      income: 100000,
      marital_status: 'single',
      risk_questions: [0, 1, 0],
      vehicle: 0,
    };
    baseScore = new Score({
      auto: 3,
      disability: 3,
      home: 3,
      life: 3,
    });
  });

  describe('.run', () => {
    it('Should set null for disability, auto and home insurance when user house is null', () => {
      const result = sut.run(baseInput, baseScore);

      const expectedResult = new Score({
        ...baseScore,
        auto: null,
        disability: null,
        home: null,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not modify the result if the house is owned', () => {
      const input = {
        ...baseInput,
        house: { ownership_status: HouseOwnershipEnum.owned },
      };
      const result = sut.run(input, baseScore);

      expect(result).toStrictEqual(baseScore);
    });

    it('Should increase one to house and disability lines if house is mortgaged', () => {
      const input = {
        ...baseInput,
        house: { ownership_status: HouseOwnershipEnum.mortgaged },
      };

      const expectedResult = new Score({
        ...baseScore,
        disability: baseScore.disability + 1,
        home: baseScore.home + 1,
      });
      const result = sut.run(input, baseScore);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
