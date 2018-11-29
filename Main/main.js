import  Data from "./data.js"
import  Dail from  "./dail.js"
import  Fly  from  "./fly_cutter.js"
import  Bg   from  "./bg.js"


let data = new Data();


//获取canvas元素
let canvas = document.getElementById("canFly");

//创建画布对象
let ctx = canvas.getContext("2d");
ctx.width = canvas.width;
ctx.height = canvas.height;

//简单的屏幕适配  默认宽度比例为300
let width = 1;
if(canvas.width != 300){
    width = (canvas.width/300).toFixed(2);
    console.log(width)
}

//返回 0.015 —— -0.015
function run() {
    return Math.random()* 0.03 - 0.015;
}

export  default  class  Main{
    constructor(){
        this.aniId = 0;      //维护当前requestAnimationFrame的id
        this.initEvent();
        this.touched = false;

        //创建离屏对象
        this.canvas_dail = document.createElement("canvas");
        this.canvas_dail.width = canvas.width;
        this.canvas_dail.height = canvas.width;
        this.ctx_dail = this.canvas_dail.getContext("2d");
        this.ctx_dail.translate(canvas.width/2,canvas.width/2); //设置canvas中心点

        this.dail = new Dail(this.canvas_dail);
        this.fly = new Fly(canvas);
        this.bg = new Bg();

        this.statc();
    }

    // 游戏开始初始函数
    statc(){

        data.reset();
        ctx.fillStyle ="#00f000";
        // context.fillRect(0, 0, screenWidth * ratio, screenHeight * ratio);
        ctx.fillRect(0, 0, 300, 500);




        this.bindLoop = this.loop.bind(this);   //游戏循环对象
        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        );


        this.dail.drawToCanvasElm(this.ctx_dail);           //绘制离屏圆盘

    }
    //生成飞刀函数

    fly_Cutters(){
        let flys = new Fly(canvas);

        data.flys.push(flys);
    }

    //游戏结束  用户点击判断界面
    gameOver_click(x,y){
        let at1 = this.bg.gameAnd

        if(x>at1.x1 && x< at1.x2 && y>at1.y1 && y < at1.y2){
            data.reset();
        }

    }

    //根据飞刀改变 转盘速度
    dail_Speed(){
        let min = 0;
        let max = 0;
        let speed;
        data.dails.forEach(function (fly,i) {
            speed = ((fly.speed + Math.abs(fly.time*data.speed))%2.0);
            fly.speed = speed;
            fly.time = 0;
            if(speed <=1 ) min++;
            else max++;
        });
        if(min = max) return;
        speed = data.speed;
        data.speed = run();
        data.speed = data.speed.toFixed(3);
        if(speed * data.speed < 0){
            data.dails.forEach(function (fly ,i) {
                fly.speed = 2.0 - fly.speed;
            });
        }
        if( Math.abs(data.speed) < 0.001) data.speed = 0.001;
    }


    /**
     * 玩家响应手指的触摸事件
     */
    initEvent() {
        let that = this;
        var touchable = 'createTouch' in document;
        if(touchable){
            console.log("支持触摸事件");
            //玩家点击事件
            canvas.addEventListener("touchstart", function(e) {
                let x = e.touches[0].clientX-canvas.offsetLeft;
                let y = e.touches[0].clientY-canvas.offsetTop;
                that.fly_Cutters();              //发射飞刀;
                that.touched = true;
                if(data.gameOver){
                    that.gameOver_click(x,y)        //将坐标传入游戏结束界面
                }
            }.bind(that));
            //玩家滑动事件
            canvas.addEventListener('touchmove', function(e){
                e.preventDefault();
                let x = e.touches[0].clientX;
                let y = e.touches[0].clientY;
                console.log(x,y);
            }.bind(that));
            //玩家触摸结束事件
            canvas.addEventListener('touchend', function(e){
                e.preventDefault();
                that.touched = false;
            }.bind(that));
        }else {
            console.log("不支持触摸事件");
            canvas.onmousedown = function (e){
                let x = e.clientX - canvas.offsetLeft;
                let y = e.clientY - canvas.offsetTop;
                // console.log("按下",x,y);
                that.fly_Cutters();              //发射飞刀;
                that.touched = true;
                if(data.gameOver){
                    that.gameOver_click(x,y)        //将坐标传入游戏结束界面
                }
                
            };
            canvas.onmousemove = function (e) {
                if(!that.touched) return;
                let x = e.clientX - canvas.offsetLeft;
                let y = e.clientY - canvas.offsetTop;
                // console.log(x,y);

            };
            canvas.onmouseup = function (e) {
                // console.log("松开");
                that.touched = false;
            }
        }
    }

    // 对象碰撞检测
    collision(){
        let that = this;
        data.flys.forEach(function (item, i) {
            if(item.y < 170 * width){
                data.score += 1;
                // 对象没有被碰撞  将插入转盘
                item.x = -item.width/2;
                item.y = 20*width;https://github.com/https://github.com/
                item.speed = 0;           //当转盘速度改变时  记录上次速度。
                item.time = 0;           //用于判断飞刀旋转角度
                item.canvas_dail = document.createElement("canvas");
                item.canvas_dail.width = canvas.width;
                item.canvas_dail.height = canvas.width;
                item.ctx_dail = item.canvas_dail.getContext("2d");
                item.ctx_dail.translate(canvas.width/2,canvas.width/2);

                data.dails.push(item);
                let are = data.flys.splice(i,1);
                that.dail_Speed();               //根据游戏改变转盘速度
                return;
            }
            if(item.y < 170*width+item.height){
                // 对象进入检测区域
                data.dails.forEach(function (fly, i) {
                    //判断对象位置
                    let speed = ((fly.speed + Math.abs(fly.time*data.speed))%2.0).toFixed(2);
                    if( speed > 1.95 || speed < 0.03){
                        data.gameOver = true;
                    };
                });
            }

        });


    }



    update(){
        if(data.gameOver) return;

        let that = this;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        that.ctx_dail.clearRect(-150*width,-150*width,that.canvas_dail.width,that.canvas_dail.height);

        data.flys.forEach(function(item,i){
            item.updata(i);
        });
        data.dails.forEach(function (item, i) {
            item.ctx_dail.clearRect(-150*width,-150*width,item.canvas_dail.width,item.canvas_dail.height);
            item.time++;
           item.ctx_dail.rotate(data.speed * Math.PI);
        });

        that.collision();               //碰撞检测
        that.ctx_dail.rotate(data.speed * Math.PI);               //旋转dail离屏

    }

    render(){
        let that = this;

            that.fly.drawToCanvas(ctx);                        //绘制底部飞刀


            this.bg.render(ctx,width);                         //绘制游戏背景

            //渲染飞刀对象
            data.flys.forEach(function (item,i) {
                item.drawToCanvas(ctx);
            });

            data.dails.forEach(function (item,i){
                item.drawToCanvasElm(item.ctx_dail);
                ctx.drawImage(item.canvas_dail,0,0,canvas.width,canvas.width);
            });

            that.dail.drawToCanvasElm(that.ctx_dail);
            ctx.drawImage(that.canvas_dail,0,0,canvas.width,canvas.width);        //绘制离屏


            // 游戏结束  加载界面。
            if(data.gameOver){
                this.bg.gameOver(ctx,width);
            }
    }

    loop(){
        data.frame++;


        this.update();      //用于更新数据
        this.render();      //用于渲染数据

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }
}


