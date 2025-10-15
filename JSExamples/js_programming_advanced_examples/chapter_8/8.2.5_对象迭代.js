let obj = {
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName() {
    console.log('-----------------对象迭代到方法并执行-----------------')
    console.log(this.name)
  },
}

console.log('-----------------对象迭代1-----------------')
for (const key in obj) {
  console.log('对象属性：', key, '对象值：', obj[key])
}

for (const key in obj) {
  // 判断对象中是否有该属性
  // if (!Object.hasOwn(obj, key)) continue
  // if (!obj.hasOwnProperty(key)) continue

  const element = obj[key]
  if (typeof element === 'function') {
    // element() 这样调用方法时，this不是obj
    // element.call(obj) // 显式把 this 指向 obj
    element.bind(obj)() // 也可以用 bind 创建一个新函数，this 永远指向 obj
    //obj[key]()
  }
}

console.log('-----------------对象迭代2-----------------')

Object.values(obj).forEach(value => {
  console.log('对象值：', value)
})

Object.entries(obj).forEach(([key, value]) => {
  console.log('对象键值对：', key, value)
})

function Person() {}
Person.prototype = {
  //constructor: Person,
  name: 'Nicholas',
  age: 29,
  job: 'Software Engineer',
  sayName() {
    console.log(this.name)
  },
}

let person1 = new Person()
person1.sayName()

Object.defineProperty(Person.prototype, 'constructor', {
  enumerable: false,
  value: Person,
})

console.log(person1.constructor === Person)
console.log(person1.constructor === Object)
console.log(Person.prototype.isPrototypeOf(person1))

console.log(Object.keys(person1.__proto__)) // ['constructor', 'name', 'age', 'job', 'sayName']
