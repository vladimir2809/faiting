
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
    name:'',
    numBuilding:null,
    x:null,
    y:null,
    width:500,
    height:300,
    xText:null,
    yText:null,
    dyText:35,
    xOffset:10,
    yOffset:70,
    yOffsetText:12,     
    selectHover:null,
    start:function(name){
        this.being=true;
        this.name=name;
        this.selectHover=0;
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;
        this.xText=this.x+this.xOffset;
        this.yText=this.y+this.yOffset;
        resetMouseLeft();
        for (let i=0;i<optionCity.length;i++)
        {
            if (optionCity[i].name==this.name)
            {
                this.numBuilding=i;
                break;
            }
        }
        if (this.being==true)  this.timerId=setInterval(function(){
            windowSelect.update();
            
        },50);
        console.log(optionCity);

    },
    close:function()
    {
        this.being=false;
    },
    draw:function(){
        context.fillStyle="#8888FF";
        context.fillRect(this.x,this.y,this.width,this.height);
  
        /*
        let x=this.x+10;
        let y=this.y+40;
        let dy=30;
        */
      //  context.fillStyle=color;
       // let heightText=fontSize;
        context.beginPath();
        context.fillStyle='rgb(0,255,0)';
        context.font = '24px Arial';
        let text='';

        for (let i=0;i<optionCity.length;i++)
        {
            if (optionCity[i].name==this.name)
            {
                text=optionCity[i].nameLocal;
                break;
            }
        }
        let metrics = context.measureText(text);
        context.fillText(text, this.x + this.width / 2 - metrics.width / 2,this.y+30);
        //console.log(this.name+' '+(this.x + this.width / 2 - metrics.width / 2)+' '+this.y+30);
   ///     context.fillText(this.listSelect[i].str,this.xText,
   //                         this.yText+this.dyText*i);
        if (this.selectHover!=null)
        {
            context.fillStyle='rgb(255,255,0)';
            context.fillRect(this.xText,
                        this.yText+this.selectHover*this.dyText-this.dyText/3-this.yOffsetText,
                        this.width-10/*-this.xText*/,this.dyText);
        }     

        context.fillStyle = 'rgb(0,255,0)';
        context.font = '24px Arial';
       
        for (let j = 0; j < optionCity[this.numBuilding].list.length;j++)
        {
        
            context.fillText(optionCity[this.numBuilding].list[j].str,this.xText,
                            this.yText+this.dyText*j);
            context.fillText(optionCity[this.numBuilding].list[j].price+'$',
                                this.x+this.width-50,
                                this.yText+this.dyText*j);
        }
       
        
        // console.log(this.xText+' '+this.yText+' '+this.dyText);
       // console.log(this.x+' '+this.y+' '+this.width+' '+this.height);
    },
    update:function (){
        let flagSelectMouse=false;
        for (let i=0;i<optionCity[this.numBuilding].list.length;i++)
        {
            if (mouseX>this.xText && mouseX<this.x+this.width)
            {
                if (mouseY>this.yText + i*this.dyText-this.dyText/3-this.yOffsetText&&
                    mouseY<this.yText + (i+1)*this.dyText-this.dyText/3-this.yOffsetText)
                {
                    this.selectHover=i;   
                    flagSelectMouse=true;
                    if (mouseLeftClick()==true)
                    {
                        //alert(545); 
                        this.addParamHuman(this.numBuilding,this.selectHover);
                    }
                }
            }
        } 
        if (flagSelectMouse==false)
        {
            if (keyUpDuration("ArrowUp",100))
            {
                //alert(1);
            
                    this.selectHover--;
            
                if (this.selectHover<0) this.selectHover=optionCity[this.numBuilding].list.length-1;
                //this.selectHover%=this.listSelect.length-1;
                //console.log(this.selectHover);
            }
            if (keyUpDuration("ArrowDown",100))
            {
                if (this.selectHover!=null)
                {
                    this.selectHover++;
                    this.selectHover%=optionCity[this.numBuilding].list.length;
                }
                else
                {
                    this.selectHover=0;
                }
            }
            if (keyUpDuration("Enter",100))
            {
                this.addParamHuman(this.numBuilding,this.selectHover);
            }

        }
        if (keyUpDuration("Escape",100))
        {
            this.close();
            clearInterval(this.timerId);
            city.mode='city';
        }
        //console.log('select');
    },
    addParamHuman:function(numBuilding,numSelect){
        if (optionCity[numBuilding].name!='nightClub'&&
            optionCity[numBuilding].name!='arena')
        {
            let count=0;
            for(index in humanPlayerParam)
            {
                humanPlayerParam[index]+=optionCity[numBuilding].list[numSelect].addParam[count];
                count++;
            }
        }
    }
}

var city={
    open:false,
    x:0,
    y:0,
    scale:0.3,
    mode:'city',
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
        let y=400;
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
        clearInterval(this.timerId);
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
        context.fillStyle = 'rgb(0,255,255)';
        context.font = '20px Arial';
        let y=30;
        let x=30;
        let dx=25;
        context.fillText("Сила: "+humanPlayerParam.power,x,y);
        context.fillText("Выносливость: "+humanPlayerParam.endurance,x,y+dx);
        context.fillText("Скорость: "+humanPlayerParam.speedMove,x,y+dx*2);
        
        
        if (this.mode=='select')
        {
            windowSelect.draw();
           
        }
    },
    update: function (){
        if (this.mode=='city' && mouseLeftClick()==true)
        {
            for (let i=0;i<buildingArr.length;i++)
            {
                if (mouseX>(buildingArr[i].x*this.scale) &&
                    mouseX<(buildingArr[i].x+buildingArr[i].width)*this.scale &&
                    mouseY>(buildingArr[i].y)*this.scale &&
                    mouseY<(buildingArr[i].y+buildingArr[i].height)*this.scale )
                    {
                       //alert(buildingArr[i].name); 
                       windowSelect.start(buildingArr[i].name);
                       this.mode='select';
                    }

            }
            
        }
        //console.log('city');
        
    }
}