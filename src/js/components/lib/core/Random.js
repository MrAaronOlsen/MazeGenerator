class Random {

  static getRange(min, max) {
    return Math.random() * (max - min) + min
  }

  static get(max) {
    return Math.floor(Math.random() * max);
  }

  static flipCoin() {
    var side = this.get(2);

    return new Coin(side === 0);
  }
}

class Coin {
  constructor(heads) {
    this.heads = heads;
  }

  isHeads() {
    return this.heads === true;
  }

  isTails() {
    return this.heads === false;
  }
}

export default Random;