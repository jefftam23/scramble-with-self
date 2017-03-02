const Board = require("./board.js");

$( () => {
  const $boardEl = $("#board");
  const $currentSelection = $("#current-selection")
  new Board($boardEl);
});
