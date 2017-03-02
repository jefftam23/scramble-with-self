const LETTER_DATA = {
  "E": {
    freq: 12,
    val: 1,
  },

  "A": {
    freq: 9,
    val: 1,
  },

  "I": {
    freq: 9,
    val: 1,
  },

  "O": {
    freq: 8,
    val: 1,
  },

  "N": {
    freq: 6,
    val: 1,
  },

  "R": {
    freq: 6,
    val: 1,
  },

  "T": {
    freq: 6,
    val: 1,
  },

  "L": {
    freq: 4,
    val: 1,
  },

  "S": {
    freq: 4,
    val: 1,
  },

  "U": {
    freq: 4,
    val: 1,
  },

  "D": {
    freq: 4,
    val: 2,
  },

  "G": {
    freq: 3,
    val: 2,
  },

  "B": {
    freq: 2,
    val: 3,
  },

  "C": {
    freq: 2,
    val: 3,
  },

  "M": {
    freq: 2,
    val: 3,
  },

  "P": {
    freq: 2,
    val: 3,
  },

  "F": {
    freq: 2,
    val: 4,
  },

  "H": {
    freq: 2,
    val: 4,
  },

  "V": {
    freq: 2,
    val: 4,
  },

  "W": {
    freq: 2,
    val: 4,
  },

  "Y": {
    freq: 2,
    val: 4,
  },

  "K": {
    freq: 1,
    val: 5,
  },

  "J": {
    freq: 1,
    val: 8,
  },

  "X": {
    freq: 1,
    val: 8,
  },

  "Q": {
    freq: 1,
    val: 10,
  },

  "Z": {
    freq: 1,
    val: 10,
  },
};

class LetterDistribution {
  constructor() {
    this.letters = [];

    this._populateLetters();
  }

  randomLetter() {
    const randIdx = Math.floor(Math.random() * this.letters.length);
    return this.letters[randIdx];
  }

  _populateLetters() {
    Object.keys(LETTER_DATA).forEach(letter => {
      for (let i = 0; i < LETTER_DATA[letter].freq; i++) {
        this.letters.push(letter);
      }
    });
  }
}

module.exports = LetterDistribution;
