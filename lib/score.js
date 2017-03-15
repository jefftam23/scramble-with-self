class Score {
  constructor($el) {
    this.score = 0;
    $el.html(`SCORE: <span>${this.score}</span>`);
  }

  add(val) {
    this.score += val;
    this.updateView();
  }

  updateView() {
    $("#score span").html(this.score);
  }
}

module.exports = Score;
