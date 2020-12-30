const axios = require('axios').default;

const InsurancePlanEnum = require('../../src/shared/enums/InsurancePlan');
const MaritalStatusEnum = require('../../src/shared/enums/MaritalStatus');
const HouseOwnershipStatusEnum = require('../../src/shared/enums/HouseOwnershipStatus');

const request = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`,
  timeout: 2000,
});

describe('InsuranceAdvice', () => {
  describe('Should get the expected response for the given input', () => {
    test('Zero income', async () => {
      const input = {
        age: 35,
        dependents: 2,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 0,
        marital_status: MaritalStatusEnum.MARRIED,
        risk_questions: [0, 1, 0],
        vehicle: { year: new Date().getFullYear() - 1 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.INELIGIBLE,
        home: InsurancePlanEnum.INELIGIBLE,
        disability: InsurancePlanEnum.INELIGIBLE,
        life: InsurancePlanEnum.REGULAR,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('No house', async () => {
      const input = {
        age: 25,
        dependents: 0,
        house: null,
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: { year: new Date().getFullYear() - 1 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.INELIGIBLE,
        home: InsurancePlanEnum.INELIGIBLE,
        disability: InsurancePlanEnum.INELIGIBLE,
        life: InsurancePlanEnum.REGULAR,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('No vehicle', async () => {
      const input = {
        age: 25,
        dependents: 0,
        house: null,
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: null,
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.INELIGIBLE,
        home: InsurancePlanEnum.INELIGIBLE,
        disability: InsurancePlanEnum.INELIGIBLE,
        life: InsurancePlanEnum.REGULAR,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('Over 60 years old', async () => {
      const input = {
        age: 70,
        dependents: 0,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: { year: new Date().getFullYear() - 10 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.RESPONSIBLE,
        home: InsurancePlanEnum.RESPONSIBLE,
        disability: InsurancePlanEnum.INELIGIBLE,
        life: InsurancePlanEnum.INELIGIBLE,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('Under 30 years old', async () => {
      const input = {
        age: 25,
        dependents: 0,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: { year: new Date().getFullYear() - 10 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.REGULAR,
        home: InsurancePlanEnum.REGULAR,
        disability: InsurancePlanEnum.REGULAR,
        life: InsurancePlanEnum.REGULAR,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('Between 30 and 40 years old', async () => {
      const input = {
        age: 35,
        dependents: 0,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: { year: new Date().getFullYear() - 10 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.REGULAR,
        home: InsurancePlanEnum.REGULAR,
        disability: InsurancePlanEnum.REGULAR,
        life: InsurancePlanEnum.REGULAR,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('Income above 200k', async () => {
      const input = {
        age: 45,
        dependents: 0,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 200001,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: { year: new Date().getFullYear() - 10 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.REGULAR,
        home: InsurancePlanEnum.REGULAR,
        disability: InsurancePlanEnum.REGULAR,
        life: InsurancePlanEnum.REGULAR,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('House is mortgaged', async () => {
      const input = {
        age: 45,
        dependents: 0,
        house: { ownership_status: HouseOwnershipStatusEnum.MORTGAGED },
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: { year: new Date().getFullYear() - 10 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.RESPONSIBLE,
        home: InsurancePlanEnum.RESPONSIBLE,
        disability: InsurancePlanEnum.RESPONSIBLE,
        life: InsurancePlanEnum.RESPONSIBLE,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('Has dependents', async () => {
      const input = {
        age: 45,
        dependents: 1,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [1, 1, 1],
        vehicle: { year: new Date().getFullYear() - 10 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.RESPONSIBLE,
        home: InsurancePlanEnum.RESPONSIBLE,
        disability: InsurancePlanEnum.RESPONSIBLE,
        life: InsurancePlanEnum.RESPONSIBLE,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('User is married', async () => {
      const input = {
        age: 45,
        dependents: 0,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 100000,
        marital_status: MaritalStatusEnum.MARRIED,
        risk_questions: [0, 0, 0],
        vehicle: { year: new Date().getFullYear() - 10 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.ECONOMIC,
        home: InsurancePlanEnum.ECONOMIC,
        disability: InsurancePlanEnum.ECONOMIC,
        life: InsurancePlanEnum.REGULAR,
      };

      expect(response).toEqual(expectedResponse);
    });

    test('Vehicle produced in the last 5 years', async () => {
      const input = {
        age: 45,
        dependents: 0,
        house: { ownership_status: HouseOwnershipStatusEnum.OWNED },
        income: 100000,
        marital_status: MaritalStatusEnum.SINGLE,
        risk_questions: [0, 0, 0],
        vehicle: { year: new Date().getFullYear() - 2 },
      };

      const { data: response } = await request
        .post('/insurance-advice', input)
        .catch(err => console.error(err));

      const expectedResponse = {
        auto: InsurancePlanEnum.REGULAR,
        home: InsurancePlanEnum.ECONOMIC,
        disability: InsurancePlanEnum.ECONOMIC,
        life: InsurancePlanEnum.ECONOMIC,
      };

      expect(response).toEqual(expectedResponse);
    });
  });
});
