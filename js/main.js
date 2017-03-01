const Board = require("./board.js");

$( () => {
  const $boardEl = $("#board");
  new Board($boardEl);
});
