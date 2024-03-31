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

function changeColor() {
    var x = document.getElementById("demo");
    x.style.fontSize = "25px";
    x.style.color = "red";
}