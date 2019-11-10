// Complete the longestCommonSubsequence function below.
function longestCommonSubsequence(first, second) {
  let firstArr = []
  let secondArr = []

  for (let i=0; i<first.length; i++) {
    for (let nr=2; nr<=first.length + 1; nr++) {         // beg w index 2 skips (some) arrays with only one value
      firstArr.push( first.slice(i, nr) )                // This renders most versions of first array, but not versions that skip an index
    }
  }
let firstArrClean = firstArr.filter(arr => arr.length > 1)  // removes arrays that are empty or have only one value
console.log('firstArr => ', firstArrClean)


  for (let i=0; i<second.length; i++) {
    for (let nr=2; nr<=second.length + 1; nr++) {         // beg w index 2 skips (some) arrays with only one value
      let newArr = second.slice(i, nr)                    // This renders most versions of first array, but not versions that skip an index

      console.log('included in firstArr => ', firstArrClean.includes(newArr), ' = ', newArr )  // Insists on returning false even when true.  ???
      secondArr.push(newArr)

        if (newArr.length > 3) {                          // Calculate arrays with items removed from inside indexes
          for (let x=0; x<newArr.length; x++) {
            let filteredItems = newArr.slice(0, x).concat(newArr.slice(x + 1, newArr.length))
            secondArr.push(filteredItems)
          }
        }
    }
  }

let secondArrClean = secondArr.filter(arr => arr.length > 1)  // removes arrays that are empty or have only one value
}