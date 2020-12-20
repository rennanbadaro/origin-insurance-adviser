import unittest

from src.domain.insurance_advice.profilers.house_profiler import HouseProfiler
from src.shared.enums.house_ownership import HouseOwnershipEnum


class HouseProfilerTest(unittest.TestCase):
    def setUp(self):
        """
        Test setup
        """
        self.sut = HouseProfiler()
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

    def test_no_house(self):
        """
        Should set None for disability, auto and home insurance when user house is None
        """
        input = self.base_input.copy()
        input['house'] = None

        result = self.sut.run(input, self.base_result)

        self.assertEqual(result.get('disability'), None)
        self.assertEqual(result.get('auto'), None)
        self.assertEqual(result.get('home'), None)
        self.assertEqual(result.get('life'), self.base_result['life'])

    def test_owned_house(self):
        """
        Should not modify the result if the house is owned
        """
        input = self.base_input.copy()
        input['house'] = {'ownership_status': HouseOwnershipEnum.OWNED.value}

        result = self.sut.run(input, self.base_result)

        self.assertEqual(result.get('disability'), self.base_result['disability'])
        self.assertEqual(result.get('auto'), self.base_result['auto'])
        self.assertEqual(result.get('home'), self.base_result['home'])
        self.assertEqual(result.get('life'), self.base_result['life'])

    def test_morgaged_house(self):
        """
        Should increase one to house and disability lines if house is mortgaged
        """
        input = self.base_input.copy()
        input['house'] = {'ownership_status': HouseOwnershipEnum.MORTGAGED.value}

        result = self.sut.run(input, self.base_result)

        self.assertEqual(result.get('disability'), self.base_result['disability'] + 1)
        self.assertEqual(result.get('home'), self.base_result['home'] + 1)
        self.assertEqual(result.get('auto'), self.base_result['auto'])
        self.assertEqual(result.get('life'), self.base_result['life'])

    def test_invalid_ownership_status(self):
        """
        Should raise exception if ownership provided is invalid
        """
        input = self.base_input.copy()
        input['house'] = {'ownership_status': 'somethin_invalid'}

        with self.assertRaises(Exception) as context_manager:
            self.sut.run(input, self.base_result)

        excep = context_manager.exception
        self.assertEqual(str(excep), 'invalid house ownership status somethin_invalid')
