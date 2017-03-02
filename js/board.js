class Board {
  constructor($el) {
    this.$el = $el;
    this.userSelecting = false;
    this.posSelections = [];
    this.letterSelections = "";

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
      console.log(this.letterSelections);
      this.resetSelections();
    }
  }

  handleTileMousedown(e) {
    e.preventDefault();
    this.userSelecting = true;
    this.posSelections.push($(e.currentTarget).data().pos);
    this.letterSelections += e.currentTarget.children[0].innerHTML;
  }

  handleTileMouseenter(e) {
    e.preventDefault();
    // if:
    //  1) this.userSelecting === true
    //  2) not previously selected AND
    //  3) adjacent to previous selection AND
    // then:
    //  push tile pos onto this.posSelections

    if (this.userSelecting) {
      this.posSelections.push($(e.currentTarget).data().pos);
      this.letterSelections += e.currentTarget.children[0].innerHTML;
    }
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
