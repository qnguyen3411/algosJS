// function changeArr(array) {
//     array[0] = 9
// }
// let arr = [0,1,2,3,4,5]
// changeArr(arr)
// console.log(arr)

function partition(arr, startInd, endInd) {
    // console.log("STARTINDEX: ", startInd, " ENDINDEX: ", endInd )
    if (startInd >= endInd) {
        return;
    }
    var pivotInd = Math.floor(Math.random() * (endInd - startInd)) + startInd
    const pivot = arr[pivotInd]
    var i = startInd
    var j = endInd

    while (i != j) {
        // console.log("ARR[I]:" , arr[i], " ARR[J]:", arr[j])
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