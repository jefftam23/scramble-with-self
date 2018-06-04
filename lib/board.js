const isEqual = require("lodash.isequal");
const LetterDistribution = require("./letterDistribution.js");

class Board {
  constructor(
    $el,
    currSelection,
    isValidWord,
    submitWordCallback,
    alreadySubmittedCallback
  )
  {
    this.$el = $el;
    this.currSelection = currSelection;
    this.isValidWord = isValidWord;
    this.letterDist = new LetterDistribution;
    this.submitWordCallback = submitWordCallback;
    this.alreadySubmittedCallback = alreadySubmittedCallback;

    this.userSelecting = false;
    this.resetSelections();

    this.handleTileMousedown = this.handleTileMousedown.bind(this);
    this.handleTileMouseenter = this.handleTileMouseenter.bind(this);

    this.setup();
  }

  activateBoard() {
    $("#board li")
      .on("mousedown", this.handleTileMousedown)
      .on("mouseenter", this.handleTileMouseenter);

    $("body")
      .on("mouseup mouseleave", this.handleWordSubmission.bind(this));
  }

  deactivateBoard() {
    $("#board li").off();
    $("body").off();
  }

  handleWordSubmission(e) {
    e.preventDefault();

    if (this.userSelecting) {
      this.userSelecting = false;
      const word = this.letterSelections;
      const $selectedTiles = $("#board li.selected");

      if (!this.isValidWord(word)) {
        $selectedTiles.addClass("invalid");
        setTimeout(() => {
          $selectedTiles.removeClass("invalid");
        },300);
      } else if (this.alreadySubmittedCallback(word)) {

        $selectedTiles.addClass("already-submitted");
        setTimeout(() => {
          $selectedTiles.removeClass("already-submitted");
        },300);
      } else { // valid and not previously submitted
        this.submitWordCallback(word);

        $selectedTiles.addClass("valid");
        setTimeout(() => {
          $selectedTiles.removeClass("valid");
        },300);
      }

      this.resetSelections();
    }
  }

  handleTileMousedown(e) {
    e.preventDefault();
    this.userSelecting = true;
    this.updateSelections($(e.currentTarget));
  }

  handleTileMouseenter(e) {
    e.preventDefault();

    const $tile = $(e.currentTarget);
    if (this.isValidSelection($tile)) {
      this.updateSelections($tile);
    }
  }

  isValidSelection($tile) {
    const prevPos = this.posSelections[this.posSelections.length - 1];

    return this.userSelecting &&
      !this.previouslySelected($tile) &&
      this.isAdjacent($tile.data().pos, prevPos);
  }

  isAdjacent(pos1, pos2) {
    const adjacentPositions1 = this.adjacentPositions(pos1);
    for (let i = 0; i < adjacentPositions1.length; i++) {
      if (isEqual(adjacentPositions1[i], pos2)) {
        return true;
      }
    }

    return false;
  }

  isInBounds(pos) {
    return pos[0] >= 0 &&
           pos[0] <= 3 &&
           pos[1] >= 0 &&
           pos[1] <= 3;
  }

  adjacentPositions(pos) {
    // includes invalid (off the board) positions, for now
    const adjacentDeltas = [
      [-1, -1],
      [-1,  0],
      [-1,  1],
      [ 0,  1],
      [ 0, -1],
      [ 1, -1],
      [ 1,  0],
      [ 1,  1]
    ];

     return adjacentDeltas.map(delta => {
      return [pos[0] + delta[0], pos[1] + delta[1]];
    });
  }

  updateSelections($tile) {
    this.posSelections.push($tile.data().pos);
    this.letterSelections += $tile.children()[0].innerHTML;
    $tile.addClass("selected");
    this.currSelection.receiveWord(this.letterSelections);
  }

  previouslySelected($tile) {
    for (let i = 0; i < this.posSelections.length; i++) {
      let prevPos = this.posSelections[i];
      if (isEqual($tile.data().pos, prevPos)) {
        return true;
      }
    }

    return false;
  }

  presentationalizeBoard() {
    const letters = "SCRAELBMWITHSELF".split("");
    const values = letters.map(letter => this.letterDist.value(letter));
    Array.from($("#board ul li")).forEach(tile => {
      $(tile).find(".letter").html(letters.shift());
      $(tile).find(".weight").html(values.shift());
    });
  }

  randomizeBoard() {
    const boardLetters = this.letterDist.getBoardLetters();
    let counter = 0;

    $("#board li").each((idx, li) => {
      const letter = boardLetters[counter];
      counter++;
      $(li).find(".letter").html(letter);
      $(li).find(".weight").html(this.letterDist.value(letter));
    });
  }

  resetSelections() {
    this.posSelections = [];
    this.letterSelections = "";
    $("#board li").removeClass("selected");
    this.currSelection.clear();
  }

  setup() {
    const $ul = $("<ul>");

    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 0; colIdx < 4; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        $li.append($("<span class='noselect letter'></span>"));
        $li.append($("<span class='noselect weight'></span>"));
        $ul.append($li);
      }
    }

    this.$el.append($ul);
    this.randomizeBoard();
  }
}

module.exports = Board;
