const isEqual = require("lodash.isequal");

class Board {
  constructor($el) {
    this.$el = $el;
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
      console.log(`SUBMIT: ${this.letterSelections}`);
      this.resetSelections();
    }
  }

  handleTileMousedown(e) {
    e.preventDefault();
    this.userSelecting = true;
    this.updateSelections($(e.currentTarget));

    console.log(this.letterSelections);
  }

  handleTileMouseenter(e) {
    e.preventDefault();
    // if:
    //  1) this.userSelecting === true AND
    //  2) not previously selected AND
    //  3) adjacent to previous selection
    // then:
    //  push tile pos onto this.posSelections
    const $tile = $(e.currentTarget);

    if (this.userSelecting && !this.previouslySelected($tile)) {
      this.updateSelections($tile);

      console.log(this.letterSelections);
    }
   }

  updateSelections($tile) {
    this.posSelections.push($tile.data().pos);
    this.letterSelections += $tile.children()[0].innerHTML;
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

  randomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.charAt(Math.floor(Math.random() * 26));
  }

  randomizeBoard() {
    $("#board span").each((idx, span) => {
      $(span).html(this.randomLetter());
    });
  }

  resetSelections() {
    this.posSelections = [];
    this.letterSelections = "";
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
