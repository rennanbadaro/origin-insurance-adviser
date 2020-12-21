const Score = require('src/domain/score/Score');
const IncomeProfiler = require('src/domain/score/profilers/IncomeProfiler');

let profiler;
let baseInput;
let score;

describe('IncomeProfiler', () => {
  beforeEach(() => {
    profiler = new IncomeProfiler();
    baseInput = {
      age: 35,
      dependents: 2,
      house: null,
      income: 100000,
      marital_status: 'single',
      risk_questions: [0, 1, 0],
      vehicle: null,
    };
    score = new Score({
      auto: 3,
      disability: 3,
      home: 3,
      life: 3,
    });
  });

  describe('.run', () => {
    it('Should set null for disability, auto and home insurance if income is zero', () => {
      const input = { baseInput, income: 0 }
      const result = profiler.run(input, score);

      const expectedResult = new Score({
        ...score,
        auto: null,
        disability: null,
        home: null,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should set null for disability, auto and home insurance if income is not provided', () => {
      const input = { ...baseInput };
      delete input.income;

      const result = profiler.run(input, score);

      const expectedResult = new Score({
        ...score,
        auto: null,
        disability: null,
        home: null,
      });

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not affect the score result if income is lower than 200k', () => {
      const result = profiler.run(baseInput, score);

      expect(result).toStrictEqual(score);
    });

    it('Should not affect the score result if income is equal to 200k', () => {
      const input = { ...baseInput, income: 200000 };

      const result = profiler.run(input, score);

      expect(result).toStrictEqual(score);
    });

    it('Should deduct 1 from all lines of insurance if income is bigger than 200k', () => {
      const input = { ...baseInput, income: 200001 };

      const result = profiler.run(input, score);

      const expectedResult = new Score({
        auto: score.auto - 1,
        disability: score.disability - 1,
        home: score.disability - 1,
        life: score.life - 1,
      })

      expect(result).toStrictEqual(expectedResult);
    });

    it('Should not affect the score result even for income bigger than 200k if those scores are null', () => {
      const input = { ...baseInput, income: 300000 };
      const score = new Score({
        auto: null,
        disability: null,
        home: null,
        life: null,
      })

      const result = profiler.run(input, score);

      expect(result).toStrictEqual(score);
    });
  });
});
