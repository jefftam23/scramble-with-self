class Timer {
  constructor($el, gameOverCallback) {
    this.$el = $el;
    this.gameOverCallback = gameOverCallback;
    this._setTime(60);
  }

  start() {
    this.reset();

    if (this.interval) {
      this.stop();
    }

    this.interval = setInterval(this._countDown.bind(this), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    this._setTime(60);
    $("#timer").removeClass("red");
  }

  _countDown() {
    this._setTime(this.seconds - 1);

    if (this.seconds <= 10) {
      $("#timer").addClass("red");
    }

    if (this.seconds === 0) {
      clearInterval(this.interval);
      this.gameOverCallback();
    }
  }

  _setTime(seconds) {
    this.seconds = seconds;
    this.$el.html(seconds);
  }

}

module.exports = Timer;
