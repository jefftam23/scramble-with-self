class CurrentSelection {
  constructor($el) {
    this.$el = $el;
    this.$el.append($("<span>"));
  }

  receiveWord(word) {
    this.$el.children()[0].innerHTML = word;
  }
}

module.exports = CurrentSelection;
