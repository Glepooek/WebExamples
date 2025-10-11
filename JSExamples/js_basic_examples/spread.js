const nums = [45, 23, 12, 89, 10]
// 使用Math.max()计算最大值
// const maxNum = Math.max.apply(null, nums)
// const maxNum = Math.max.call(null, ...nums)
const maxNum = Math.max(...nums)
console.log(maxNum) // 89

// 浅层克隆数组
const newNums0 = []
for (let i = 0; i < nums.length; i++) {
  newNums0[i] = nums[i]
}
const newNums1 = [].concat(nums)
const newNums2 = Array.from(nums)
const newNums3 = nums.slice(0)

const newNums4 = [...nums]
console.log(newNums4) // [45, 23, 12, 89, 10]

// 函数参数展开
const arr = [1, 2, 3, 4, 5]
function foo(a, b, c) {
  console.log(a, b, c)
}

foo(...arr)

// 浅拷贝对象-对象字面量展开
const person = {
  name: 'Alice',
  age: 25,
  address: {
    city: 'New York',
    zip: '10001',
  },
}

const newPerson = { ...person, name: 'Bob' }
person.address.city = 'Los Angeles'

console.log(newPerson.address)
console.log(person.address)
console.log(newPerson.address === person.address)
// { name: 'Bob', age: 25, address: { city: 'Los Angeles', zip: '10001' } }
// 注意：address是引用类型，浅拷贝后，newPerson.address和person.address指向同一个对象
