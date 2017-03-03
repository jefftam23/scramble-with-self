const Board = require("./board.js");
const CurrentSelection = require("./currentSelection.js");
const LetterDistribution = require("./letterDistribution.js");

class Game {
  constructor() {
    $.ajax({
      method: "GET",
      url: "dict.txt"
    }).then( txt => {
      this.createDictionary(txt);
      this.submittedWords = [];

      const currSelection = new CurrentSelection($("#current-selection"));
      const letterDistribution = new LetterDistribution();

      new Board(
        $("#board"),
        currSelection,
        this.dict,
        this.processWord.bind(this),
        this.alreadySubmitted.bind(this)
      );

    });
  }

  processWord(word) {
    this.submittedWords.push(word);
    // score the word and add that score to score
  }

  createDictionary(txt) {
    const words = txt.split("\n");
    words.pop(); // get rid of empty string entry
    this.dict = {};
    words.forEach(word => { this.dict[word] = true; });
  }

  alreadySubmitted(word) {
    return this.submittedWords.includes(word);
  }
}

module.exports = Game;
