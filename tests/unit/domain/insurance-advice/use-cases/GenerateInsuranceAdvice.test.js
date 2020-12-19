const GenerateInsuranceAdvice = require('src/domain/insurance-advice/use-cases/GenerateInsuranceAdvice');
const UnprocessableScoreValueError = require('src/shared/errors/UnprocessableScoreValueError');
const InsuranceAdvice = require('src/domain/insurance-advice/InsuranceAdvice');
const Score = require('src/domain/score/Score');

const InsurancePlanEnum = require('src/shared/enums/InsurancePlan');

let useCase;
let generateScoreUseCaseMock;

const adviceInputMock = {
  age: 35,
  dependents: 0,
  house: null,
  income: 100000,
  marital_status: 'single',
  risk_questions: [0, 1, 0],
  vehicle: null,
};

describe('GenerateInsuranceAdvice', () => {
  beforeEach(() => {
    generateScoreUseCaseMock = {};
    useCase = new GenerateInsuranceAdvice({
      generateScoreUseCase: generateScoreUseCaseMock,
    });
  });
  describe('.run', () => {
    it('Should return "economic" plan if score is less than zero', () => {
      const scoreResultMock = new Score({
        auto: -1,
        disability: -1,
        home: -1,
        life: -1,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      const adviceResult = useCase.run(adviceInputMock);

      const expectedAdvice = new InsuranceAdvice({
        disability: InsurancePlanEnum.ECONOMIC,
        auto: InsurancePlanEnum.ECONOMIC,
        home: InsurancePlanEnum.ECONOMIC,
        life: InsurancePlanEnum.ECONOMIC,
      });

      expect(adviceResult).toStrictEqual(expectedAdvice);

      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);
    });

    it('Should return "economic" plan if score is less than zero', () => {
      const scoreResultMock = new Score({
        auto: 0,
        disability: 0,
        home: 0,
        life: 0,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      const adviceResult = useCase.run(adviceInputMock);

      const expectedAdvice = new InsuranceAdvice({
        disability: InsurancePlanEnum.ECONOMIC,
        auto: InsurancePlanEnum.ECONOMIC,
        home: InsurancePlanEnum.ECONOMIC,
        life: InsurancePlanEnum.ECONOMIC,
      });

      expect(adviceResult).toStrictEqual(expectedAdvice);

      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);
    });

    it('Should return "ilegibile" if score is null', () => {
      const scoreResultMock = new Score({
        auto: null,
        disability: null,
        home: null,
        life: null,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      const adviceResult = useCase.run(adviceInputMock);

      const expectedAdvice = new InsuranceAdvice({
        disability: InsurancePlanEnum.ILEGIBILE,
        auto: InsurancePlanEnum.ILEGIBILE,
        home: InsurancePlanEnum.ILEGIBILE,
        life: InsurancePlanEnum.ILEGIBILE,
      });

      expect(adviceResult).toStrictEqual(expectedAdvice);

      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);

    });

    it('Should return "regular" plan if score is equal to 1', () => {
      const scoreResultMock = new Score({
        auto: 1,
        disability: 1,
        home: 1,
        life: 1,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      const adviceResult = useCase.run(adviceInputMock);

      const expectedAdvice = new InsuranceAdvice({
        disability: InsurancePlanEnum.REGULAR,
        auto: InsurancePlanEnum.REGULAR,
        home: InsurancePlanEnum.REGULAR,
        life: InsurancePlanEnum.REGULAR,
      });

      expect(adviceResult).toStrictEqual(expectedAdvice);

      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);
    });

    it('Should return "responsible" plan if score is equal to 3', () => {
      const scoreResultMock = new Score({
        auto: 3,
        disability: 3,
        home: 3,
        life: 3,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      const adviceResult = useCase.run(adviceInputMock);

      const expectedAdvice = new InsuranceAdvice({
        disability: InsurancePlanEnum.RESPONSIBLE,
        auto: InsurancePlanEnum.RESPONSIBLE,
        home: InsurancePlanEnum.RESPONSIBLE,
        life: InsurancePlanEnum.RESPONSIBLE,
      });

      expect(adviceResult).toStrictEqual(expectedAdvice);

      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);
    });

    it('Should return "responsible" plan if score is higher than 3', () => {
      const scoreResultMock = new Score({
        auto: 99,
        disability: 99,
        home: 99,
        life: 99,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      const adviceResult = useCase.run(adviceInputMock);

      const expectedAdvice = new InsuranceAdvice({
        disability: InsurancePlanEnum.RESPONSIBLE,
        auto: InsurancePlanEnum.RESPONSIBLE,
        home: InsurancePlanEnum.RESPONSIBLE,
        life: InsurancePlanEnum.RESPONSIBLE,
      });

      expect(adviceResult).toStrictEqual(expectedAdvice);

      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);
    });

    it('Should return "regular" plan if score is equal to 2', () => {
      const scoreResultMock = new Score({
        auto: 2,
        disability: 2,
        home: 2,
        life: 2,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      const adviceResult = useCase.run(adviceInputMock);

      const expectedAdvice = new InsuranceAdvice({
        disability: InsurancePlanEnum.REGULAR,
        auto: InsurancePlanEnum.REGULAR,
        home: InsurancePlanEnum.REGULAR,
        life: InsurancePlanEnum.REGULAR,
      });

      expect(adviceResult).toStrictEqual(expectedAdvice);

      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);
    });

    it('Should throw if score is invalid', () => {
      const scoreResultMock = new Score({
        auto: NaN,
        disability: NaN,
        home: NaN,
        life: NaN,
      });

      generateScoreUseCaseMock.run = jest.fn().mockReturnValue(scoreResultMock);

      let receivedErr;

      try {
        useCase.run(adviceInputMock);
      } catch (err) {
        receivedErr = err;
      }

      expect(receivedErr).toBeDefined();
      expect(receivedErr).toStrictEqual(new UnprocessableScoreValueError(NaN));
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledTimes(1);
      expect(generateScoreUseCaseMock.run).toHaveBeenCalledWith(adviceInputMock);
    });
  });
});
