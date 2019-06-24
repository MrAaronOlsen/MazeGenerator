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
    var index = array.length;
    var temp, random;
    var randArray = [].concat(array)

    while (index > 0) {
      random = this.get(index)
      index -= 1;

      temp = randArray[index];
      randArray[index] = randArray[random];
      randArray[random] = temp;
    }

    return randArray;
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