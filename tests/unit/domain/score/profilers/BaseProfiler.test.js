const BaseProfiler = require('src/domain/score/profilers/BaseProfiler');
const Score = require('../../../../../src/domain/score/Score');

let profiler;

describe('BaseProfiler', () => {
  beforeEach(() => {
    profiler = new BaseProfiler();
  });

  describe('.handleNext', () => {
    it('Should call next.run with the exactly given input', () => {
      const input = { some: 'input' };
      const score = new Score();

      const nextStub = {
        run: jest.fn(),
      };

      profiler = new BaseProfiler(nextStub);

      profiler.handleNext(input, score);

      expect(nextStub.run).toHaveBeenCalledTimes(1);
      expect(nextStub.run).toHaveBeenCalledWith(input, score);
    });

    it('Should return give score input if class has no next attribute', () => {
      const input = { some: 'input' };
      const score = new Score();

      const result = profiler.handleNext(input, score);

      expect(result).toStrictEqual(score);
    });

  });
});
