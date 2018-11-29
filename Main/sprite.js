

let frame = [];
for(let i=0; i<10; i++){
    frame[i] = 0;
}
frames(0);
// 提前加载图片对象  方便后期调用
function frames(i){
    if(i>1) return;

    let img = new Image();
    switch(i){
        case 0: img.src = "Main/images/dail.png"; break;
        case 1: img.src = "Main/images/fly_cutter.png"; break;
    }
    img.onload = function () {
        frame.splice(i,1,img);
        frames(i+1);
    };

}

export  default  class Sprite{
    constructor(){

    }

    // 渲染游戏离屏对象
    drawToCanvasElm(canvas){
        let that = this;
        if(!frame[that.fly]){
            setTimeout( function (){
                that.drawToCanvasElm(canvas);
            }, 100);
            return;
        }

            canvas.drawImage(
                frame[that.fly],
                that.x,
                that.y,
                that.width,
                that.height,
            );
    }




    //渲染游戏图片
    drawToCanvas(ctx){
        if(!this.visible || !frame[this.fly]) return; //判断对象状态和图片是否加载完成。
        let that = this;

            ctx.drawImage(
                frame[that.fly],
                that.x,
                that.y,
                that.width,
                that.height,
            );


    }

}