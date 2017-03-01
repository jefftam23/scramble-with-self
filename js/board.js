class Board {
  constructor($el) {
    this.$el = $el;

    this.setup();
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
  }
}

module.exports = Board;
