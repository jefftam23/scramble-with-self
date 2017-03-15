const Board = require("./board.js");
const CurrentSelection = require("./currentSelection.js");
const LetterDistribution = require("./letterDistribution.js");
const Timer = require("./timer.js");

class Game {
  constructor() {
    $.ajax({
      method: "GET",
      url: "assets/dict.txt"
    }).then( txt => {
      this.createDictionary(txt);
      this.timer = new Timer($("#timer span"), this.gameOver.bind(this));

      this.$scoreVal = $("#score span");
      this.$wordList = $("#submitted-words ul");
      this.reset();

      this.currSelection = new CurrentSelection($("#current-selection"));
      this.letterDistribution = new LetterDistribution();

      this.createPlayButton();

      this.board = new Board(
        $("#board"),
        this.currSelection,
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

  createPlayButton() {
    this.$playButton = $("<button>");
    this.$playButton.html("Start");
    $("#start-reset").append(this.$playButton);
    this.$playButton.click(this.handlePlayButtonClick.bind(this));
  }

  handlePlayButtonClick(e) {
    e.preventDefault();

    if (this.$playButton.html() === "Start") {
      this.$playButton.html("Restart");
      this.start();
    } else {
      this.restart();
    }
  }

  gameOver() {
    this.timer.stop();
    this.board.deactivateBoard();
    $("#board li").removeClass();
    this.currSelection.clear();
    this.$playButton.html("Start");
  }

  start() {
    this.board.activateBoard();
    this.board.randomizeBoard();
    this._resetScore();
    this._resetSubmittedWords();
    this.$playButton.html("Restart");
    this.timer.start();
  }

  restart() {
    this.timer.stop();
    this.board.randomizeBoard();
    this._resetScore();
    this._resetSubmittedWords();
    this.timer.start();
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
    this.timer.reset();
    this._resetScore();
    this._resetSubmittedWords();
  }

  _resetScore() {
    this.score = 0;
    this.$scoreVal.html(0);
  }

  _resetSubmittedWords() {
    this.submittedWords = [];
    this.$wordList.children().remove();
  }
 }

module.exports = Game;
