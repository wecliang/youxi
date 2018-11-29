import Data from "./data.js"


let data = new Data();
let img = new Image();
img.src = "Main/images/refresh.png";

export default  class  Bg{
    constructor(){

//        this.rende()//绘制游戏开始界面

    }

    render(ctx,width){
        ctx.fillStyle = "#000000";
        ctx.font = (22 * width)+"px Arial";
        ctx.fillText("得分："+data.score,ctx.width/2 - 50*width, 30*width);


    }
    gameOver(ctx,width){
        ctx.fillStyle = "#000000";
        ctx.font = (32*width)+"px Arial";
        ctx.fillText("GAME OVER!" , ctx.width/2 - 100*width, ctx.height/2-30*width);


        ctx.drawImage(
            img,
            ctx.width/2 - 50*width,
            ctx.height/2 + 100*width,
            100*width,
            100*width,
        );

        this.gameAnd = {
            x1 : ctx.width/2 - 50*width,
            x2 : ctx.width/2 + 50*width ,
            y1 : ctx.height/2 + 100*width,
            y2 : ctx.height/2 + 200*width,
        };

    }
}