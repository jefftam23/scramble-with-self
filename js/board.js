const isEqual = require("lodash.isequal");
const LetterDistribution = require("./letterDistribution.js");

class Board {
  constructor(
    $el,
    currSelection,
    dict,
    submitWordCallback,
    alreadySubmittedCallback
  )
  {
    this.$el = $el;
    this.currSelection = currSelection;
    this.dict = dict;
    this.letterDist = new LetterDistribution;
    this.submitWordCallback = submitWordCallback;
    this.alreadySubmittedCallback = alreadySubmittedCallback;

    this.userSelecting = false;
    this.resetSelections();

    $("body")
      .on("mouseup mouseleave", this.handleWordSubmission.bind(this));

    this.handleTileMousedown = this.handleTileMousedown.bind(this);
    this.handleTileMouseenter = this.handleTileMouseenter.bind(this);

    this.setup();
  }

  addTileEventListeners() {
    const $tiles = $("#board li");

    $tiles
      .on("mousedown", this.handleTileMousedown)
      .on("mouseenter", this.handleTileMouseenter);
  }

  handleWordSubmission(e) {
    e.preventDefault();

    if (this.userSelecting) {
      this.userSelecting = false;
      // 'submit' this.letterSelections
      const word = this.letterSelections;

      if (!this.isValidWord(word)) {
        console.log("NOT VALID");
      } else if (this.alreadySubmittedCallback(word)) {
        console.log("Already submitted!");
      } else { // valid and not previously submitted
        this.submitWordCallback(word);
        console.log("VALID");
      }

      this.resetSelections();
    }
  }

  isValidWord(word) {
    return !!this.dict[word.toLowerCase()];
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

  randomizeBoard() {
    $("#board span").each((idx, span) => {
      $(span).html(this.letterDist.randomLetter());
    });
  }

  resetSelections() {
    this.posSelections = [];
    this.letterSelections = "";
    $("#board li").removeClass("selected");
    this.currSelection.receiveWord(this.letterSelections);
  }

  setup() {
    const $ul = $("<ul>");

    for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
      for (let colIdx = 0; colIdx < 4; colIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, colIdx]);
        let $span = $("<span class='noselect'></span>");
        $li.append($span);
        $ul.append($li);
      }
    }

    this.$el.append($ul);
    this.randomizeBoard();
    this.addTileEventListeners();
  }
}

module.exports = Board;
