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
      this.$scoreVal = $("#score span");
      this.reset();

      const currSelection = new CurrentSelection($("#current-selection"));
      this.letterDistribution = new LetterDistribution();

      new Board(
        $("#board"),
        currSelection,
        this.dict,
        this.processWord.bind(this),
        this.alreadySubmitted.bind(this)
      );

    });
  }

  addToScore(score) {
    this.score += score;
    this.$scoreVal.html(this.score);
  }

  processWord(word) {
    this.submittedWords.push(word);
    const score = this.letterDistribution.wordScore(word);
    this.addToScore(score);
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

  reset(){
    this.submittedWords = [];
    this.score = 0;
    this.$scoreVal.html(this.score);
  }
 }

module.exports = Game;
