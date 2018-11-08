class MinHeap {
  constructor() {
    this.heap = [undefined];
  }

  static heapify(arr) {
    let newH = new MinHeap();
    newH.heap = arr;
    newH.heap.push(newH.heap[0])
    newH.heap[0] = undefined;

    newH.reheap(0, newH.heap.length - 1)
    return newH;
  }

  static heapSort(arr) {
    if(arr.length < 2) { return; }
    let newH = MinHeap.heapify(arr);
    let end = newH.heap.length - 1;
    while (end > 1) {
      newH.swap(end, 1);
      end--;
      newH.sink(1, end)
    }
    newH.heap.shift();
    return newH.heap;
  }

  reheap(start, end) {
    const lastParent = Math.trunc((end - 1) / 2);
    for(let i = lastParent; i > start; i--) {
      this.sink(i, end)
    }
  }

  add(val) {
    this.heap.push(val);
    let currIndex;
    let parentIndex;
    for(currIndex = this.heap.length - 1,
        parentIndex = Math.trunc(currIndex / 2);
        parentIndex && this.heap[parentIndex] > this.heap[currIndex];
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
    let currIndex = originalIndex;
    let childL = originalIndex * 2;
    let childR = childL + 1;
    while(childL && childL <= end && this.heap[childL] < this.heap[currIndex]
      || childR && childR <= end && this.heap[childR] < this.heap[currIndex]) {
        let indexToSwap;
        if (childR && childR <= end) {
          indexToSwap = (this.heap[childR] < this.heap[childL]) ? childR : childL;
        } else {
          indexToSwap = childL;
        }
        console.log(`SIFTING ${this.heap[currIndex]} AT ${currIndex} DOWN TO ${this.heap[indexToSwap]}`)
        this.swap(currIndex, indexToSwap);
        currIndex = indexToSwap;
        childL = currIndex * 2;
        childR = childL + 1;
      }
  }

  swap(indexA, indexB) {
    const temp = this.heap[indexA];
    this.heap[indexA] = this.heap[indexB];
    this.heap[indexB] = temp;
  }

}


// let heap = new MinHeap()

// heap.add(3).add(8).add(10).add(11).add(9).add(20).add(14).add(7)
// console.log(heap.heap)
// heap.remove()
// heap.remove()
// heap.remove()
// heap.remove()
// console.log(heap.heap)
// const heap2 = MinHeap.heapify([20, 3, 8, 14, 9, 6, 2])
const heap2 = MinHeap.heapSort([20,10,2,4,1,68,4, 3, 8, 14, 9, 6, 2])
console.log(heap2)