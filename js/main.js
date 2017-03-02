const Board = require("./board.js");
const CurrentSelection = require("./currentSelection.js");

$( () => {
  const $currentSelectionEl = $("#current-selection");
  const currSelection = new CurrentSelection($currentSelectionEl);

  const $boardEl = $("#board");
  new Board($boardEl, currSelection);
});
