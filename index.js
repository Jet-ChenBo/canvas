window.onload = function(){
    /*
    var canvas = document.getElementById("canvas")
    // 获取上下文
    var ctx = canvas.getContext('2d')
    // 填充用的颜色
    ctx.fillStyle = 'red'
    // 描边用的颜色
    ctx.strokeStyle = 'yellow'
    // 设置画笔的宽度
    ctx.lineWidth = 3    

    // 矩形
    // 参数：左上角x、y，x移动的距离，x移动的距离
    ctx.fillRect(10,10,100,100)     // 填充
    ctx.strokeRect(10,10,100,100)   // 描边
    ctx.clearRect(30,30,60,60)      // 清除一个矩形区域

    // 直线画图形(这里画了一个三角形)
    // 参数：x、y
    ctx.beginPath()
    ctx.moveTo(150,150)
    ctx.lineTo(200, 150)
    ctx.lineTo(200,200)
    ctx.fill()   // 填充
    ctx.stroke() // 描边；填充时图形会自动闭合，描边不会
    ctx.closePath()

    // 圆
    // 参数：圆心x，y、半径，开始度数和结束度数(以π的值来衡量，一个π就是90度)
    ctx.beginPath()
    ctx.arc(80,150,30,0,Math.PI*2)
    ctx.fill()      // 填充
    ctx.stroke()    // 描边
    ctx.closePath()
    */

    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext('2d')
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'yellow'
    
    var lastPoint = {x:undefined, y:undefined}
    flag = false

    function drawCirlce(x, y, radius){
        ctx.beginPath()
        ctx.arc(x,y,radius,0,Math.PI*2)
        ctx.fill()
        ctx.closePath()
    }

    function drawLine(x1, y1, x2, y2){
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2,y2)
        ctx.stroke()
        ctx.closePath()
    }

    canvas.onmousedown = function(a){
        flag = true
        var x = a.clientX
        var y = a.clientY
        lastPoint = {x:x, y:y}
        drawCirlce(x, y, 1)
    }

    canvas.onmousemove = function(a){
        if(flag){
            var x = a.clientX
            var y = a.clientY
            var newPoint = {x:x, y:y}
            drawCirlce(x, y, 1)
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }

    canvas.onmouseup = function(){
        flag = false
    }
}
