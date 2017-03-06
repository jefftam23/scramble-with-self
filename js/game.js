const Board = require("./board.js");
const CurrentSelection = require("./currentSelection.js");
const LetterDistribution = require("./letterDistribution.js");
const Timer = require("./timer.js");

class Game {
  constructor() {
    $.ajax({
      method: "GET",
      url: "dict.txt"
    }).then( txt => {
      this.createDictionary(txt);
      this.timer = new Timer($("#timer span"), this.gameOver.bind(this));

      this.$scoreVal = $("#score span");
      this.$wordList = $("#submitted-words ul");
      this.reset();

      const currSelection = new CurrentSelection($("#current-selection"));
      this.letterDistribution = new LetterDistribution();

      this.createPlayButton();

      this.board = new Board(
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

  createPlayButton() {
    this.$playButton = $("<button>");
    this.$playButton.html("Start Game");
    $("#start-reset").append(this.$playButton);
    this.$playButton.click(this.handlePlayButtonClick.bind(this));
  }

  handlePlayButtonClick(e) {
    e.preventDefault();

    if (this.$playButton.html() === "Start Game") {
      console.log("Start the game");
      this.$playButton.html("Restart Game");

      this.start();
      this.board.randomizeBoard();
    } else {
      console.log("Restart the game");

      this.reset();
      this.board.randomizeBoard();
    }
  }

  gameOver() {
    this.$playButton.html("Start Game");
  }

  start() {
    this.reset();
    this.$playButton.html("Restart Game");
    this.timer.startTimer();
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
    // reset timer
    this.timer.resetTimer();

    // reset score
    this.score = 0;
    this.$scoreVal.html(this.score);

    // reset submitted words list
    this.submittedWords = [];
    this.$wordList.children().remove();
  }
 }

module.exports = Game;
