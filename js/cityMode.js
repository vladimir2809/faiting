var arrNameBuilding=["hospital",'rockingChair','house','arena','night club',
                     "stadium",'martialSection'];
var building={
    name:'',
    x:null,
    y:null,
    width:400,
    height:400,
}
var buildingArr=[];
var windowSelect={
    being:false,
    x:null,
    y:null,
    width:400,
    helght:300,
    listSelect: ['лежать 1 день',"лежать 2 дня","лежать 5 дней","лежать 10 дней"],
    start:function(){
        this.being=true;
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;

    },
    close:function()
    {
        this.being=false;
    },
    draw:function(){
        context.fillStyle="#000000";
        context.fillRect(this.x,this.y,this.width,this.height);
    },
    update:function (){

    },
}
var city={
    open:false,
    x:0,
    y:0,
    scale:0.3,
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
        let x=100;    
        let y=100;
        let dx=300;
        let dy=300;
        for (let i=0;i<arrNameBuilding.length;i++)
        {
            let buildingOne=clone(building);
            buildingOne.name=arrNameBuilding[i];
            buildingOne.x=x+Math.trunc(i/2)*(400+dx);
            buildingOne.y=y+i%2*(400+dy);
            buildingArr.push(buildingOne);

        }
        console.log(buildingArr);
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
    drawAll:function ()
    {
        context.fillStyle="#000000";
        context.fillRect(this.x,this.y,this.width,this.height);
       
        for (let i=0;i<this.imageArr.length;i++)
        {
            context.save();
            context.scale(this.scale,this.scale);
            context.drawImage(this.imageArr[i],buildingArr[i].x,buildingArr[i].y);

            context.restore();
        }
    },
    update: function (){
        if (mouseLeftClick()==true)
        {
            for (let i=0;i<buildingArr.length;i++)
            {
                if (mouseX>(buildingArr[i].x*this.scale) &&
                    mouseX<(buildingArr[i].x+buildingArr[i].width)*this.scale &&
                    mouseY>(buildingArr[i].y)*this.scale &&
                    mouseY<(buildingArr[i].y+buildingArr[i].height)*this.scale )
                    {
                       alert(buildingArr[i].name); 
                    }

            }
            
        }
    }
}