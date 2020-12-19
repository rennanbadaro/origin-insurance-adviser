class InsuranceAdvice {
  constructor({
    auto = 'ineligible',
    disability = 'ineligible',
    home = 'ineligible',
    life = 'ineligible',
  }) {
    this.auto = auto;
    this.disability = disability;
    this.home = home;
    this.life = life;
  }
}

module.exports = InsuranceAdvice;
