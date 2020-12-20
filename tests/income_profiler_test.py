import unittest

from src.domain.insurance_advice.profilers.income_profiler import IncomeProfiler


class IncomeProfilerTest(unittest.TestCase):
    def setUp(self):
        """
        Test setup
        """
        self.sut = IncomeProfiler()
        self.base_input = {
            'age': 35,
            'dependents': 2,
            'house': None,
            'income': 100000,
            'marital_status': 'single',
            'risk_questions': [0, 1, 0],
            'vehicle': 0
        }
        self.base_result = {
            'auto': 3,
            'disability': 3,
            'home': 3,
            'life': 3
        }

    def test_zero_income(self):
        """
        Should set None for disability, auto and home insurance when income is 0 (zero)
        """
        input = self.base_input.copy()
        input['income'] = 0

        result = self.sut.run(input, self.base_result)

        self.assertEqual(result.get('disability'), None)
        self.assertEqual(result.get('auto'), None)
        self.assertEqual(result.get('home'), None)
        self.assertEqual(result.get('life'), self.base_result['life'])

    def test_none_income(self):
        """
        Should set None for disability, auto and home insurance when income is not provided
        """
        input = self.base_input.copy()
        input.pop('income')

        result = self.sut.run(input, self.base_result)

        self.assertTrue('disability' in result)
        self.assertTrue('auto' in result)
        self.assertTrue('home' in result)
        self.assertEqual(result.get('disability'), None)
        self.assertEqual(result.get('auto'), None)
        self.assertEqual(result.get('home'), None)
        self.assertEqual(result.get('life'), self.base_result['life'])

    def test_below_200k_income(self):
        """
        Should not modify the result if income is lower than 200k
        """
        input = self.base_input.copy()
        input['income'] = 100000

        result = self.sut.run(input, self.base_result)

        self.assertEqual(result.get('disability'),
                         self.base_result['disability'])
        self.assertEqual(result.get('auto'), self.base_result['auto'])
        self.assertEqual(result.get('home'), self.base_result['home'])
        self.assertEqual(result.get('life'), self.base_result['life'])

    def test_equal_200k_income(self):
        """
        Should not modify the result if income is equal 200k
        """
        input = self.base_input.copy()
        input['income'] = 200000

        result = self.sut.run(input, self.base_result)

        self.assertEqual(result.get('disability'),
                         self.base_result['disability'])
        self.assertEqual(result.get('auto'), self.base_result['auto'])
        self.assertEqual(result.get('home'), self.base_result['home'])
        self.assertEqual(result.get('life'), self.base_result['life'])

    def test_more_than_200k_income(self):
        """
        Should deduce 1 from all lines of insurance when income is bigger than 200k
        """
        input = self.base_input.copy()
        input['income'] = 200001

        result = self.sut.run(input, self.base_result)

        self.assertEqual(result.get('disability'),
                         self.base_result['disability'] - 1)
        self.assertEqual(result.get('auto'), self.base_result['auto'] - 1)
        self.assertEqual(result.get('home'), self.base_result['home'] - 1)
        self.assertEqual(result.get('life'), self.base_result['life'] - 1)

    def test_existing_none_result(self):
        """
        Should not modify the result if its keys are None even for income bigger than 200k
        """
        input = self.base_input.copy()
        input['income'] = 300000
        risk_result = {
            'auto': None,
            'disability': None,
            'home': None,
            'life': None
        }

        result = self.sut.run(input, risk_result)

        self.assertEqual(result.get('disability'), risk_result['disability'])
        self.assertEqual(result.get('auto'), risk_result['auto'])
        self.assertEqual(result.get('home'), risk_result['home'])
        self.assertEqual(result.get('life'), risk_result['life'])
