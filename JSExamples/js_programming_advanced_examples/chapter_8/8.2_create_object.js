/*
 * 工厂模式创建对象
 */
function createPerson(name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    console.log('————————工厂模式创建对象————————')
    console.log(this.name)
  }
  return o
}

let person1 = createPerson('Nicholas', 29, 'Software Engineer')
let person2 = createPerson('Greg', 27, 'Doctor')

console.log(Object.getOwnPropertyDescriptor(person1, 'name'))

person1.sayName()

/*
 * 构造函数创建对象
 */
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log('————————构造函数创建对象————————')
    console.log(this.name)
  }
}

let person3 = new Person('Nicholas', 29, 'Software Engineer')
let person4 = new Person('Greg', 27, 'Doctor')

person3.sayName()

console.log(person3.constructor === Person) // true
console.log(person4.constructor === Person) // true

/*
 * 函数表达式也可以表示构造函数
 */
let Employee = function (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log('————————函数表达式创建对象————————')
    console.log(this.name)
  }
}

let employee1 = new Employee('Nicholas', 29, 'Software Engineer')
let employee2 = new Employee('Greg', 27, 'Doctor')
employee1.sayName()

console.log(employee1.sayName === employee2.sayName) // false

// 原型模式创建对象
function Student() {}

Student.prototype.name = 'Nicholas'
Student.prototype.age = 29
Student.prototype.job = 'Software Engineer'
Student.prototype.sayName = function () {
  console.log('————————原型模式创建对象————————')
  console.log(this.name)
}

let student1 = new Student()
// student1.name = 'Greg'
let student2 = new Student()
student1.sayName()
