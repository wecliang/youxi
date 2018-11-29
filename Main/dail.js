import Sprite from "./sprite.js"





/**
 *   转盘对象   用于加载转盘数据
 * */

export  default  class  Dail extends Sprite{
    constructor(canvas_dail){

        super();
        this.fly = 0;               //转盘图片编号
        this.width = canvas_dail.width/2;           //转盘的宽度
        this.height = canvas_dail.height/2;          //转盘的高度
        this.x = -this.width/2;                //转盘的起始位置
        this.y = -this.height/2;                //转盘的起始高度
        this.visible = true;


        this.Dails()
    }

    //创建转盘对象
    Dails(){

    }
}