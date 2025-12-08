class Rectangle {
  constructor(height, width) {
    this.height = height
    this.width = width
  }

  get area() {
    return this.calcArea()
  }

  calcArea() {
    return this.height * this.width
  }

  static diff(r1, r2) {
    return r1.area - r2.area
  }
}

console.log.x = () => {}

const square1 = new Rectangle(10, 12)
const square2 = new Rectangle(10, 2)

console.log.x(square1.area) // 120
console.log.x(Rectangle.diff(square1, square2)) // 100


/*   extends  */
class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() { return Array; }

  get sum() { return this.reduce((acc, val) => acc + val, 0) }
}

let a = new MyArray(1,2,3);
a.push(4)
let mapped = a.map(x => x * x);

console.log(mapped)   // [ 1, 4, 9, 16 ]
console.log(a.sum)  // 10
console.log(a.length)  // 4
console.log.x(mapped instanceof MyArray) // false
console.log(mapped instanceof Array)   // true


/*   super  */
