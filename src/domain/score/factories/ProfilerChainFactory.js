const RiskQuizProfiler = require('../profilers/RiskQuizProfiler');
const IncomeProfiler = require('../profilers/IncomeProfiler');
const HouseProfiler = require('../profilers/HouseProfiler');
const VehicleProfiler = require('../profilers/VehicleProfiler');
const AgeProfiler = require('../profilers/AgeProfiler');

class ProfilerChainFactory {
  static getChain(profilerChain = 'default') {
    const availableChains = {
      default: [
        RiskQuizProfiler,
        VehicleProfiler,
        IncomeProfiler,
        HouseProfiler,
        AgeProfiler,
      ],
    };

    const chainNodes = availableChains[profilerChain];

    const TailNode = chainNodes.pop();

    let chain = new TailNode();

    chainNodes.reverse().forEach(Node => {
      chain = new Node(chain);
    });

    return chain;
  }
}

module.exports = ProfilerChainFactory;
