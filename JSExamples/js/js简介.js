// 启用严格模式，变量必须先定义再使用，避免出错
"use strict";

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}

function changeImage() {
    var element = document.getElementById("myImage");
    // 检索 src 属性的值有没有包含 bulboff 这个字符串
    if (element.src.match("bulboff")) {
        element.src = "../images/pic_bulbon.gif";
    }
    else {
        element.src = "../images/pic_bulboff.gif";
    }
}

/**
 * 改变样式属性
 */
function changeColor() {
    var x = document.getElementById("demo");
    x.style.fontSize = "25px";
    x.style.color = "red";
}