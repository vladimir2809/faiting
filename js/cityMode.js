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
    name:'',
    x:null,
    y:null,
    width:400,
    height:300,
    xText:null,
    yText:null,
    dyText:35,
    xOffset:10,
    yOffset:70,
    yOffsetText:12,     
    selectHover:null,
    listSelect: [{str:'лежать 1 день',price:10},
                {str:'лежать 2 дня',price:20},
                {str:'лежать 5 дней',price:45},
                {str:'лежать 10 дней',price:80}, 
    ],
    start:function(name){
        this.being=true;
        this.name=name;
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;
        this.xText=this.x+this.xOffset;
        this.yText=this.y+this.yOffset;
        if (this.being==true)  this.timerId=setInterval(function(){
            windowSelect.update();
            
        },50);

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
        let metrics = context.measureText(this.name);
        context.fillText(this.name, this.x + this.width / 2 - metrics.width / 2,this.y+30);
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
        for (let i = 0; i < this.listSelect.length;i++)
        {
            
            context.fillText(this.listSelect[i].str,this.xText,
                            this.yText+this.dyText*i);
            context.fillText(this.listSelect[i].price+'$',this.x+this.width-50,
                                this.yText+this.dyText*i);
        }
        
        // console.log(this.xText+' '+this.yText+' '+this.dyText);
       // console.log(this.x+' '+this.y+' '+this.width+' '+this.height);
    },
    update:function (){
        let flagSelectMouse=false;
        for (let i=0;i<this.listSelect.length;i++)
        {
            if (mouseX>this.xText && mouseX<this.x+this.width)
            {
                if (mouseY>this.yText + i*this.dyText-this.dyText/3-this.yOffsetText&&
                    mouseY<this.yText + (i+1)*this.dyText-this.dyText/3-this.yOffsetText)
                {
                    this.selectHover=i;   
                    flagSelectMouse=true;
                }
            }
        } 
        if (flagSelectMouse==false)
        {
            if (keyUpDuration("ArrowUp",100))
            {
                //alert(1);
            
                    this.selectHover--;
            
                if (this.selectHover<0) this.selectHover=this.listSelect.length-1;
                //this.selectHover%=this.listSelect.length-1;
                //console.log(this.selectHover);
            }
            if (keyUpDuration("ArrowDown",100))
            {
                if (this.selectHover!=null)
                {
                    this.selectHover++;
                    this.selectHover%=this.listSelect.length;
                }
                else
                {
                    this.selectHover=0;
                }
            }
        }
    },
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
        if (this.mode=='select')
        {
            windowSelect.draw();
           
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
                       //alert(buildingArr[i].name); 
                       windowSelect.start(buildingArr[i].name);
                       this.mode='select';
                    }

            }
            
        }
        
    }
}