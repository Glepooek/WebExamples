* 问题1：形参不明确。无法通过函数签名看到需要传入几个参数。

```js
/**
 * 打印传递的所有数字之和
 */
function printSum() {
    // arguments是一个伪数组，可以收集到函数的所有参数
    let sum = 0
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    console.log(sum)
}

// 期望的调用方式
printSum(1, 2, 3)
printSum(1, 2)
printSum(1)
printSum()
console.log('------')
```

* 问题2：新增参数，需要修改内部实现。

```js
/**
 * 打印传递的所有数字之和
 */
function printSum(printType) {
    // arguments是一个伪数组，可以收集到函数的所有参数
    let sum = 0
    for (let i = 1; i < arguments.length; i++) {
        sum += arguments[i]
    }
    console[printType](sum)
}

// 期望的调用方式
printSum('log', 1, 2, 3)
printSum('warn', 1, 2)
printSum('error', 1)
printSum('log')
console.log('------')
```

解决方法：使用ES6的剩余参数。
```js
/**
 * 打印传递的所有数字之和
 *
 * @param {string} printType 打印类型
 * @param {...number} numbers 需要打印的数字
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
```

## 关键细节
* 参数列表中只能有一个剩余参数。
* 剩余参数必须放在参数列表的末尾。


