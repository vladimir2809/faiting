var context;
var canvas;
var numOpt = 0;
var numOptHuman=2;
var screenWidth = 800;
var screenHeight = 600;
var timeNow = 0;
var maxHpAndEnergy = 1000;
var gameOver = 0;// если 0 - игра продолжается, 1 - победил синий,2 - победил красный 
var gameOverTime=null;
var imageHuman=null;
var modeGame='fight';
var countOponent=null;
var numFight=null;
var gameOverText='';
// var countMove=0;
// var countSR=0;
var speedCount=0;
var modeGameOption={
    countOponent:null,
    apply:false,
    numSelect:null,
    numFight:null,
}
var countWinRed=0;
var countWinBlue=0;
var money=100;
var day=1;
var imageArr=[];
var maxParam={
    power:100,
    endyrance:100,
    speedMove:100,
}

var humanPlayerParam={
    power:1,// сила втаки
    endurance:1,// выносливость
    speedMove:1,// скорость движений


};

window.addEventListener('load', function () { 
    create();
    setInterval(update,16); 
    setInterval(drawAll,16);
});
var Line={
    x:null,
    y:null,
    x1:null,
    y1:null,
    length:null,
    angle:0,
    select:false,
}
var humanBlue;
var humanRed;
var Human={
    name:'',
    x:100,
    y:263,
    xBuffer:100,
    xStart:100,
    hitMade:0,// УДАР ПРОИЗВЕДЕН 
    timeHitMe: 0,
    countMove:0,
	dx:0,
	dy:0,
    power:null,// сила втаки
    endurance:null,// выносливость
    speedMove:null,// скорость движений
    speed: 100,
    downHP: 0,
    downEnergy:0,
    selectFrame:0,
    SR: 0,// выбор приема
    time:0,
    xTime:0,
    timeNow:0,
    angleArr:[
        -90,
        45,
        135,
        90,
        90,
        45,
        135,
        -15,
        -15,
        -90
    ],

    lineArr:[],
    
}
function create()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    let time=new Date().getTime();
    srand(time);
    initKeyboardAndMouse(['ArrowLeft','Space','Enter','ArrowRight',
                            'ArrowUp','ArrowDown', 'ControlLeft',"KeyW"
                            ,"KeyD","KeyS","KeyA","KeyM",'NumpadAdd','NumpadSubtract',
                        'Minus','Equal']); 
    imageHuman= new Image();
    imageHuman.src = 'img/imageHuman.png';
    imageHuman.onload = function () {
        console.log ('Изображение human успешно загружено!');
        //imageLoad = true;
    } 
    imageHuman.onerror = function () {
        alert("во время загрузки произошла ошибка");
        //alert(pair[0].name);

    } 
    for (let i=0;i<5;i++)
    {
        imageArr[i]=new Image();
        imageArr[i].src='img/image'+(i+1)+'.png';
        imageArr[i].onload=function(){
            console.log ('Изображение image'+(i+1)+' успешно загружено!');
        }
        imageArr[i].onerror = function () {
            alert("во время загрузки произошла ошибка");
            //alert(pair[0].name);
    
        }
        
    }
    city.init(imageArr,imageHuman);
    humanBlue=JSON.parse(JSON.stringify(Human));
    humanRed=JSON.parse(JSON.stringify(Human));
    humanBlue.x=screenWidth/2-screenWidth/4;
    humanRed.x=screenWidth/2+screenWidth/4;
//    humanRed.x = 300;
    humanBlue.name='Vladimir';
    humanRed.name=optionHuman[numOptHuman].name;

    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
    humanBlue.HP = maxHpAndEnergy;//* 0.1;
    humanRed.HP = maxHpAndEnergy;//* 0.1;
    humanBlue.energy = maxHpAndEnergy;
    humanRed.energy = maxHpAndEnergy;
    for (let index in humanPlayerParam)
    {
        for (let indexHuman in humanBlue)
        {
            if (index==indexHuman)
            {
                humanBlue[indexHuman]=humanPlayerParam[index];
            }
        }
    }
    for (let index in optionHuman[numOptHuman])
    {
        for (let indexHuman in humanRed)
        {
            if (index==indexHuman)
            {
                humanRed[indexHuman]=optionHuman[numOptHuman][index];
            }
        }
    }
    console.log(humanBlue);
}
function createHumansForFightClub()
{
    humanBlue.x=screenWidth/2-screenWidth/4;
    humanRed.x=screenWidth/2+screenWidth/4;
    humanBlue.name='Vladimir';
    numOptHuman=randomInteger(0,6);
    humanRed.name=optionHuman[numOptHuman].name;

    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
  //  humanBlue.HP = maxHpAndEnergy;//* 0.1;
    humanRed.HP = maxHpAndEnergy*randomInteger(1,60)/100;//* 0.1;
    //humanBlue.energy = maxHpAndEnergy;
    humanRed.energy = maxHpAndEnergy*randomInteger(1,60)/100;
    for (let index in humanPlayerParam)
    {
        for (let indexHuman in humanBlue)
        {
            if (index==indexHuman)
            {
                humanBlue[indexHuman]=humanPlayerParam[index];
            }
        }
    }
    for (let index in optionHuman[numOptHuman])
    {
        for (let indexHuman in humanRed)
        {
            if (index==indexHuman)
            {
                humanRed[indexHuman]=optionHuman[numOptHuman][index];
            }
        }
    }
}
function createHumansForFightArena()
{
    humanBlue.x=screenWidth/2-screenWidth/8;
    humanRed.x=screenWidth/2+screenWidth/8;
    humanBlue.name='Vladimir';
    //numFight=modeGameOption.numFight;
    let numSelect=modeGameOption.numSelect;
    numOptHuman=(numSelect)*3+numFight-1;
    humanRed.name=optionHuman[numOptHuman].name;

    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
    humanBlue.HP = maxHpAndEnergy;//* 0.1;
    humanRed.HP = maxHpAndEnergy;//* 0.1;
    humanBlue.energy = maxHpAndEnergy;
    humanRed.energy = maxHpAndEnergy;
    for (let index in humanPlayerParam)
    {
        for (let indexHuman in humanBlue)
        {
            if (index==indexHuman)
            {
                humanBlue[indexHuman]=humanPlayerParam[index];
            }
        }
    }
    for (let index in optionHuman[numOptHuman])
    {
        for (let indexHuman in humanRed)
        {
            if (index==indexHuman)
            {
                humanRed[indexHuman]=optionHuman[numOptHuman][index];
            }
        }
    }
}
function calcLineInHuman(x,y,angle,length)// добавить линию 
{
    var line=JSON.parse(JSON.stringify(Line));//clone(Line);
    
    line.angle=angle;
    line.length=length;
    line.x=Math.floor(x);
    line.y=Math.floor(y);
    line.x1=Math.floor(Math.cos(pi*(line.angle)/180)*line.length+line.x);
    line.y1=Math.floor(Math.sin(pi*(line.angle)/180)*line.length+line.y);
    //addPointData(line.x1,line.y1);
    return line;
    //arrHumanLine.push(line);
    
}
function calcArrLine(x,y,angleArr,scale=0.5)// расчитываем из массива углов массив линий
{
    let arrLine=[];
    arrLine.push(calcLineInHuman(x,y,angleArr[0],
                    dataLine.lengthArr[0]*scale))//1
    //2
    arrLine.push(calcLineInHuman(x,y,angleArr[1],
                    dataLine.lengthArr[1]*scale));
    //3
    arrLine.push(calcLineInHuman(x,y,angleArr[2],
                    dataLine.lengthArr[2]*scale));
    ///4
    arrLine.push(calcLineInHuman(arrLine[1].x1,arrLine[1].y1, filtrAngle(angleArr[3]),dataLine.lengthArr[3]*scale));
    //5
    arrLine.push(calcLineInHuman(arrLine[2].x1,arrLine[2].y1,
                    filtrAngle(angleArr[4]),
                    dataLine.lengthArr[4]*scale));
    //6
    arrLine.push(calcLineInHuman(arrLine[0].x1,arrLine[0].y1,
                    filtrAngle(angleArr[5]),
                    dataLine.lengthArr[5]*scale));
    //7
   arrLine.push( calcLineInHuman(arrLine[0].x1,arrLine[0].y1,
                    filtrAngle(angleArr[6]),
                    dataLine.lengthArr[6]*scale));
    //8
   arrLine.push( calcLineInHuman(arrLine[5].x1,arrLine[5].y1,
        filtrAngle(angleArr[7]),
                    dataLine.lengthArr[7]*scale));
                    
    //9
    arrLine.push(calcLineInHuman(arrLine[6].x1,arrLine[6].y1,
        filtrAngle( angleArr[8]),
                    dataLine.lengthArr[8]*scale));
    //10
    arrLine.push(  calcLineInHuman(arrLine[0].x1,arrLine[0].y1,
        filtrAngle(angleArr[9]),
                    dataLine.lengthArr[9]*scale));
    return arrLine;
}
function drawAll()
{
    if (city.open==false)
    {  
        context.fillStyle='rgb(210,210,210)';
        context.fillRect(0,0,canvas.width,canvas.height);// очистка экрана
        context.beginPath();
        context.strokeStyle='rgb(0,0,0)';
        context.moveTo(1,canvas.height/2);
        context.lineTo(canvas.width,canvas.height/2 );
        context.stroke();
        drawHuman(humanBlue,'Blue');
        drawHuman(humanRed, "Red");
        //context.drawImage(imageHuman,100,100);
        //if (humanBlue.HP >= 0) humanBlue.HP -= 5.9; else humanBlue.HP = maxHpAndEnergy;
        //if (humanBlue.energy >= 0) humanBlue.energy -= 5.9; else humanBlue.energy= maxHpAndEnergy;
        drawStrip(30, 30,  maxHpAndEnergy, maxHpAndEnergy, 0, 'Red');
        drawStrip(30, 30, humanBlue.HP, maxHpAndEnergy, 0, 'Green');
        drawStrip(screenWidth-screenWidth * 0.4 - 30, 30,  maxHpAndEnergy, maxHpAndEnergy, 0, 'Red');
        drawStrip(screenWidth-screenWidth * 0.4 - 30, 30, humanRed.HP, maxHpAndEnergy, 1, 'Green');
        drawStrip(30, 7, humanBlue.energy, maxHpAndEnergy, 0, 'Blue');
        drawStrip(screenWidth-screenWidth * 0.4 - 30, 7, humanRed.energy, maxHpAndEnergy, 1, 'Blue');
        let y=100;
        let x=30;
        let dx=25;
        context.fillStyle = 'rgb(255,255,255)';
        context.font = '20px Arial';
        context.fillText(humanBlue.name,x,y-dx);
        context.fillText(humanRed.name,screenWidth-250,y-dx);
        context.fillStyle = 'rgb(0,255,255)';
        context.fillText("Сила: "+humanBlue.power,x,y);
        context.fillText("Выносливость: "+humanBlue.endurance,x,y+dx);
        context.fillText("Скорость: "+humanBlue.speedMove,x,y+dx*2);
        x=screenWidth-250;
        context.fillText("Сила: "+humanRed.power,x,y);
        context.fillText("Выносливость: "+humanRed.endurance,x,y+dx);
        context.fillText("Скорость: "+humanRed.speedMove,x,y+dx*2);
        context.fillStyle = 'rgb(255,0,0)';
        context.font = '20px Arial';
        x=370;
        context.fillText(countWinBlue+'',x,100);
        context.fillText(countWinRed+'',x+40,100);
        x=370;
        context.fillText(Math.trunc(humanBlue.speed)+'',x,140);
        context.fillText(Math.trunc(humanRed.speed)+'',x+40,140);
        if (gameOver!=0) 
        {
            let text = gameOver == 1 ? 'Победил синий' : 'Победил красный';
            let color = gameOver == 1 ? "Blue" : "Red";
            drawTextCenterScreen(text, "Arial", 40, color,screenHeight/2-30);
        }
        if (gameOverText!='')
        {
            let color = gameOver == 1 ? "Blue" : "Red";
            drawTextCenterScreen(gameOverText, "Arial", 30, color,screenHeight/2+10);

        }
    }else if (city.open==true)
    {
        city.draw();
    }
}
function drawStrip(x,y,value,max,side,color)// нарисовать полоску
{
    context.fillStyle=color;
    let height = 20;
    let width = screenWidth * 0.4;
    if (side==0)
    {
        if (max>0 && value>0) context.fillRect(x,y,width*(value/max),height);
    }
    if (side==1)
    {
        if (max > 0 && value>0) context.fillRect(x+(width-(width * (value/max))), y, width * (value/max ), height);
    }
}
function drawHuman(human,color)// нарисовать человека
{
    context.strokeStyle=color;
    for (let i=0;i<humanBlue.lineArr.length;i++)
    {
        let x=human.lineArr[i].x;
        let y=human.lineArr[i].y;
        let x1=human.lineArr[i].x1;
        let y1=human.lineArr[i].y1;
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x1,y1 );
        context.stroke();
        if (i==human.lineArr.length-1)//рисуем голову
        { 
            let sizeHead=7;
            let xx=Math.cos(pi*(human.angleArr[i])/180)*(sizeHead+human.lineArr[i].length)+
                                        human.lineArr[i].x;
            let yy = Math.sin(pi * (human.angleArr[i]) / 180) * (sizeHead + human.lineArr[i].length) +
                                        human.lineArr[i].y;                    
            context.beginPath()
            context.arc(xx,yy, sizeHead,0,2*pi);
            context.stroke();
        }
    }
}
function drawTextCenterScreen(text,font,fontSize,color='rgb(255,128,0)',yText=null)// нарисоваать текст по середине экрана
{
    context.fillStyle=color;
    let heightText=fontSize;
    context.beginPath();
    context.font = fontSize+'px '+font;;
    let metrics = context.measureText(text);
    
    let x=1;
    let y=1;
    let width=screenWidth;
   // context.strokeRect(this.widthTab*i,this.y,this.widthTab,20);
    context.fillText(text, x + width / 2 - metrics.width / 2, yText == null ? y + screenHeight / 2 + fontSize / 3 : yText);
}
function update()
{
	 //updateLineHuman(100,263,1);
	timeNow=new Date().getTime();
    if (keyUpDuration('KeyM',500))
    {
       // alert(565);
        modeGame='city';
        
        city.start();

    }
    if (modeGame=='fightClub' && modeGameOption.apply==false)
    {
        countOponent=modeGameOption.countOponent;
        modeGameOption.apply=true;
        console.log('checking');
        createHumansForFightClub();
    }
    if (modeGame=='fightArena' && modeGameOption.apply==false)
    {
        modeGameOption.apply=true;
        numFight=modeGameOption.numFight;
        createHumansForFightArena();
    }
    if (gameOver==0 && city.open==false)// если игра идет
    {
        let dist = 35;
        ///  если нажата кнопка на клавитатуре условие действия синего
	    if (checkPressKey('ArrowRight') && humanBlue.SR!= 1&& humanBlue.x<humanRed.x-dist)
	    {
       //     alert(5);
		    humanBlue.SR=1;
	    }
	    if (checkPressKey('ArrowLeft') && humanBlue.SR!=2 && humanBlue.x>40)
	    {
		    humanBlue.SR=2;
	    }
	    if (keyUpDuration('KeyS',50) && humanBlue.SR!=3)
	    {
		    humanBlue.SR=3;
            humanBlue.energy -= option[numOpt].downEnergyPanch;
	    }
        if (keyUpDuration('KeyA',50) && humanBlue.SR!=4)
	    {
		    humanBlue.SR=4;
            humanBlue.energy -= option[numOpt].downEnergyKick;
	    }
        if (keyUpDuration('KeyD',50) && humanBlue.SR!=5)
	    {
		    humanBlue.SR=5;
            humanBlue.energy -= option[numOpt].downEnergyKickUp;
	    }
        if (keyUpDuration('NumpadAdd',50))
        {
            humanBlue.speedMove+=10;
            if (humanBlue.speedMove>100) humanBlue.speedMove=100;

        }
        if (keyUpDuration('Minus',50))
        {
            humanBlue.energy-=100;
            if (humanBlue.energy<1) humanBlue.energy=1;
        }
        if (keyUpDuration('Equal',50))
        {
            humanBlue.energy+=100;
            if (humanBlue.energy>maxHpAndEnergy) humanBlue.energy=maxHpAndEnergy;

        }
        if (keyUpDuration('NumpadSubtract',50))
        {
            humanBlue.speedMove-=10;
            if (humanBlue.speedMove<1) humanBlue.speedMove=1;
        }
        // управление красным
        let dist2=humanRed.x-humanBlue.x;
        controllHuman(humanRed,'red',dist2);
        controllHuman(humanBlue,'blue',dist2);
        // обновление состойний человечков
        updateHuman(humanBlue, actionBlue); 
        updateHuman(humanRed, actionRed);
        let mult = 1.5;
        if (humanRed.hitMade==0)// если синий ударил красного
        {
            if (humanBlue.SR == 3 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                humanRed.downHP = option[numOpt].downHitPanch*(1+humanBlue.power/100); 
            }
            if (humanBlue.SR == 4 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                humanRed.downHP = option[numOpt].downHitKick*(1+humanBlue.power/100); 
                if (humanRed.energy > option[numOpt].downEnergyKickRival)
                {
                    humanRed.downEnergy = option[numOpt].downEnergyKickRival;
                }
            }
            if (humanBlue.SR == 5 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                humanRed.downHP = option[numOpt].downHitKickUp*(1+humanBlue.power/100);
            }  
            if (humanRed.downHP>0) humanRed.hitMade = 1;
        }
        if(humanBlue.hitMade==0) // если красный ударил синего
        {
            if (humanRed.SR == 3 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                humanBlue.downHP = option[numOpt].downHitPanch*(1+humanRed.power/100);
            }
            if (humanRed.SR == 4 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                humanBlue.downHP = option[numOpt].downHitKick*(1+humanRed.power/100); 
                if (humanBlue.energy > option[numOpt].downEnergyKickRival)
                {
                    humanBlue.downEnergy = option[numOpt].downEnergyKickRival;
                }

            }
            if (humanRed.SR == 5 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                humanBlue.downHP = option[numOpt].downHitKickUp*(1+humanRed.power/100);  
            }
            if (humanBlue.downHP > 0)  humanBlue.hitMade = 1;
        } 
      
        // сброс флага атаки 
        if (humanBlue.SR == 0 && humanBlue.selectFrame == 0) humanRed.hitMade = 0;
        if (humanRed.SR == 0 && humanRed.selectFrame == 0) humanBlue.hitMade = 0;
        // условие конца игры
        if (humanBlue.HP <= 0) 
        {
            gameOver = 2; 
            countWinRed++;
            if (modeGame=='fight')
            {
                gameOverText='Вы проиграли. Попробуйте еще раз!';
            }
            if (modeGame=='fightArena')
            {
                gameOverText='Вы проиграли. И едите обратно домой!';
            }
            if (modeGame=='fightClub')
            {
                gameOverText='Сегодня вам не удалось заработать денег.';
            }
        }
        if (humanRed.HP <= 0) 
        {
            gameOver = 1;
            if (modeGame=='fight')
            {
                let reward=100;
                gameOverText='Это выша первая победа. '+reward+'$ теперь ваши.';
            }
            if (modeGame=='fightArena')
            {
                if (numFight<3)
                {
                    gameOverText='Вы прошли в следующий тур';
                }
                else
                {
                    let reward=optionCity[1].list[modeGameOption.numSelect].reward;
                    gameOverText='Вы победитель турнира и забираете приз '+reward+'$';
                }
            }
            if (modeGame=='fightClub')
            {
                
                if (countOponent>1)
                {
                    let endText='';
                    switch (countOponent-1)
                    {
                        case 1: endText="час"; break;
                        case 2: case 3: case 4: endText="часa"; break;
                        case 5: case 6: case 7: case 8: endText="часов"; break;
                    }
                    
                    gameOverText='Вам осталось прорабатать '+(countOponent-1)+' '+endText;
                }
                else
                {
                    let reward=optionCity[2].list[modeGameOption.numSelect].price;
                    gameOverText='Вы успешно отработали и заработали '+reward+'$';
                }
            }
            countWinBlue++;
        }
      //  console.log ('e Blue='+humanBlue.energy + ' e Red='+humanRed.energy + '');
        //console.log ('e Red='+humanRed.energy + '');
    }
    if (gameOver!=0) // если игра закончена
    {
        let timeNow=new Date().getTime();;
        if (gameOverTime==null)
        {
            gameOverTime=timeNow;
        }
        if (checkPressKey('Space')==true || timeNow>gameOverTime+3000)
        {
            gameOverTime=null;
            if (gameOver==1)
            {
                gameOverText='';
                if (modeGame=='fight' )
                {
                    money+=100;
                    modeGame='city';
                    city.start();     
                }
                if (modeGame=='fightClub' )
                {
                    if (countOponent>0)
                    { 
                        console.log(countOponent);
                        countOponent--; 
                        if (countOponent<=0)
                        {
                            let add=optionCity[2].list[modeGameOption.numSelect].price;
                            money+=add;
                            day++;
                            modeGame='city';
                            city.start();   
                        }
                        else
                        {
                            createHumansForFightClub();
                        }
                    }
                }
                if (modeGame=='fightArena')
                {
                    console.log('dead');
                    if (numFight<3)
                    {  
                        numFight++;
                        
                        createHumansForFightArena();
                    }
                    else 
                    {
                       
                        money+=optionCity[1].list[modeGameOption.numSelect].reward;
                        
                        day++;
                        modeGame='city';
                        city.start();  
                    }
                }
            
            }  
            else
            {
                gameOverText='';
                if (modeGame=='fight')
                {
                        
                    create();
                }
                else
                {
                    modeGame='city';
                    city.start();
                    day++;
                }
            }
            gameOver = 0;
            //create();
            //alert(555);
        }
    }

 }
 function controllHuman(human,color,dist2,strategy=1)
 {
        let dist=35;
        if (human.SR == 0)
        {
            // randomInteger(0,100) < 10 ? randomInteger(3,5): 0;
          //  if (human.energy>maxHpAndEnergy*0.5)   human.SR = 1; else human.SR = 2;
          human.SR=1;
        }
        if (human.SR == 1 && dist2<dist) human.SR = 0;

        if (color=='red' && human.SR == 2 && human.x >screenWidth-dist) human.SR = 0;
        if (color=='blue' && human.SR == 2 && human.x <20) human.SR = 0;
        let rand = 0;
        if (human.SR == 0 && dist2<dist * 1.5) // условия атаки красным
        {
            rand = randomInteger(0, 100) < 100 ? randomInteger(3, 5) : 0
            let multEndurance=0.25;
            if (rand==3)// удар  рукой 
            {
                human.energy -= option[numOpt].downEnergyPanch*((100/human.endurance))*multEndurance;
                
            }
            if (rand==4)/// удар ногой вперед
            {
                human.energy -= option[numOpt].downEnergyKick*((100/human.endurance))*multEndurance;
            }
            if (rand==5)// удар ногой вверх
            {
                human.energy -= option[numOpt].downEnergyKickUp*((100/human.endurance))*multEndurance;
            }
            if (human.energy<0) human.energy=0;
            human.SR = rand;
        }
}
function updateHuman(human,actionList)
{

   
    
	if (human.selectFrame>=actionList[human.SR].length) // если выбранный кадр больше или равно кадрам в приеме
	{

		human.SR=0;
        human.selectFrame = 0;
        
        
	}
	// обработка перемещения
    let devisorMove=3;// делитель для перемешения
    if (human.selectFrame >0 /*&& human.SR>0*/ && human.selectFrame!=0)
    {
        human.xBuffer = actionList[human.SR][human.selectFrame ].xHuman-actionList[human.SR][human.selectFrame-1 ].xHuman;
        //console.log("dx "+human.dx + ' SR ' + human.SR +" sF " +human.selectFrame);
        if (human.xBuffer!=0)
        {
            human.dx =human.xBuffer/devisorMove;
         //   console.log(human.dx+'  '+human.selectFrame);
            human.xBuffer=0;
        }
        else
        {
            human.dx = 0;       
        }
    }
    else
    {
        human.dx = 0;
    }
    let summSpeed = 0;
    // востановление энергии при бездействии
    if (human.SR==0)
    {
        if (human.energy < maxHpAndEnergy) human.energy += 1 *0.15;
        else human.energy = maxHpAndEnergy;
    }
    let a = maxHpAndEnergy/100;
    let b = maxParam.speedMove/100;
    let speedCalc=(b*2-b)+(b*2-b)*human.speedMove/maxParam.speedMove;
    human.speed=(a*3-a)+(a*3-a)*human.energy/maxHpAndEnergy*speedCalc;
    //human.speed = 100*(add / human.energy/maxHpAndEnergy);//*((human.speedMove*5)/100) * mult;
    //human.speed*=2*human.speedMove/maxParam.speedMove ;
    summSpeed = a*3;//(add *6   );

    arrElemCopy(human.angleArr,actionList[human.SR][human.selectFrame].angleArr);
	human.lineArr=calcArrLine(Math.trunc(human.x),human.y,human.angleArr);
   
    //speedCount=(summSpeed*40)/(human.speed+1);
    human.timeNow=new Date().getTime();
    if (human.timeNow-human.time> (summSpeed*40)/(human.speed+1) && human.SR!=0)
    {
        if ((human.SR==1 || human.SR==2 ))
        {
            
            if ( human.countMove<devisorMove)// обновление при ходьбе
            {
                //console.log(human.timeNow-human.time+'count Move='+countMove);
                human.x += human.dx;   
            }
        }
        if (human.countMove>=devisorMove)//  обновления кадра анимации
        { 
            human.selectFrame++;
            human.countMove=0;
            /*
            if ((human.SR==1 || human.SR==2 )&& human.selectFrame>=actionList[human.SR].length) 
            {
                console.log('countMove='+countMove+" countSR="+countSR+' '+
                            speedCount);
                countMove=countSR=0;
            }
            */
            //countSR++;
            

        }
   
        human.countMove++;
        human.time = new Date().getTime();;
    }
    if ((human.downHP>0 || human.downEnergy>0) && human.hitMade==1)// если было попадание при ударе
    {
        human.HP -= human.downHP;
        human.energy -= human.downEnergy;
        human.downHP = 0;
        human.downEnergy = 0;
        human.hitMade = 2; //alert(585);
        human.timeHitMe = new Date().getTime();;
    }
}

