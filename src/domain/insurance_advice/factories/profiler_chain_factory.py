from src.domain.insurance_advice.profilers.house_profiler import HouseProfiler
from src.domain.insurance_advice.profilers.income_profiler import IncomeProfiler


def _get_nodes_by_chain(chain):
    available_chains = {
        'default': [HouseProfiler, IncomeProfiler]
    }

    return available_chains[chain]


def get_profiler_chain(profiler_chain='default'):
    chain_nodes = _get_nodes_by_chain(profiler_chain)

    TailNode = chain_nodes.pop()
    chain = TailNode()

    for Profiler in chain_nodes:
        chain = Profiler(chain)

    return chain
