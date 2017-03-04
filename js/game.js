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
      this.dict = { "the": true, "as": true };
      this.$scoreVal = $("#score span");
      this.$wordList = $("#submitted-words ul");
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

    }).catch(() => console.log("dictionary not loaded"));
  }

  addToScore(score) {
    this.score += score;
    this.$scoreVal.html(this.score);
  }

  processWord(word) {
    this.submittedWords.push(word);
    this.$wordList.append($(`<li>${ word }</li>`));
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
    this.score = 0;
    this.$scoreVal.html(this.score);
    this.submittedWords = [];
    this.$wordList.children().remove();
  }
 }

module.exports = Game;
