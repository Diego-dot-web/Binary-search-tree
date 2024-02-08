class Node {
    constructor(data, left = null, right = null) {
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
        return array.length === 1 ? new Node(array[0]) : null;;
    }

    
    const mid = Math.floor(array.length / 2)
    const root = new Node(array[mid])

    root.left = buildTree(array.slice(0, mid))
    root.right = buildTree(array.slice(mid + 1))

    // console.log(array.slice(0, mid))
    // console.log(array.slice(mid))


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

}

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

const sortedArray = sorted(test)

const treeX = new Tree(buildTree(sortedArray))


// console.log(sortedArray)
prettyPrint(treeX.root)