const Board = require("./board.js");
const CurrentSelection = require("./currentSelection.js");

$( () => {
  $.ajax({
    method: "GET",
    url: "dict.txt"
  }).then( txt => {
    const words = txt.split("\n");
    words.pop(); // get rid of empty string entry
    const dict = {};
    words.forEach(word => { dict[word] = true; });

    const $currentSelectionEl = $("#current-selection");
    const currSelection = new CurrentSelection($currentSelectionEl);

    const $boardEl = $("#board");
    new Board($boardEl, currSelection, dict);
  });
});
