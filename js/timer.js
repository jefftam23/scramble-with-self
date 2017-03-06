class Timer {
  constructor($el, gameOverCallback) {
    this.$el = $el;
    this.gameOverCallback = gameOverCallback;
    this._setTime(5);
  }

  startTimer() {
    this.resetTimer();

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(this._decrementToZero.bind(this), 1000);
  }

  resetTimer() {
    this._setTime(5);
  }

  _decrementToZero() {
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
