class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(root) {
        this.root = root
    }
}

function sorted(array) {
    if (array.length <= 1) {
        return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const slicedLeft = sorted(left);
    const slicedRight = sorted(right);

    return merge(slicedLeft, slicedRight)
}

function merge(left, right) {
    const mergedArray = [];

    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            mergedArray.push(left[i])
            i++
        }
        if (right[j] < left[i]) {
            mergedArray.push(right[j])
            j++
        }
        if (left[i] === right[j]) {
            mergedArray.push(left[i])
            j++
            i++
        }

    }

    return mergedArray.concat(left.slice(i)).concat(right.slice(j))
}

function buildTree(array) {

    if (array.length <= 1) {
        return array.length === 1 ? new Node(array[0]) : null;
    }

    const mid = Math.floor(array.length / 2)
    const root = new Node(array[mid])

    root.left = buildTree(array.slice(0, mid))
    root.right = buildTree(array.slice(mid + 1))

    return root
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function insert(value) {
    const tree = treeX
    let root = tree.root;

    while (root && root.data !== value) {
        if (value < root.data && root.left !== null) {
            root = root.left
        }
        if (value < root.data && root.left === null) {
            root.left = new Node(value)
        }
        if (value > root.data && root.right !== null) {
            root = root.right
        }
        if (value > root.data && root.right === null) {
            root.right = new Node(value)
        }
    }

    return tree.root
}

function remove(value) {
    const tree = treeX
    let root = tree.root;
    let temp;

    while (root) {
        if (root.data === value) {
            if (temp !== undefined) {
                if (root.left === null && root.right === null && temp.data > root.data) temp.left = null
                if (root.left === null && root.right === null && temp.data < root.data) temp.right = null
                if (root.left !== null && root.right === null && temp.data < root.data) temp.right = root.left
                if (root.right === null && root.left !== null && temp.data > root.data) temp.left = root.left
                if (root.left === null && root.right !== null && temp.data > root.data) temp.left = root.right
                if (root.left !== null && root.right !== null && temp.data > root.data) {
                    temp.left = root.right
                    if (temp.left.left !== null) {
                        temp.left.left = root.right.left
                        temp.left.left.right = root.left
                    }
                    else {
                        temp.left.left = root.left
                    }
                }
                if (root.left !== null && root.right !== null && temp.data < root.data) {
                    temp.right = root.left
                    temp.right.right.right = root.right
                }
            }
            return
        }

        if (value < root.data) {
            temp = root
            root = root.left
            // console.log(root)
        }

        if (value > root.data) {
            temp = root
            root = root.right
            // console.log(root)
        }
    }

    return tree.root
}

function find(value) {
    const tree = treeX
    let root = tree.root;

    while (value !== root.data) {
        if (value > root.data) {
            root = root.right
        }
        if (value < root.data) {
            root = root.left
        }
        if (value === root.data) {
            return console.log("finding", root)
        }
    }
}

function levelOrder(root) {
    const queue = [];
    queue.push(root);
    while (queue.length !== 0) {

        const temp = queue.shift();
        console.log(temp.data);

        if (temp.left !== null) {
            queue.push(temp.left);
        }

        if (temp.right !== null) {
            queue.push(temp.right);
        }
    }
}

function inOrder(root) {
    if (root === null) {
        return;
    }

    inOrder(root.left)

    console.log(root.data)

    inOrder(root.right)
}

function preOrder(root) {
    if (root === null) {
        return
    }

    console.log(root.data)

    preOrder(root.left)

    preOrder(root.right)
}

function postOrder(root) {
    if (root === null) {
        return
    }

    postOrder(root.left)

    postOrder(root.right)

    console.log(root.data)
}

function height(root) {
    if (root === null) return 0

    let leftHeight = height(root.left)
    let rightHeight = height(root.right)

    return leftHeight > rightHeight ? ++leftHeight : ++rightHeight
}

function depth(root, node) {
    if (root === null) return -1

    let dist = -1

    if ((root.data === node) || (dist = depth(root.left, node)) >= 0 || (dist = depth(root.right, node)) >= 0) {
        return dist + 1
    }

    return dist
}

function isBalanced(root) {
    if (height(root.left) > height(root.right) + 1 || height(root.left) > height(root.right) - 1 || height(root.left) === height(root.right)) {
        return console.log("true")
    }

    return console.log("false")
}

function rebalance(root) {
    const sortedArray = [];
    inOrderTraversal(root, sortedArray);

    root = buildTree(sortedArray);

    return root;

}

function inOrderTraversal(root, array) {

    if (root === null) {
        return;
    }

    inOrderTraversal(root.left, array);
    array.push(root.data);
    inOrderTraversal(root.right, array);
}

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const sortedArray = sorted(test)

const treeX = new Tree(buildTree(sortedArray))

insert(1989)
insert(1999)
insert(2)
insert(6)
insert(25)
const reba = rebalance(treeX.root)
// console.log(sortedArray)
prettyPrint(reba)
// console.log(treeX.root)