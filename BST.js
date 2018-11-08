class Node {
  constructor(val) {
    this.value = val;
    this.right = null;
    this.left = null;
  }

  prettyPrintSubtree(offset) {
    if (this.right) {
      this.right.prettyPrintSubtree(offset + "   ")
    }
    console.log(offset + this.value)
    if (this.left) {
      this.left.prettyPrintSubtree(offset + "   ")
    }
  }

  printSubtree(mode) {
    if (mode == 'preorder') { console.log(this.value); }
    if (this.left) {
      this.left.printSubtree(mode);
    }
    if (mode == 'inorder') { console.log(this.value); }
    if (this.right) {
      this.right.printSubtree(mode);
    }
    if (mode == 'postorder') { console.log(this.value); }
  }

  getSubTreeHeight() {
    const leftHeight = (this.left) ? this.left.getSubTreeHeight() : 0
    const rightHeight = (this.right) ? this.right.getSubTreeHeight() : 0
    return Math.max(leftHeight, rightHeight) + 1;
  }

  getParentOfMax() {
    let walker = this;
    let follower;
    while(walker.right) {
      follower = walker;
      walker = walker.right;
    }
    return follower;
  }

  getParentOfMin() {
    let walker = this;
    let follower;
    while(walker.left) {
      follower = walker;
      walker = walker.left;
    }
    return follower;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let walker = this.root;
    let follower;
    let next;
    while (walker) {
      follower = walker;
      next = (walker.value < val) ? "right" : "left";
      walker = walker[next];
    }
    follower[next] = newNode;
    return this;
  }

  printTree() {
    if (this.root) {
      this.root.prettyPrintSubtree("\n");
    }
  }

  traverse(mode) {
    if (this.root) {
      this.root.printSubtree(mode);
    }
  }

  getHeight() {
    if (this.root) {
      return this.root.getSubTreeHeight();
    }
    return 0;
  }

  remove(target) {
    if (!this.root) { return false; }
    let walker = this.root;
    let follower;
    
    const replaceWalker = (replacer) => {
      if (follower) { 
        const walkerPos = (follower.value < walker.value) ? "right" : "left"
        follower[walkerPos] = replacer
      } else { // If walker is root node
        this.root = replacer;
      }
      if (replacer && replacer != walker.right) {
        replacer.right = walker.right;
      }
      if (replacer && replacer != walker.left) {
        replacer.left = walker.left;
      }
    }
    
    // Traverse to target
    while (walker && walker.value != target) {
      follower = walker;
      walker = (walker.value < target) ? walker.right : walker.left;
    }
    // Target not found
    if (!walker) { return false };
    // If target is leaf
    if (!walker.left && !walker.right) {
      replaceWalker(null);
      return;
    }
    // Find replacer
    let parentOfReplacer;
    let replacerPos;
    
    if (walker.left) {
      // Replace walker with max of left subtree
      parentOfReplacer = walker.left.getParentOfMax()
      if (!parentOfReplacer) {
        replaceWalker(walker.left);
        return;
      }
      replacerPos = "right"
    } else {
      // Replace walker with min of right subtree
      parentOfReplacer = walker.right.getParentOfMin()
      if (!parentOfReplacer) {
        replaceWalker(walker.right);
        return;
      }
      replacerPos = "left"
    }
    replaceWalker(parentOfReplacer[replacerPos]);
    parentOfReplacer[replacerPos] = null;
  }



  remove2(target) {
    if (!this.root) { return; }
    let follower;
    let walker = this.root;
    let direction;
    // find target
    while(walker && walker.value != target) {
      follower = walker;
      direction = (walker.value < target) ? "right" : "left";
      walker = walker[direction];
    }
    if(!walker) { return; } // if target not found
    console.log("TARGET FOUND")
    if(!walker.right && !walker.left) { // if leaf
      follower[direction] = null;
      return;
    }

    function replaceWalker(replacer){
      if (follower) {
        follower[direction] = replacer;
      } else {
        this.root = replacer;
      }
      if (replacer != walker.right) {
        replacer.right = walker.right;
      }
      if (replacer != walker.left) {
        replacer.left = walker.left;
      }
    }

    let replacer;
    if (walker.left) {
      const parent = walker.left.getParentOfMax();
      if (parent) {
        replacer = parent.right;
        parent.right = replacer.left;
      } else {
        replacer = walker.left;
      }
    } else {
      const parent = walker.right.getParentOfMin();
      if (parent) {
        replacer = parent.right;
        parent.left = replacer.right;
      } else {
        replacer = walker.right;
      }
    }
    replaceWalker(replacer)
  }
}

const bst = new BST()
bst.insert(40).insert(20).insert(10).insert(15).insert(70).insert(60).insert(65)
bst.printTree()
bst.remove2(70)
console.log("OKKKKKKKKK")
bst.printTree()