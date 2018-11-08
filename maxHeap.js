class MaxHeap {
  constructor() {
    this.heap = [undefined];
  }

  static heapify(arr) {
    let newH = new MaxHeap();
    newH.heap = arr;
    newH.heap.push(newH.heap[0])
    newH.heap[0] = undefined;

    const lastParent = Math.trunc((newH.heap.length - 1) / 2);
    for(let i = lastParent; i > 0; i--) {
      newH.sink(i, newH.heap.length - 1)
    }
    return newH;
  }

  static heapSort(arr) {
    if(arr.length < 2) { return; }
    let newH = MaxHeap.heapify(arr);
    let end = newH.heap.length - 1;
    console.log("STARTING HEAPSORT")
    while (end > 1) {
      console.log(`PRESWAP: ${newH.heap}`)
      newH.swap(end, 1);
      console.log(`POSTSWAP: ${newH.heap}`)
      end--;
      newH.sink(1, end)
    }
    newH.heap.shift();
    return newH.heap;
  }

  reheap(start, end) {
    const lastParent = Math.trunc((end - 1) / 2);
    for(let i = lastParent; i > start; i--) {
      newH.sink(i, end)
    }
  }
  
  add(val) {
    this.heap.push(val);
    let currIndex;
    let parentIndex;
    for(currIndex = this.heap.length - 1,
        parentIndex = Math.trunc(currIndex / 2);
        parentIndex && this.heap[parentIndex] < this.heap[currIndex];
        currIndex = parentIndex,
        parentIndex = Math.trunc(currIndex / 2)) {
          this.swap(currIndex, parentIndex);
        }
    return this;
  }

  remove() {
    if (!this.heap[1]) { return; }
    this.swap(1, this.heap.length - 1);
    const popped = this.heap.pop();

    this.sink(1, this.heap.length - 1)
    return popped;
  }
  
  sink(originalIndex, end) {
    console.log(`SINKING ${this.heap[originalIndex]} BOUNDS: ${end}`)
    console.log(`PRESINK: ${this.heap}`)
    let currIndex = originalIndex;
    let childL = originalIndex * 2;
    let childR = childL + 1;
    while(childL && childL <= end && this.heap[childL] > this.heap[currIndex]
      || childR && childR <= end && this.heap[childR] > this.heap[currIndex]) {
        let indexToSwap;
        if (childR && childR <= end) {
          indexToSwap = (this.heap[childR] > this.heap[childL]) ? childR : childL;
        } else {
          indexToSwap = childL;
        }
        console.log(`SIFTING ${this.heap[currIndex]} AT ${currIndex} DOWN TO ${indexToSwap}`)
        this.swap(currIndex, indexToSwap);
        currIndex = indexToSwap;
        childL = currIndex * 2;
        childR = childL + 1;
      }
      console.log(`POSTSINK: ${this.heap}`)
  }

  swap(indexA, indexB) {
    const temp = this.heap[indexA];
    this.heap[indexA] = this.heap[indexB];
    this.heap[indexB] = temp;
  }

}

const heap3 = MaxHeap.heapSort([ 3, 8, 14, 9, 6, 2])
console.log(heap3)