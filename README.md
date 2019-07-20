# Scramble With Self

Scramble With Self is a word jumble game built with JavaScript and jQuery inspired by the game Scramble With Friends.

![game](./screenshots/board.png)

## How To Play

At the beginning of each round, a 4x4 grid of letters is generated based on the frequencies and letter values of the [Scramble letter distribution][scramble-letter-dist]. Players create words from the board by clicking and dragging their mouse across the letter tiles and then releasing the mouse button to submit their selection. The selections are then checked against the [Official Scrabble Players Dictionary (OSPD)][ospd] and the selected letters momentarily change colors to green, red, or yellow upon submission based on whether the selection is valid, invalid, or valid but previously submitted (respectively). The OSPD word list file was obtained from [The National Puzzlers' League][ospd-word-list].

[scramble-letter-dist]: https://en.wikipedia.org/wiki/Scrabble_letter_distributions
[ospd]: https://en.wikipedia.org/wiki/Official_Scrabble_Players_Dictionary
[ospd-word-list]: http://www.puzzlers.org/dokuwiki/doku.php?id=solving%3awordlists%3aabout%3astart

## Implementation

### User Interaction

A significant feature of Scramble With Self is the ability to click and drag letter tiles to create words. This was accomplished by using jQuery to handle mouse events:

```javascript
// lib/board.js

activateBoard() {
  $("#board li") // letter tiles
    .on("mousedown", this.handleTileMousedown)
    .on("mouseenter", this.handleTileMouseenter);

  $("body")
    .on("mouseup mouseleave", this.handleWordSubmission.bind(this));
}
```

The game also enforces a couple of letter-selection constraints:
- Users can only select letters adjacent to the most recently selected letter (unless it's the first selected letter).
- Users cannot select a letter that has already been selected in the current selection.

To help with enforcing these constraints, each tile `<li>` has a data attribute `data-pos` that contains the coordinates (`[rowIdx, colIdx]`) of the tile within the board .

Both constraints are checked in the `mouseenter` handler, `handleTileMouseenter(e)`.

The first constraint is checked with an `isAdjacent(pos1, pos2)` function that builds up an array of all 8 positions adjacent to `pos1` (including those that are out-of-bounds) and seeing if `pos2` is included in that array.

```javascript
// lib/board.js

isAdjacent(pos1, pos2) {
  const adjacentPositions1 = this.adjacentPositions(pos1);
  for (let i = 0; i < adjacentPositions1.length; i++) {
    if (isEqual(adjacentPositions1[i], pos2)) {
      return true;
    }
  }

  return false;
}

adjacentPositions(pos) {
  // includes invalid (off the board) positions, for now
  const adjacentDeltas = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [ 0,  1],
    [ 0, -1],
    [ 1, -1],
    [ 1,  0],
    [ 1,  1]
  ];

   return adjacentDeltas.map(delta => {
    return [pos[0] + delta[0], pos[1] + delta[1]];
  });
}
```

The second constraint is checked by keeping a running list of the positions of tiles in the current selection and checking to make sure the new tile selection does not already appear in this list.

### Dictionary Lookup

When the page loads, it makes an AJAX request to fetch a text file containing a newline-separated word list.

```javascript
// lib/game.js

class Game {
  constructor() {
    $.ajax({
      method: "GET",
      url: "assets/dict.txt"
    }).then(txt => {
      this.createDictionary(txt);
      ...
    })
  }
  ...
}
```

The game then parses this file to generate a hash map of words, which allows for quick word lookup/validation. This is especially important for providing nearly instant user feedback upon submission of a word.

```javascript
// lib/game.js

createDictionary(txt) {
  const words = txt.split("\n");
  words.pop(); // get rid of empty string entry
  this.dict = {};
  words.forEach(word => { this.dict[word] = true; });
}
```

## Future Work
- [ ] Solve the board: List all possible words and highest possible score at end of round
- [ ] Add styling to show path between selected tiles
