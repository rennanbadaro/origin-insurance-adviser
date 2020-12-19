const GenerateScore = require('src/domain/score/use-cases/GenerateScore');

let useCase;
let chainRunMock;
let getChainMock;
let ProfilerChainFactoryMock;

const adviceInput = {
  age: 35,
  dependents: 0,
  house: null,
  income: 100000,
  marital_status: 'single',
  risk_questions: [0, 1, 0],
  vehicle: null,
};

describe('GenerateScore', () => {
  beforeEach(() => {
    chainRunMock = jest.fn().mockReturnValue({ some: 'score' });
    getChainMock = jest.fn().mockReturnValue({ run: chainRunMock });
    ProfilerChainFactoryMock = { getChain: getChainMock };

    useCase = new GenerateScore({
      ProfilerChainFactory: ProfilerChainFactoryMock,
    });
  });

  describe('.run', () => {
    it('Should call profiler chain with the given input returning its result', () => {
      const result = useCase.run(adviceInput);

      expect(result).toStrictEqual({ some: 'score' });
      expect(getChainMock).toHaveBeenCalledTimes(1);
      expect(chainRunMock).toHaveBeenCalledTimes(1);
    });
  });
});
