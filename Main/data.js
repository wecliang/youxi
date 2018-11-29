


/***
 * 检测Data 对象的加载   将之后的Data加载对象指向第一次加载的Data
 */
let instance;

//创建一个对象  用于保存游戏元素
export default  class Data{
    constructor(){

        if(instance) return instance;

        instance = this;
    }

    //加载每局游戏数据
    reset(){
        this.gameOver = false;   //游戏结束
        this.speed = 0.012;    //游戏旋转速度  2为一周
        this.frame = 0;    //游戏帧
        this.score = 0;    //用于加载游戏分数
        this.flys = [];    //用于加载飞刀
        this.dails = [];   //转盘上面的飞刀
    }
}

