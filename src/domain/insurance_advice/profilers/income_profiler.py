class IncomeProfiler:
    """
    Income specialized profiler
    """

    def __init__(self, next=None):
        self.next = next

        self.top_level_income = 200000
        self.deduction_for_top_level_income = 1

    def handle_next(self, risk_input, risk_result):
        if self.next is not None:
            return self.next.run(risk_input, risk_result)

        return risk_result

    def calculate_deduction(self, current_value):
        if current_value is not None:
            return current_value - self.deduction_for_top_level_income

        return current_value

    def run(self, risk_input, risk_result):
        has_income = risk_input.get('income') and risk_input['income'] > 0

        profiler_result = risk_result.copy()

        if not has_income:
            profiler_result['auto'] = None
            profiler_result['disability'] = None
            profiler_result['home'] = None

            return self.handle_next(risk_input, profiler_result)

        can_deduct = risk_input['income'] > self.top_level_income

        if can_deduct:
            profiler_result['auto'] = self.calculate_deduction(profiler_result['auto'])
            profiler_result['disability'] = self.calculate_deduction(profiler_result['disability'])
            profiler_result['home'] = self.calculate_deduction(profiler_result['home'])
            profiler_result['life'] = self.calculate_deduction(profiler_result['life'])

            return self.handle_next(risk_input, profiler_result)

        return self.handle_next(risk_input, profiler_result)
