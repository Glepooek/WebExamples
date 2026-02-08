// 启用严格模式，变量必须先定义再使用，避免出错
'use strict'

/**
 * 显示当前日期和时间
 */
function displayDate() {
  const demoElement = document.getElementById('demo')
  if (demoElement) {
    demoElement.textContent = Date()
  }
}

/**
 * 切换灯泡图片（开/关）
 */
function changeImage() {
  const element = document.getElementById('myImage')
  if (!element) return

  // 检索 src 属性的值有没有包含 bulboff 这个字符串
  if (element.src.match('bulboff')) {
    element.src = '../assets/images/pic_bulbon.gif'
  } else {
    element.src = '../assets/images/pic_bulboff.gif'
  }
}

/**
 * 改变样式属性
 */
function changeColor() {
  const demoElement = document.getElementById('demo')
  if (!demoElement) return

  demoElement.style.fontSize = '25px'
  demoElement.style.color = 'red'
}
