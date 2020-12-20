from src.shared.enums.house_ownership import HouseOwnershipEnum
from src.shared.enums.score import ScoreEnum


class HouseProfiler:
    def get_score_for_morgaged(self, current_value):
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

            return profiler_result

        house_info = risk_input['house']

        is_valid_house_ownership_status = house_info['ownership_status'] in [
            HouseOwnershipEnum.OWNED,
            HouseOwnershipEnum.MORTGAGED,
        ]

        if not is_valid_house_ownership_status:
            raise Exception(f'invalid house ownership status {house_info["ownership_status"]}')

        if house_info['ownership_status'] == HouseOwnershipEnum.MORTGAGED:
            profiler_result['home'] = self.get_score_for_morgaged(profiler_result['home'])
            profiler_result['disability'] = self.get_score_for_morgaged(profiler_result['disability'])

        return profiler_result
