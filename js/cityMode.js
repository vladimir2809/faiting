var city={
    open:false,
    x:0,
    y:0,
    width:screenWidth,
    height:screenHeight,
    imageArr:[],
    humanImage:null,  
    timerId:null,
    init: function (arrImg, imgHuman){
        for (let i=0;i<arrImg.length;i++)
        {
            this.imageArr.push(arrImg[i]);
        }
        this.humanImage=imgHuman;
    },
    start:function (){
        this.open=true;
        if (this.open==true)  this.timerId=setInterval(function(){
            city.update();
            
        },50);
    },
  
    close: function (){
        clearInterval(this.timerId);
       // pause=false;
        this.open=false;
    },
    drawAll:function (){
        context.fillStyle="#000000";
        context.fillRect(this.x,this.y,this.width,this.height);
        for (let i=0;i<this.imageArr.length;i++)
        {
            context.drawImage(this.imageArr[i],i*500,0);
        }
    },
    update: function (){

    }
}