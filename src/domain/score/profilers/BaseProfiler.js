class BaseProfiler {
  constructor(nextProfiler = null) {
    this.next = nextProfiler;
  }

  handleNext(adviceInput, score) {
    if (this.next) {
      return this.next.run(adviceInput, score);
    }

    return score;
  }
}

module.exports = BaseProfiler;
