/**
 * 演示函数默认参数的使用
 * Default parameters allow named parameters to be initialized with default values
 */

'use strict'

/**
 * 演示基本默认参数
 * @param {*} a - 第一个参数（无默认值）
 * @param {number} [b=2] - 第二个参数（默认值为2）
 * @param {number} [c=3] - 第三个参数（默认值为3）
 */
function foo(a, b = 2, c = 3) {
  console.log(a, b, c)
  console.log(arguments)
}

foo()
foo(1)
foo(1, undefined, 7)
console.log('------')

/**
 * 演示默认参数和 arguments 对象的关系
 * @param {*} a - 第一个参数
 * @param {*} c - 第二个参数
 * @param {number} [b=2] - 第三个参数（有默认值）
 * @param {*} d - 第四个参数
 */
function bar(a, c, b = 2, d) {
  console.log(a === arguments[0])
  console.log(b === arguments[1])
  a = 'changed'
  b = 'changed'
  console.log(a === arguments[0])
  console.log(b === arguments[1])
}

bar(1, 2)
console.log('------')
console.log(bar.length)

// 函数默认值表达式
let n = 1

/**
 * 用于生成递增值的函数
 * @returns {number} 当前值（每次调用后递增）
 */
function getValue() {
  return n++
}

/**
 * 演示默认参数可以是函数调用表达式
 * @param {*} a - 第一个参数
 * @param {*} [b=getValue()] - 第二个参数（默认值为函数调用结果）
 */
function baz(a, b = getValue()) {
  console.log(a, b)
}

console.log('------')
baz(1, 2) // 1 2
baz(1) // 1 1
baz(1) // 1 2
