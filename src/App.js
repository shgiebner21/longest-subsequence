import React, { Component } from 'react'
import { includes, uniq, filter, map } from 'ramda'
import './App.css';

export default class App extends Component {

  render() {
    const first = [1, 2, 3, 4, 1]
    const second = [3, 4, 1, 2, 1, 3]
    
    let firstArr = []
    let secondArr = []
  
    for (let i=0; i<first.length; i++) {
      for (let nr=2; nr<=first.length + 1; nr++) {              // Beg w index 2 skips (some) arrays with only one value
        let newArr = first.slice(i, nr)                         // This renders most versions of first array, but not versions that skip an index
        firstArr.push(newArr)                                   

        if (newArr.length > 2) {                                // Calculate arrays with items removed from inside indexes
          firstArr.push( map((arr, idx) => newArr.slice(0, idx).concat(newArr.slice(idx + 1, newArr.length))))
        }
      }
    }
    let firstArrClean = uniq(firstArr.filter(arr => arr.length > 1))  // Removes arrays that are empty or have only one value, remove any dupes
    console.log('firstArr => ', firstArrClean)                        // Shows all subsequences for first array

    for (let i=0; i<second.length; i++) {
      for (let nr=2; nr<=second.length + 1; nr++) {             // Beg w index 2 skips (some) arrays with only one value
        let newArr = second.slice(i, nr)                        // This renders most versions of first array, but not versions that skip an index

        if (includes(newArr, firstArrClean)) {                  // Only push items into second array if they exist in the first array
          secondArr.push(newArr)
        }
        
          if (newArr.length > 2) {                              // Calculate arrays with items removed from inside indexes
            for (let x=0; x<newArr.length; x++) {
              let filteredItems = newArr.slice(0, x).concat(newArr.slice(x + 1, newArr.length))

              if ( includes(filteredItems, firstArrClean) ) {   // Only push items into second array if they exist in the first array
                secondArr.push(filteredItems)
              }
            }
          }
      }
    }
    let secondArrClean = uniq(secondArr.filter(arr => arr.length > 1))           // Removes arrays that are empty or have only one value
    let sortedArr = secondArrClean.sort((a, b) => b.length - a.length )          // Sort w longest arrays first so we can filter out shorter arrays
    let answer = filter(arr => arr.length === sortedArr[0].length, sortedArr)
    console.log('and the Answer is... => ', answer)


    return (
      <div className="App">
        <header className="App-header">
          <p>
            The answer to this challenge is...
          </p>
          {map(arr => <p key={arr} >{arr}</p>, answer) }
        </header>
      </div>
    )

  }

}


