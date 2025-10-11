function foo(a, b = 2, c = 3) {
  console.log(a, b, c)
  console.log(arguments)
}

foo()
foo(1)
foo(1, undefined, 7)
console.log('------')

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
function getvalue() {
  return n++
}

function baz(a, b = getvalue()) {
  console.log(a, b)
}

console.log('------')
baz(1, 2) // 1 2
baz(1) // 1 1
baz(1) // 1 2
