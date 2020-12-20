from src.shared.enums.house_ownership import HouseOwnershipEnum
from src.shared.enums.score import ScoreEnum


class HouseProfiler:
    def __init__(self, next=None):
        self.next = next

    def handle_next(self, risk_input, risk_result):
        if self.next is not None:
            return self.next.run(risk_input, risk_result)

        return risk_result

    def get_score_for_mortgaged(self, current_value):
        if current_value is ScoreEnum.INELIGIBLE:
            return current_value

        return current_value + 1

    def run(self, risk_input, risk_result):
        has_house = risk_input.get('house') is not None

        profiler_result = risk_result.copy()

        if not has_house:
            profiler_result['auto'] = None
            profiler_result['disability'] = None
            profiler_result['home'] = None

            return self.handle_next(risk_input, profiler_result)

        house_info = risk_input['house']

        is_valid_house_ownership_status = house_info['ownership_status'] in [
            HouseOwnershipEnum.OWNED.value,
            HouseOwnershipEnum.MORTGAGED.value,
        ]

        if not is_valid_house_ownership_status:
            raise Exception(f'invalid house ownership status {house_info["ownership_status"]}')

        if house_info['ownership_status'] == HouseOwnershipEnum.MORTGAGED.value:
            profiler_result['home'] = self.get_score_for_mortgaged(profiler_result['home'])
            profiler_result['disability'] = self.get_score_for_mortgaged(profiler_result['disability'])

        return self.handle_next(risk_input, profiler_result)
