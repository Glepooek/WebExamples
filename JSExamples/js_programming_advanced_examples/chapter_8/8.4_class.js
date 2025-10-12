class Person {
  constructor(name, year) {
    this.name = name
    this.year = year
  }
}

class Student extends Person {
  constructor(name, year, major) {
    super(name, year)
    this.major = major
  }
}

const myPerson = new Person('Ford', 2014)
const myStudent = new Student('Jane', 2015, 'Computer Science')

console.log(myPerson.name, myPerson.year, myStudent.name, myStudent.year, myStudent.major)
