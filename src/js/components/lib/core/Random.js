class Random {

  static getRange(min, max) {
    return Math.random() * (max - min) + min
  }

  static get(max) {
    return Math.floor(Math.random() * max);
  }

  static flipCoin() {
    var side = this.get(2);

    return {
      heads: side === 0,
      tails: side === 1
    }
  }
}

export default Random;