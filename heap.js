function  addToHeap(heap, val) {
    heap.push(val);
    if (heap.length == 2) {
        return heap;
    }
    let selfIndex = heap.length - 1;
    let parentIndex = Math.trunc(selfIndex / 2);
    
    while (parentIndex && heap[parentIndex] > val) {
        const temp = heap[selfIndex];
        heap[selfIndex] = heap[parentIndex];
        heap[parentIndex] = temp;
        selfIndex = parentIndex;
        parentIndex = Math.trunc(selfIndex / 2);
    }
    return heap;
}

console.log(addToHeap([undefined, 2, 6, 12, 3, 10, 8, 15, 17, 11, 7], 1));
console.log(addToHeap([undefined, 5], 1))