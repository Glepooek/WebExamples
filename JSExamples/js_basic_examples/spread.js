/**
 * 演示 JavaScript 展开运算符 (Spread Operator) 的使用
 * 展开运算符用三个点 (...) 表示，可以将可迭代对象展开为单独的元素
 */

'use strict'

const nums = [45, 23, 12, 89, 10]

/**
 * 示例1: 使用展开运算符计算数组的最大值
 * Math.max() 接受多个参数，不能直接传入数组
 * 展开运算符可以将数组展开为多个参数
 */
// 旧方法：使用 apply
// const maxNum = Math.max.apply(null, nums)
// 或使用 call 配合展开运算符
// const maxNum = Math.max.call(null, ...nums)

// 推荐方法：直接使用展开运算符
const maxNum = Math.max(...nums)
console.log('数组最大值:', maxNum) // 89

/**
 * 示例2: 浅拷贝数组的多种方法
 */
// 方法1: 传统 for 循环
const newNums0 = []
for (let i = 0; i < nums.length; i++) {
  newNums0[i] = nums[i]
}

// 方法2: concat 方法
const newNums1 = [].concat(nums)

// 方法3: Array.from 方法
const newNums2 = Array.from(nums)

// 方法4: slice 方法
const newNums3 = nums.slice(0)

// 方法5: 展开运算符（最简洁）
const newNums4 = [...nums]
console.log('浅拷贝数组:', newNums4) // [45, 23, 12, 89, 10]

/**
 * 示例3: 函数参数展开
 * 将数组元素作为独立参数传递给函数
 */
const arr = [1, 2, 3, 4, 5]

/**
 * 接受三个参数的函数
 * @param {number} a - 第一个参数
 * @param {number} b - 第二个参数
 * @param {number} c - 第三个参数
 */
function foo(a, b, c) {
  console.log('函数参数展开:', a, b, c)
}

foo(...arr) // 输出: 1 2 3

/**
 * 示例4: 浅拷贝对象（对象字面量展开）
 * 注意：这是浅拷贝，嵌套对象仍然是引用
 */
const person = {
  name: 'Alice',
  age: 25,
  address: {
    city: 'New York',
    zip: '10001',
  },
}

// 使用展开运算符创建新对象，并覆盖 name 属性
const newPerson = { ...person, name: 'Bob' }

// 修改原对象的嵌套属性
person.address.city = 'Los Angeles'

console.log('新对象的地址:', newPerson.address)
console.log('原对象的地址:', person.address)
console.log('地址对象是否相同:', newPerson.address === person.address)

// 输出结果：
// newPerson.address: { city: 'Los Angeles', zip: '10001' }
// person.address: { city: 'Los Angeles', zip: '10001' }
// true - 说明 address 是引用类型，浅拷贝后两者指向同一个对象

/**
 * 示例5: 合并数组
 */
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const mergedArray = [...arr1, ...arr2]
console.log('合并数组:', mergedArray) // [1, 2, 3, 4, 5, 6]

/**
 * 示例6: 合并对象
 */
const obj1 = { a: 1, b: 2 }
const obj2 = { c: 3, d: 4 }
const mergedObject = { ...obj1, ...obj2 }
console.log('合并对象:', mergedObject) // { a: 1, b: 2, c: 3, d: 4 }
