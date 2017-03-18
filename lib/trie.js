class TrieNode {
  constructor(val) {
    this.val = val;
    this.children = {};
    this.isCompleteWord = false;
  }

  addChild(node) {
    this.children[node.val] = node;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  // O(m) where m is the length of the word to insert
  insert(word) {
    // for each letter in word
    //    if a node already exists for that letter
    //      - go to that node
    //    else,
    //      - add new node
    //
    //    if it's the last letter of the word,
    //      - currNode.isCompleteWord = true;

  }

  isWord(word) {

  }

  isPrefix(str) {

  }
}
