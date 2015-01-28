#JS algos:
##Insertion sort:
```js
function insertSort(arr) {
  var i, j, arrLen = arr.length, key;
  for (i = 1; i < arrLen; i += 1) { 
    key = arr[i];
    j = i-1;
    while((j > -1) && (arr[j] > key)){
      arr[j+1] = arr[j]
      j = j - 1;
    }
    arr[j+1] = key;
  }
}
`
