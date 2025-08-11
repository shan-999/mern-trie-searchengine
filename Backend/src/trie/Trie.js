"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }
    autoCompleate(prefix) {
        const result = [];
        let root = this.root;
        for (let char of prefix) {
            if (!root.children[char])
                return result;
            root = root.children[char];
        }
        const dfs = (current, path) => {
            if (current.isEnd) {
                result.push(path);
            }
            for (let ch in current.children) {
                dfs(current.children[ch], path + ch);
            }
        };
        dfs(root, prefix.toLocaleLowerCase());
        return result;
    }
    print(node = this.root, prefix = '', isTail = true, wordPrefix = '') {
        const entries = Object.entries(node.children);
        const total = entries.length;
        if (prefix === '' && node.isEnd) {
            console.log(`[${wordPrefix}]`);
        }
        entries.forEach(([ch, child], index) => {
            const isLast = index === total - 1;
            const connector = isLast ? '└── ' : '├── ';
            const childPrefix = prefix + (isLast ? '    ' : '│   ');
            const currentWord = wordPrefix + ch;
            let marker = child.isEnd ? ` [${currentWord}]` : '';
            console.log(prefix + connector + ch + marker);
            this.print(child, childPrefix, isLast, currentWord);
        });
    }
}
exports.Trie = Trie;
