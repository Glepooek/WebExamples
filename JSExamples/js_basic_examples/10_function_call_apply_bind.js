const person = {
  name: 'Alice',
}

const args = ['Hi', '~']

/**
 * 问候
 *
 * @param {string} greeting 问候语
 * @param {string} punctuation 标点符号
 */
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`)
}

// 用call调用greet，this指向person，参数逐个传入
greet.call(person, 'Hello', '!') // 输出：Hello, Alice!
// 用apply调用greet，this指向person，参数传入数组
greet.apply(person, args) // 输出：Hello, Alice!

const boundGreet = greet.bind(person, 'Hey')
boundGreet('?') // 输出：Hey, Alice?
