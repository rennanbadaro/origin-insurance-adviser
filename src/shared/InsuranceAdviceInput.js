class InsuranceAdviceInput {
  constructor({
    age,
    dependents,
    house,
    income,
    marital_status,
    risk_questions,
    vehicle,
  }) {
    this.age = age;
    this.dependents = dependents;
    this.house = house;
    this.income = income;
    this.marital_status = marital_status;
    this.risk_questions = risk_questions;
    this.vehicle = vehicle;
  }
}

module.exports = InsuranceAdviceInput;
