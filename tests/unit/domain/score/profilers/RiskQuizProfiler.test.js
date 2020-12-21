const Score = require('src/domain/score/Score');
const RiskQuizProfiler = require('src/domain/score/profilers/RiskQuizProfiler');

let profiler;
let baseInput;

describe('RiskQuizProfiler', () => {
  beforeEach(() => {
    profiler = new RiskQuizProfiler();
    baseInput = {
      age: 35,
      dependents: 2,
      house: null,
      income: 100000,
      marital_status: 'single',
      risk_questions: [1, 0, 1],
      vehicle: null,
    };
  });

  describe('.run', () => {
    it('Should sum up risk questions input and set it to all lines os insurance', () => {
      const result = profiler.run(baseInput);

      const expectedResult = new Score({
        auto: 2,
        disability: 2,
        home: 2,
        life: 2
      });

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
