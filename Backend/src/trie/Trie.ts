class TrieNode {
    children: Record<string, TrieNode>
    isEnd: boolean


    constructor() {
        this.children = {}
        this.isEnd = false
    }
}



export class Trie {
    private root: TrieNode

    constructor() {
        this.root = new TrieNode()
    }

    insert(word: string) {
        let node = this.root
        word = word.toLocaleLowerCase()
        
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode()
            }
            node = node.children[char]
        }

        node.isEnd = true
    }


    autoCompleate(prefix: string) {
        const result: string[] = []
        let root = this.root

        prefix = prefix.toLocaleLowerCase()

        for (let char of prefix) {
            if (!root.children[char.toLowerCase()]) return result

            root = root.children[char]
        }


        const dfs = (current: TrieNode, path: string) => {
            if (current.isEnd) {
                result.push(path)
            }

            for (let ch in current.children) {
                dfs(current.children[ch], path + ch)
            }
        }

        dfs(root, prefix)
        return result
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