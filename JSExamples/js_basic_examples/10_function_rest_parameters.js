/**
 * 演示 JavaScript 剩余参数 (Rest Parameters) 的使用
 * 剩余参数语法允许我们将不定数量的参数表示为一个数组
 */

'use strict'

/**
 * 使用 arguments 对象打印所有数字之和
 * arguments 是一个伪数组，可以收集到函数的所有参数
 * @param {...number} args - 可变数量的数字参数
 */
function printSum1() {
  // arguments是一个伪数组，可以收集到函数的所有参数
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  console.log(sum)
}

// 期望的调用方式
printSum1(1, 2, 3) // 6
printSum1(1, 2) // 3
printSum1(1) // 1
printSum1() // 0
console.log('------')

/**
 * 使用 arguments 对象打印所有数字之和，支持指定打印类型
 * @param {string} printType - 控制台打印方法类型 ('log', 'warn', 'error')
 * @param {...number} args - 可变数量的数字参数
 */
function printSum2(printType) {
  // arguments是一个伪数组，可以收集到函数的所有参数
  let sum = 0
  for (let i = 1; i < arguments.length; i++) {
    sum += arguments[i]
  }
  console[printType](sum)
}

// 期望的调用方式
printSum2('log', 1, 2, 3) // 6
printSum2('warn', 1, 2) // 3 (警告样式)
printSum2('error', 1) // 1 (错误样式)
printSum2('log') // 0
console.log('------')

/**
 * 使用剩余参数打印所有数字之和（推荐方式）
 * 剩余参数相比 arguments 的优势：
 * 1. 是真正的数组，可以使用所有数组方法
 * 2. 更清晰地表达函数签名
 * 3. 箭头函数不支持 arguments，但支持剩余参数
 *
 * @param {string} printType - 控制台打印方法类型 ('log', 'warn', 'error')
 * @param {...number} numbers - 需要求和的数字
 */
function printSum(printType, ...numbers) {
  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  console[printType](sum)
}

printSum('log', 1, 2, 3) // 6
printSum('warn', 1, 2) // 3
printSum('error', 1) // 1
printSum('log') // 0
console.log('------')

// 使用 reduce 方法的更简洁版本
/**
 * 使用 reduce 方法计算和
 * @param {string} printType - 控制台打印方法类型
 * @param {...number} numbers - 需要求和的数字
 */
function printSumWithReduce(printType, ...numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0)
  console[printType](sum)
}

console.log('使用 reduce 方法:')
printSumWithReduce('log', 1, 2, 3, 4, 5) // 15
