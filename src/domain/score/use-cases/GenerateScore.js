class GenerateScore {
  constructor(params) {
    this.ProfilerChainFactory = params.ProfilerChainFactory;
  }

  run(adviceInput) {
    const profilerChain = this.ProfilerChainFactory.getChain();

    return profilerChain.run(adviceInput);
  }
}

module.exports = GenerateScore;
