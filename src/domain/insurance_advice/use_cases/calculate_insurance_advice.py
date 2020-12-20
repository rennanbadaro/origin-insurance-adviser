from functools import reduce

from src.domain.insurance_advice.factories import profiler_chain_factory as default_profiler_chain_factory


class CalculateInsuranceAdvice:
    def __init__(self, profiler_chain_factory=default_profiler_chain_factory):
        self.chain_factory = profiler_chain_factory

    def process_score(self, score_result):
        insurance_advice = score_result.copy()

        def reducer(accumulator, current):
            value = insurance_advice[current]

            if value is None:
                accumulator[current] = 'ineligible'

                return accumulator

            if value <= 0:
                accumulator[current] = 'economic'

            if value == 1 or value == 2:
                accumulator[current] = 'regular'

            if value >= 3:
                accumulator[current] = 'responsible'

            return accumulator

        return reduce(reducer, insurance_advice.keys(), insurance_advice)

    def run(self, risk_input):
        base_score = {
            'auto': 0,
            'disability': 0,
            'home': 0,
            'life': 0,
        }

        profiler_chain = self.chain_factory.get_profiler_chain()

        risk_score = profiler_chain.run(risk_input, base_score)

        return self.process_score(risk_score)
