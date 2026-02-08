/**
 * 演示 call、apply 和 bind 方法的使用
 * 这三个方法都用于改变函数执行时的 this 指向
 */

'use strict'

const person = {
  name: 'Alice',
}

const args = ['Hi', '~']

/**
 * 问候函数
 * @param {string} greeting - 问候语
 * @param {string} punctuation - 标点符号
 */
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`)
}

// ===== call 方法 =====
// call() 方法：立即调用函数，this 指向第一个参数，其余参数逐个传入
greet.call(person, 'Hello', '!') // 输出：Hello, Alice!

// ===== apply 方法 =====
// apply() 方法：立即调用函数，this 指向第一个参数，其余参数以数组形式传入
greet.apply(person, args) // 输出：Hi, Alice~

// ===== bind 方法 =====
// bind() 方法：返回一个新函数，this 永久绑定到第一个参数，可以预设部分参数
const boundGreet = greet.bind(person, 'Hey')
boundGreet('?') // 输出：Hey, Alice?

// ===== 三者对比 =====
console.log('\n=== 三者对比 ===')

/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 */
function sum(a, b) {
  console.log(`${this.name} 计算: ${a} + ${b} = ${a + b}`)
  return a + b
}

const calculator = { name: '计算器' }

// call: 立即执行，参数列表
sum.call(calculator, 5, 3)

// apply: 立即执行，参数数组
sum.apply(calculator, [10, 20])

// bind: 返回新函数，稍后执行
const boundSum = sum.bind(calculator)
boundSum(7, 8)

// bind 可以预设参数（偏函数应用）
const add5 = sum.bind(calculator, 5)
add5(10) // 相当于 sum.call(calculator, 5, 10)
