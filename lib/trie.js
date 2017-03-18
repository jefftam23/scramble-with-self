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

  insert(word) {
    let currNode = this.root;
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (currNode.children[letter]) {
        currNode = currNode.children[letter];
      } else {
        let newNode = new TrieNode(letter);
        currNode.addChild(newNode);
        currNode = newNode;
      }
    }
    currNode.isCompleteWord = true;
  }

  isWord(word) {
    let currNode = this.root;
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (currNode.children[letter]) {
        currNode = currNode.children[letter];
      } else {
        return false;
      }
    }

    return currNode.isCompleteWord;
  }

  // Returns true if the given string is part of a longer word
  // NOTE: This function returns false even if the given string
  //       is a complete word but does not lead to any longer words.
  isPrefix(str) {
    let currNode = this.root;
    for (let i = 0; i < str.length; i++) {
      let letter = str[i];
      if (currNode.children[letter]) {
        currNode = currNode.children[letter];
      } else {
        return false;
      }
    }

    return Object.keys(currNode.children).length !== 0;
  }
}

module.exports = Trie;
