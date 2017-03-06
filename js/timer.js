class Timer {
  constructor($el, gameOverCallback) {
    this.$el = $el;
    this.gameOverCallback = gameOverCallback;
    this._setTime(5);
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
    this._setTime(5);
  }

  _countDown() {
    this._setTime(this.seconds - 1);

    if (this.seconds === 0) {
      clearInterval(this.interval);
      this.gameOverCallback();
      console.log("timer's up!");
    }
  }

  _setTime(seconds) {
    this.seconds = seconds;
    this.$el.html(seconds);
  }

}

module.exports = Timer;
