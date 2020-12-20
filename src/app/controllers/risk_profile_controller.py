from flask import Flask, request
from flask_restful import Resource, Api

from src.domain.insurance_advice.use_cases.calculate_insurance_advice import CalculateInsuranceAdvice


class RiskProfilerController(Resource):
    def post(self):
        use_case = CalculateInsuranceAdvice()

        result = use_case.run({
            'age': 35,
            'dependents': 2,
            'house': None,
            'income': 500000,
            'marital_status': 'single',
            'risk_questions': [0, 1, 0],
            'vehicle': 0
        })

        return result
