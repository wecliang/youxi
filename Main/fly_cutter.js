import Sprite from "./sprite.js"
import Data from "./data.js"

let data = new Data();


export default  class Fly_cutter extends Sprite{
    constructor(canvas){
        super();
        this.flys(canvas);
    }

    //写入飞刀参数
    flys(canvas){
        this.fly = 1;
        this.width = Math.floor(canvas.width/15);
        this.height = this.width*4;
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height - this.height*2;
        this.visible = true;

    }

    speed(){

    }

    updata(i){
        let that = this;

        that.y -= this.height/2;

        if(that.y + that.height <0){
            data.flys.splice(i,1);
        }


    }
}