# Scramble with Self

### Background

Scramble with Self is a word scramble game where the user formulates words by chaining together adjacent (including diagonal) letter tiles on a 4x4 board.

It is inspired by the game Scramble with Friends (also called Word Streak).

### MVP list  

- [ ] Start and reset buttons will randomize the letter board
- [ ] Users can create words via mouse interaction with board
- [ ] Word validation (with a dictionary or word list of sorts)
- [ ] Scoring system
- [ ] Game timer
- [ ] List all possible words and highest possible score at end of round

### Wireframes

![wireframes](https://github.com/jefftam23/scramble-with-self/blob/master/wireframe.jpg)

### Architecture and Technologies

I plan on using JavaScript, jQuery, HTML, and CSS.

A significant challenge will be how the user creates words. The user will click and drag their mouse to create a word and then release the mouse to submit the word.
I will use jQuery to obtain mouse coordinates, and update the DOM accordingly to provide visual feedback to the user.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and a word-list library installed.  Create `webpack.config.js` as well as `package.json`.  Goals for the day:

- Create a `board.js` file and implement a `reset()` function that randomizes the board
- Handle user mouse input and `console.log` each time the user submits a word (by releasing mouse).

**Day 2**: Word Validation and Scoring. Goals for the day:

- Obtain a word list library or API
- Validate user-input words (has to be fast lookup because feedback will be displayed right after user submits word)
- Implement scoring system based on Scrablle letter weights
- Add game timer

**Day 3**: Show all possible words and Style page  Goals for the day:

- Display a list of all possible words at the end of round
- Add game instructions
- Style page
