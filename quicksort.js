
function partition(arr, startInd, endInd) {
    if (startInd >= endInd) {
        return;
    }
    let pivotInd = Math.floor(Math.random() * (endInd - startInd)) + startInd
    const pivot = arr[pivotInd]
    let i = startInd
    let j = endInd

    while (i != j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }

        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        if (j == pivotInd) {
            pivotInd = i
        } else if (i == pivotInd) {
            pivotInd = j
        }
    }
    partition(arr, startInd, pivotInd - 1)
    partition(arr, pivotInd + 1, endInd)
    return arr
}

array = [3,1,82,9,2,7,33,-2,6,0,-23]
console.log(partition(array, 0 , array.length - 1))