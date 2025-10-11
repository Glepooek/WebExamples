/**
 * 打印传递的所有数字之和
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
printSum1(1, 2, 3)
printSum1(1, 2)
printSum1(1)
printSum1()
console.log('------')

/**
 * 打印传递的所有数字之和
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
printSum2('log', 1, 2, 3)
printSum2('warn', 1, 2)
printSum2('error', 1)
printSum2('log')
console.log('------')

/**
 * 打印传递的所有数字之和
 *
 * @param {string} printType 打印类型
 * @param {...number} numbers 需要求和的数字
 * */
function printSum(printType, ...numbers) {
  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  console[printType](sum)
}

printSum('log', 1, 2, 3)
printSum('warn', 1, 2)
printSum('error', 1)
printSum('log')
console.log('------')
