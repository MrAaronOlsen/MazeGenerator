class Random {

  static getRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static get(max) {
    return Math.floor(Math.random() * max);
  }

  static flipCoin() {
    var side = this.get(2);

    return new Coin(side === 0);
  }

  static shuffle(array) {
    return this.shuffleMutate([].concat(array))
  }

  static shuffleMutate(array) {
    var index = array.length;
    var tempStorage;
    var randomIndex;

    while (index > 0) {
      randomIndex = this.get(index)
      index -= 1;

      tempStorage = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = tempStorage;
    }

    return array;
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