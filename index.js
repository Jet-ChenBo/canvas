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
    beginDraw(canvas)
    changeSize()
    var ctx = canvas.getContext('2d')
    var lastPoint = {x:undefined, y:undefined} // 上一次鼠标的位置
    var using = false  // 是否在用画笔或者橡皮擦
    var lineWidth = 5  // 画笔宽度
    // ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'

    var usingEraser = false  // 是否使用橡皮擦

    pen.onclick = function(){
        usingEraser = false
        pen.classList.add("active")
        eraser.classList.remove("active")
    }

    eraser.onclick = function(){
        usingEraser =true
        eraser.classList.add("active")
        pen.classList.remove("active")
    }

    clear.onclick = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    download.onclick = function(){
        var url = canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = "canvas作品"
        a.click()
    }

    black.onclick = function(){
        ctx.strokeStyle = 'black'
        black.classList.add("active")
        green.classList.remove("active")
        blue.classList.remove("active")
        red.classList.remove("active")
    }

    red.onclick = function(){
        ctx.strokeStyle = 'red'
        red.classList.add("active")
        green.classList.remove("active")
        blue.classList.remove("active")
        black.classList.remove("active")
    }

    green.onclick = function(){
        ctx.strokeStyle = 'green'
        green.classList.add("active")
        red.classList.remove("active")
        blue.classList.remove("active")
        black.classList.remove("active")
    }

    blue.onclick = function(){
        ctx.strokeStyle = 'blue'
        blue.classList.add("active")
        red.classList.remove("active")
        green.classList.remove("active")
        black.classList.remove("active")
    }

    thin.onclick = function(){
        lineWidth = 5
        thin.classList.add("active")
        thick.classList.remove("active")
    }

    thick.onclick = function(){
        lineWidth = 10
        thick.classList.add("active")
        thin.classList.remove("active")
    }

    function changeSize(){
        var pageWidth = document.documentElement.clientWidth    // 页面宽度
        var pageHeight = document.documentElement.clientHeight  // 页面高度
        canvas.width = pageWidth
        canvas.height = pageHeight
    }

    window.onresize = function(){
        changeSize()
        ctx.strokeStyle = 'black'
        black.classList.add("active")
        green.classList.remove("active")
        blue.classList.remove("active")
        red.classList.remove("active")
    }

    // function drawCirlce(x, y, radius){
    //     ctx.beginPath()
    //     ctx.arc(x,y,radius,0,Math.PI*2)
    //     ctx.fill()
    //     ctx.closePath()
    // }

    function drawLine(x1, y1, x2, y2){
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2,y2)
        ctx.stroke()
        ctx.closePath()
    }

    function beginDraw(canvas){
        if(document.body.ontouchstart !== undefined){
            // 触屏设备
            canvas.ontouchstart = function(a){
                using = true
                var x = a.touches[0].clientX
                var y = a.touches[0].clientY
                lastPoint = {x:x, y:y}
                if(usingEraser) ctx.clearRect(x-5,y-5,lineWidth*2,lineWidth*2)
            }

            canvas.ontouchmove = function(a){
                if(using){
                    var x = a.touches[0].clientX
                    var y = a.touches[0].clientY
                    if(usingEraser){
                        ctx.clearRect(x,y,lineWidth*2,lineWidth*2)
                    }
                    else{                
                        var newPoint = {x:x, y:y}        
                        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                        lastPoint = newPoint               
                    }
                }
            }

            canvas.ontouchend = function(){
                using = false
            }
        }
        else{
            // 非触屏设备
            canvas.onmousedown = function(a){
                using = true
                var x = a.clientX
                var y = a.clientY
                lastPoint = {x:x, y:y}
                if(usingEraser) ctx.clearRect(x-5,y-5,lineWidth*2,lineWidth*2)       
            }

            canvas.onmousemove = function(a){
                if(using){
                    var x = a.clientX
                    var y = a.clientY
                    if(usingEraser){
                        ctx.clearRect(x,y,lineWidth*2,lineWidth*2)
                    }
                    else{                
                        var newPoint = {x:x, y:y}        
                        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                        lastPoint = newPoint               
                    }
                }
            }

            canvas.onmouseup = function(){
                using = false
            }
        } 
    }
}
