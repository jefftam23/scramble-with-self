class CurrentSelection {
  constructor($el) {
    this.$el = $el;
    this.$el.append($("<span>"));
  }

  clear() {
    this._setText("");
  }

  receiveWord(word) {
    this._setText(word);
  }

  _setText(text) {
    this.$el.children()[0].innerHTML = text;
  }
}

module.exports = CurrentSelection;
