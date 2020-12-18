const Score = require('../Score');
const RiskQuizProfiler = require('./RiskQuizProfiler');

let sut;
let baseInput;

describe('RiskQuizProfiler', () => {
  beforeEach(() => {
    sut = new RiskQuizProfiler();
    baseInput = {
      age: 35,
      dependents: 2,
      house: null,
      income: 100000,
      marital_status: 'single',
      risk_questions: [1, 0, 1],
      vehicle: 0,
    };
  });

  describe('.run', () => {
    it('Should sum up risk questions input and set it to all lines os insurance', () => {
      const result = sut.run(baseInput);

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