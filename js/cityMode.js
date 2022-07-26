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
    buttonExit:{
        x:null,
        y:null,
        width:30,
        height:30,
        text:'X',
    },
    start:function(name){
        this.being=true;
        this.name=name;
        this.selectHover=0;
        this.x=screenWidth/2-this.width/2;
        this.y=screenHeight/2-this.height/2;
        this.xText=this.x+this.xOffset;
        this.yText=this.y+this.yOffset;
        this.buttonExit.x=this.x+this.width-this.buttonExit.width;
        this.buttonExit.y=this.y;
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
        clearInterval(this.timerId);
        //clearInterval(this.timerId);
        city.mode='city';
        //mode='city';
        resetMouseLeft();
    },
    draw:function(){
        if (this.being==true)
        {
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
            
                context.fillText(optionCity[this.numBuilding].list[j].str,this.xText+10,
                                this.yText+this.dyText*j); 
                let text2=optionCity[this.numBuilding].list[j].price+'';
                let metrics2 = context.measureText(text2);
                if (optionCity[this.numBuilding].name=='nightClub')
                {
                    context.fillText('за +'+text2+'$',this.x+this.width-metrics2.width-70,
                                    this.yText+this.dyText*j);
                }
                else
                {
                    context.fillText(text2+'$',this.x+this.width-metrics2.width-20,
                                    this.yText+this.dyText*j);
                }
            }
            context.fillStyle="#FFFF00";
            context.fillRect(this.buttonExit.x,this.buttonExit.y,
                            this.buttonExit.width,this.buttonExit.height);
            context.fillStyle="#FF0000";
            context.fillText(this.buttonExit.text,this.buttonExit.x+7,this.buttonExit.y+23);
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
                      //  this.addParamHuman(this.numBuilding,this.selectHover);
                        this.applySelect(this.numBuilding,this.selectHover);
                       // this.close();
                    }
                }
                if (mouseX>this.buttonExit.x && mouseX<this.buttonExit.x+this.buttonExit.width&&
                    mouseY>this.buttonExit.y && mouseY<this.buttonExit.y+this.buttonExit.height)
                {
                    if (mouseLeftClick()==true)
                    {
                        this.close();
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
                this.applySelect(this.numBuilding,this.selectHover);
                
            }

        }
        if (keyUpDuration("Escape",100))
        {
            this.close();
           
        }
        //console.log('select');
    },
    applySelect:function(numBuilding,numSelect)
    {
        if (buildingArr[this.numBuilding].name=="rockingChair"||
                buildingArr[this.numBuilding].name=="stadium"||
                buildingArr[this.numBuilding].name=="martialSection")
        {
            
            this.addParamHuman(numBuilding,numSelect);
            saveDataGame();
        }
        else if (buildingArr[numBuilding].name=="nightClub")
        {
            modeGame='fightClub';
            switch (numSelect)
            {
                case 0: {modeGameOption.countOponent=2}break;
                case 1: {modeGameOption.countOponent=4}break;
                case 2: {modeGameOption.countOponent=6}break;
                case 3: {modeGameOption.countOponent=8}break;
            }
            modeGameOption.apply=false;
            modeGameOption.numSelect=numSelect;
            console.log (modeGameOption.countOponent);
            
            this.close();
            city.close();
        }
        else if (buildingArr[numBuilding].name=="arena"&&
                money>=optionCity[numBuilding].list[numSelect].price)
        {
            if (numSelect!=4)
            {
                modeGame='fightArena';
                //modeGameOption.countOponent=4;
            }
            else if( numSelect==4)
            {
                modeGame='fightChampion';
                //alert(11);
            }
            modeGameOption.numSelect=numSelect;
            modeGameOption.apply=false; 
            modeGameOption.numFight=1;
            money-=optionCity[numBuilding].list[numSelect].price;
            this.close();
            city.close();
        }

    },
    addParamHuman:function(numBuilding,numSelect){
        let flagMax=false;
        if (optionCity[numBuilding].name!='nightClub'&&
            optionCity[numBuilding].name!='arena'&&
            money>=optionCity[numBuilding].list[numSelect].price)
        {
            let count=0;
            for(index in humanPlayerParam)
            {
                let add=optionCity[numBuilding].list[numSelect].addParam[count];
                if (humanPlayerParam[index]+add>maxParam[index])
                {
                    humanPlayerParam[index]=maxParam[index];
                    flagMax=true;
                }
                else
                {
                    humanPlayerParam[index]+=add;
                }
                count++;
            }
            if (flagMax==false)
            {
                money-=optionCity[numBuilding].list[numSelect].price;
                day++;
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
        resetMouseLeft();
    },
    start:function (){
        this.open=true;
        this.mode='city';
        humanBlue.HP=maxHpAndEnergy;
        humanBlue.energy=maxHpAndEnergy;
        resetMouseLeft();
        if (this.open==true)  this.timerId=setInterval(function(){
            city.update();
               
            
        },50);
    },
  
    close: function (){
        clearInterval(this.timerId);
       // pause=false;
        this.open=false;
      //  clearInterval(this.timerId);
    },
    draw:function ()
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
        context.fillStyle = 'rgb(0,255,0)';
        context.font = '25px Arial';
        context.fillText(money+'$',this.x+this.width-100,50);
        context.fillText("День: "+day,this.x+this.width-300,50);
        if (this.mode=='select')
        {
            windowSelect.draw();
           
        }
    },
    update: function (){
        if (this.mode=='city' && mouseLeftClick()==true)
        {
            console.log('start City');
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