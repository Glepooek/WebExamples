## 基本用法（相同点）
* 都是String方法，返回一个新的字符串（原字符串不变）。
* 都接受两个参数：start和end（end可选，表示到end前，`不包含end`）。start和end表示字符串中的“索引”，也就是以`0`为起点的位置编号（第一个字符索引为 0，第二个为 1，依此类推）。
* 都会把参数转为整数（ToInteger，向下取整），如果end省略则到字符串末尾。

```js
const s = "abcdefgh";
s.slice(1,4)      // "bcd"
s.substring(1,4)  // "bcd"
s.slice(3)        // "defgh"
s.substring(3)    // "defgh"
```

## 关键区别
### 负值处理
* slice：接受负数，表示从字符串末尾开始计数（start为负数时，会被解释为length + start。-1表示最后一个字符）。
* substring：把`小于0`的参数当成0处理（不会从末尾计数）。

```js
const s = "abcdef";
s.slice(-2)         // "ef"   （从倒数第2个到末尾）
s.substring(-2)     // "abcdef"  等同于 substring(0)
```

### start > end 时的行为（参数交换）
* slice：不会交换参数，如果start > end返回空字符串。
* substring：会交换参数（等同于使用较小值为start，较大值为end）。

```js
const s = "012345";
s.slice(4,1)        // ""      （start > end -> 空）
s.substring(4,1)    // "123"   （自动交换，等于 substring(1,4)）
```

### start === end 时的行为
* slice：返回空字符串。
* substring：返回空字符串。

```js
const s = "012345";
s.slice(-2, 4)      // ""   （-2 相当于 length-2=4，等于 slice(4,4) -> ""）
s.substring(4, 4)  // ""
```

## 其它细节
* 两者都会把非整数参数转为整数（例如 1.9 -> 1，-1.9 -> -1）。
* slice常用于数组、字符串；substring仅用于字符串。
* `substr(start, length)`是旧API（非标准/已弃用），不要使用。

## 总结建议（实战）
* 想要使用“从末尾计数”或允许负索引时，使用 slice（最常用）。
* 需要“自动保证 start ≤ end”时substring会自动交换，但这种行为有时会掩盖逻辑错误——更推荐显式处理并用slice。
* 常见做法：优先用 slice（更直观、语义清楚、对数组也适用），只在确有理由时用 substring。