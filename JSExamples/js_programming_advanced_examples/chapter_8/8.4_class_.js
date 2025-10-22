class Person {
  constructor(name, year) {
    this.name = name
    this.year = year
    this.sayName = () => console.log(this.name)
  }

  getInfo() {
    return console.log(this)
  }

  static doWork() {
    console.log('doWork')
  }
}

class Student extends Person {
  constructor(name, year, major) {
    super(name, year)
    this.major = major
  }
}

const myPerson = new Person('Ford', 2014)
console.log('——————————Person————————————')
console.log(myPerson.name, myPerson.year)

myPerson.getInfo()
myPerson.sayName()
Person.prototype.getInfo()

console.log(myPerson instanceof Person) // true
console.log(myPerson instanceof Person.prototype.constructor) // true
console.log(myPerson instanceof myPerson.constructor) // true
console.log(myPerson instanceof Person.constructor) // false
console.log(Person.prototype.isPrototypeOf(myPerson)) // true

const myPerson2 = Person.constructor('Anyu', 2025)
console.log('——————————Person.constructor————————————')
console.log(myPerson2 instanceof Person) // false
console.log(myPerson2 instanceof Person.prototype.constructor) // false
console.log(myPerson2 instanceof myPerson2.constructor) // true
console.log(myPerson2 instanceof Person.constructor) // true
console.log(Person.prototype.isPrototypeOf(myPerson2)) // false
console.log(myPerson2.__proto__.constructor)

const myStudent = new Student('Jane', 2015, 'Computer Science')
console.log('——————————Student————————————')
console.log(myStudent.name, myStudent.year, myStudent.major)
myStudent.getInfo()
Student.doWork()
