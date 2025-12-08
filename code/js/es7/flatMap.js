let arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]


/*
Let's generate a list of words from a list of sentences.
*/
arr1 = ["it's Sunny in", "", "California"];

arr1.map(x => x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" "));
// ["it's","Sunny","in", "", "California"]


// Let's say we want to remove all the negative numbers
// and split the odd numbers as string separated by -
// if the numbers is not odd, make it odd by subtracting 1 from it
let a = [5, 4, -3, 20, 17, -33, -4, 18]
a = a.flatMap(x => x < 0 ? [] : x%2 === 0 ? [x, '-'] : [x - 1, '-']).join('')
console.log(a)

