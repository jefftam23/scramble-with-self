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

  text() {
    return this.$el.children()[0].innerHTML;
  }

  _setText(text) {
    this.$el.children()[0].innerHTML = text;
  }
}

module.exports = CurrentSelection;
