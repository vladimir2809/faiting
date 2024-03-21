var context;
var canvas;
var numOpt = 0;
var numOptHuman=0;
var screenWidth = 800;
var screenHeight = 600;
var windowWidth=document.documentElement.clientWidth;
var windowHeight=document.documentElement.clientHeight;
var canvasWidth= windowWidth;
var canvasHeight= windowHeight;
var canvasWidthMore = null;
var timeNow = 0;
var countTimeAttack = 0;
var maxHP = 500/2;
var maxEnergy = 1000/2;
//var maxHpAndEnergy =1500// 500;
var gameOver = 0;// если 0 - игра продолжается, 1 - победил синий,2 - победил красный 
var gameOverTime=null;
var imageHuman=null;
var modeGame='fight';
var countOponent=null;
var numFight=null;
var gameOverText='';
var continueGame=false;
var pause=false;
var pauseGameBar = 0;
var missedKickBlue = 0;
var missedKickRed = 0;;
// var countMove=0;
// var countSR=0;
var speedCount=0;
var speedGameMult = 5;
var numBlueWarrior = 0;
var numRedWarrior = 0;
var numTest = 0;
var statData = [];
var nameArr = ['Brad','Maks','Victor','Sasha','Fred','Nikola','Artur','Vadim','Nike',];
var modeGameOption={
    countOponent:null,
    apply:false,
    numSelect:null,
    numFight:null,
}
var countWinRed=0;
var countWinBlue=0;
var money=0;
var day=1;
var imageArr=[];
var testHumanArr = [];
var maxParam={
    power:100,
    endurance:100,
    speedMove:100,
    protection:100,
}
var frequencyPanel={x:280,y:360,width:300,stepY:65,}
var frequencyAction={
    hitPanch:33, // вероятность удара рукой
    hitKick:33,// верроятность удара ногой прямо
    hitKickUp:33,// вероятность удара ногой вверх
}
var slidersFrequency = [];

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
    xHead:null,
    yHead:null,
    haedSize:7,
    hitMade:0,// УДАР ПРОИЗВЕДЕН 
    timeHitMe: 0,
    countMove:0,
	dx:0,
	dy:0,
    power:null,// сила втаки
    endurance:null,// выносливость
    speedMove:null,// скорость движений
    protection:null,//зашита
    speed: 100,
    downHP: 0,
    downEnergy:0,
    selectFrame:0,
    SR: 0,// выбор приема
    time:0,
    xTime:0,
    timeNow:0,
    timer:null,
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
window.onresize = function()
{
    updateSize()
    console.log("resize");
}
function updateSize()
{
    windowWidth=window.innerWidth//document.documentElement.clientWidth;
    windowHeight=window.innerHeight//document.documentElement.clientHeight;
    let mult = 1;
    if (windowWidth>windowHeight)
    {
        canvasWidth = /*canvas.width = */windowHeight*screenWidth/screenHeight;
        canvasHeight = /*canvas.height = */windowHeight;
        if (canvasWidth>=windowWidth)
        {
            mult = windowWidth/canvasWidth;
           // canvas.width =
                canvasWidth *= mult;
            //canvas.height =
                canvasHeight *= mult;
        }
        canvasWidthMore = true;
    }
    else
    {
        canvasWidthMore = false;
        canvasWidth = /*canvas.width*/  windowWidth;
        canvasHeight= /*canvas.height*/  windowWidth*screenHeight/screenWidth;
        //if (canvasHeight>=windowHeight)
        //{
        //    mult = windowHeight/canvasHeight ;
        //   // canvas.width =
        //        canvasWidth *= mult;
        //    //canvas.height =
        //        canvasHeight *= mult;
        //}
    }
    
    canvas.setAttribute('width',canvasWidth);
    canvas.setAttribute('height',canvasHeight);
    if (canvasWidthMore==false)
    {
        canvas.style.setProperty('left', '0px'); 
    }
    else
    {
        canvas.style.setProperty('left', (window.innerWidth - canvasWidth/*canvas.width*/)/2 + 'px'); 
    }

    canvas.style.setProperty('top', (window.innerHeight - canvasHeight/*canvas.height*/) / 2 + 'px'); 
    console.log( (window.innerHeight - canvasHeight/*canvas.height*/) / 2 + 'px')
    if (canvasWidthMore==true)
    {
        context.scale(windowHeight / screenHeight * mult, windowHeight / screenHeight * mult);   
        mouseMultX = windowHeight / screenHeight * mult;
        mouseMultY = windowHeight / screenHeight * mult;
    }
    else
    {
       context.scale(windowWidth/screenWidth,windowWidth/screenWidth);
       mouseMultX = windowWidth / screenWidth;
       mouseMultY = windowWidth / screenWidth;
    }
    //setOffsetMousePosXY((window.innerWidth - canvas.width)/2,
    //                        (window.innerHeight - canvas.height)/2);
    //camera.width = canvasWidth;
    //camera.height = canvasHeight;
}
function create()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    let time=new Date().getTime();
    srand(time);
    updateSize();
    initKeyboardAndMouse(['ArrowLeft','Space','Enter','ArrowRight',
                            'ArrowUp','ArrowDown', 'ControlLeft',"KeyW"
                            ,"KeyD","KeyS","KeyA","KeyM",'KeyV',"KeyT",'NumpadAdd','NumpadSubtract',
                        'Minus','Equal','Enter']); 
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
    for (let i=5;i<8;i++)
    {
        imageArr[i]=new Image();
        imageArr[i].src='img/hit'+(i-4)+'.png';
        imageArr[i].onload=function(){
            console.log ('Изображение hit'+(i-4)+' успешно загружено!');
        }
        imageArr[i].onerror = function () {
            alert("во время загрузки произошла ошибка");
            //alert(pair[0].name);
    
        }
        
    }
    city.init(imageArr,imageHuman);
    
    humanBlue=JSON.parse(JSON.stringify(Human));
    humanRed=JSON.parse(JSON.stringify(Human));
    startPositionHuman();
   // humanBlue.x=screenWidth/2-screenWidth/4;
    //humanRed.x=screenWidth/2+screenWidth/4;
//    humanRed.x = 300;
    humanBlue.name='Vladimir';
    humanRed.name=optionHuman[numOptHuman].name;

    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
    humanBlue.HP = maxHP;//* 0.1;
    humanRed.HP = maxHP;//* 0.1;
    humanBlue.energy = maxEnergy;
    humanRed.energy = maxEnergy;
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
    for (let i = 0; i < 3;i++)
    {
        let slider = new Slider(frequencyPanel.x,frequencyPanel.y+frequencyPanel.stepY*i+8,
                    frequencyPanel.width,50,1,100);
        slidersFrequency.push(slider);
        slidersFrequency[i].init();

    }
    console.log(humanBlue);
    humanBlue.timer = new timerIter();
    humanRed.timer = new timerIter();
    mainMenu.start();
}
function startPositionHuman()
{
    humanBlue.x=screenWidth/2-screenWidth/8;
    humanRed.x=screenWidth/2+screenWidth/8;
}
function createHumansForFightClub()
{
    startPositionHuman();
    humanBlue.name='Vladimir';
    numOptHuman=randomInteger(0,6);
    humanRed.name=optionHuman[numOptHuman].name;
    humanBlue.SR=0;
    humanRed.SR=0;
    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
  //  humanBlue.HP = maxHP;//* 0.1;
    humanRed.HP = maxHP*randomInteger(1,60)/100;//* 0.1;
    //humanBlue.energy = maxEnergy;
    humanRed.energy = maxEnergy*randomInteger(1,60)/100;
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
    startPositionHuman();
    humanBlue.name='Vladimir';
    //numFight=modeGameOption.numFight;
    let numSelect=modeGameOption.numSelect;
    numOptHuman=(numSelect)*3+numFight-1;
    console.log(numOptHuman)
    humanRed.name=optionHuman[numOptHuman].name;
    humanBlue.SR=0;
    humanRed.SR=0;
    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
    humanBlue.HP = maxHP;//* 0.1;
    humanRed.HP = maxHP;//* 0.1;
    humanBlue.energy = maxEnergy;
    humanRed.energy = maxEnergy;
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
function createHumansForFightTest(humanArr,numBlue,numRed)
{
    startPositionHuman();
   /* humanBlue.name=numBlue+optionHuman[numBlue].name;*/
    //numFight=modeGameOption.numFight;
    //let numSelect=modeGameOption.numSelect;
    //numOptHuman=numFight-1;
    console.log(numOptHuman)
   /* humanRed.name=numRed+optionHuman[numRed].name;*/
    humanBlue.SR=0;
    humanRed.SR=0;
    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
    humanBlue.HP = maxHP;//* 0.1;
    humanRed.HP = maxHP;//* 0.1;
    humanBlue.energy = maxEnergy;
    humanRed.energy = maxEnergy;
    for (let index in humanArr[numBlue])
    {
        for (let indexHuman in humanBlue)
        {
            if (index==indexHuman)
            {
                humanBlue[indexHuman]=humanArr[numBlue][index];
               // numBlueWarrior
            }
        }
    }
    for (let index in humanArr[numRed])
    {
        for (let indexHuman in humanRed)
        {
            if (index==indexHuman)
            {
                humanRed[indexHuman]=humanArr[numRed][index];
            }
        }
    }
    //humanRed.name=numRed+(optionHuman[numRed].name+'');
    //humanBlue.name=numBlue+optionHuman[numBlue].name+'';


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
    if(mainMenu.open==true)
    {
        mainMenu.draw();
    }
    else if (city.open==false)
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
        drawStrip(30, 30,  maxHP, maxHP, 0, 'Red');
        drawStrip(30, 30, humanBlue.HP, maxHP, 0, 'Green');
        drawStrip(screenWidth-screenWidth * 0.4 - 30, 30,  maxHP, maxHP, 0, 'Red');
        drawStrip(screenWidth-screenWidth * 0.4 - 30, 30, humanRed.HP, maxHP, 1, 'Green');
        drawStrip(30, 7, humanBlue.energy, maxEnergy, 0, 'Blue');
        drawStrip(screenWidth-screenWidth * 0.4 - 30, 7, humanRed.energy, maxEnergy, 1, 'Blue');
        let y=100;
        let x=30;
        let dx=25;
        context.fillStyle = 'rgb(255,255,255)';
        context.font = '20px Arial';
        context.fillText(numBlueWarrior+ humanBlue.name,x,y-dx);
        context.fillText(numRedWarrior+humanRed.name,screenWidth-250,y-dx);
        context.fillStyle = 'rgb(0,255,255)';
        context.fillText("Сила: "+humanBlue.power,x,y);
        context.fillText("Выносливость: "+humanBlue.endurance,x,y+dx);
        context.fillText("Скорость: "+humanBlue.speedMove,x,y+dx*2);
        context.fillText("Защита: "+humanBlue.protection,x,y+dx*3);
        x=screenWidth-250;
        context.fillText("Сила: "+humanRed.power,x,y);
        context.fillText("Выносливость: "+humanRed.endurance,x,y+dx);
        context.fillText("Скорость: "+humanRed.speedMove,x,y+dx*2);
        context.fillText("Защита: "+humanRed.protection,x,y+dx*3);

        context.fillStyle = 'rgb(255,0,0)';
        context.font = '20px Arial';
        x=370;
        context.fillText(countWinBlue+'',x,100);
        context.fillText(countWinRed+'',x+40,100);
        x=370;
        context.fillText(Math.trunc(humanBlue.speed)+'',x,140);
        context.fillText(Math.trunc(humanRed.speed)+'',x+40,140);
        context.fillText('missedRed: ' + missedKickRed + ' missedBlue: ' + missedKickBlue, 10, 300);
        let protectionBlue= humanBlue.protection * (humanBlue.energy / maxEnergy);
        let protectionRed= humanRed.protection * (humanRed.energy / maxEnergy);
        context.fillText('blueProt='+Math.trunc(protectionBlue),x,180);
        context.fillText('redProt='+Math.trunc(protectionRed),x,210);
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

        ///////////////////////////////////
        //рисовние вероятности ударавов
        //////////////////////////////////
        if (gameOver==0) 
        {
            context.strokeStyle = 'blue';
            context.strokeRect(frequencyPanel.x - 50 - 5, frequencyPanel.y - 10,
                            frequencyPanel.width + 50 +20 + 5*2,frequencyPanel.stepY*3);
            for (let i = 0; i < 3;i++)
            {
                slidersFrequency[i].draw();
                context.drawImage(imageArr[i+5],frequencyPanel.x-50,frequencyPanel.y+frequencyPanel.stepY*(i));
            }
            context.fillStyle='rgb(210,210,210)';
            context.fillRect(frequencyPanel.x-50,frequencyPanel.y-15-7,190,20);
            context.fillStyle = 'red';
            context.fillText('Вероятность ударов',frequencyPanel.x-50,frequencyPanel.y-7);
        }

        if (pause==true)
        {
            color= 'White';
            drawTextCenterScreen('Пауза', "Arial", 50, color,screenHeight/2-40);
            //context.fillText(countWinBlue+'',x,100);
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
    for (let i=0;i<human.lineArr.length;i++)
    {
        let x=human.lineArr[i].x;
        let y=human.lineArr[i].y;
        let x1=human.lineArr[i].x1;
        let y1=human.lineArr[i].y1;
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x1,y1 );
        context.stroke();
        // if (i==human.lineArr.length-1)//рисуем голову
        // { 
        //     let sizeHead=7;
        //     let xx=Math.cos(pi*(human.angleArr[i])/180)*(sizeHead+human.lineArr[i].length)+
        //                                 human.lineArr[i].x;
        //     let yy = Math.sin(pi * (human.angleArr[i]) / 180) * (sizeHead + human.lineArr[i].length) +
        //                                 human.lineArr[i].y;                    
        //     context.beginPath()
        //     context.arc(xx,yy, sizeHead,0,2*pi);
        //     context.stroke();
        // }
        let sizeHead=human.haedSize;
        context.beginPath()
        context.arc(human.xHead,human.yHead, sizeHead,0,2*pi);
        context.stroke();        

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
    if (keyUpDuration('Enter',50))
    {
        pause=!pause;
        //alert('pause');
    }
  

    if (modeGame=='fightClub' && modeGameOption.apply==false)
    {
        countOponent=modeGameOption.countOponent;
        modeGameOption.apply=true;
        console.log('checking');
        createHumansForFightClub();
    }
    if (keyUpDuration('KeyT',500))
    {
        // alert(565);
        modeGame='fightTest';
        numFight = 1;
        modeGameOption.apply = false;
        modeGameOption.numSelect = 0;///numSelect;
        city.close();
        createTestHumanArr(3, 10, 20);
        createHumansForFightTest(testHumanArr, 0,1);
        //alert(12);
       // modeGameOption.apply=true;
      //  numFight=modeGameOption.numFight;
    //    createHumansForFightArena();
        //saveDataGame();
        //city.start();
    
    }
    if ((modeGame=='fightArena'|| modeGame=='fightChampion' )&& modeGameOption.apply==false)
    {
        modeGameOption.apply=true;
        numFight=modeGameOption.numFight;
        createHumansForFightArena();
    }
    for (let i = 0; i < 3;i++)
    {
        slidersFrequency[i].update();
        //slidersFrequency[i].clickBar(function () {
        //    console.log(i+' '+slidersFrequency[i].value);
        //});
        
        if (pauseGameBar==0 && slidersFrequency[i].grabMouseBar==true)
        {
            //console.log(i+' '+slidersFrequency[i].value);
            pauseGameBar = 1;
        }
            
    }
    if (pauseGameBar==1)
    {
        pauseGameBar = 2;
        setTimeout(function () {
            pauseGameBar = 0;
            let summ = 0;
            for (let i = 0; i < 3;i++)
            {
                summ += slidersFrequency[i].value;
            }
            frequencyAction.hitPanch = slidersFrequency[0].value / summ;
            frequencyAction.hitKick = slidersFrequency[1].value / summ;
            frequencyAction.hitKickUp = slidersFrequency[2].value / summ;
            for (key in frequencyAction)
            {
                let value = Math.trunc(frequencyAction[key] * 100 + 0.5);
                frequencyAction[key] = value == 0 ? 1 : value;
            }
            console.log(summ,frequencyAction)
 /*           var frequencyAction={
                hitPanch:100,
                hitKick:100,
                hitKickUp:100,
            }*/
        },750);
    }
    if (gameOver==0 && city.open==false && pause==false && pauseGameBar==0 && mainMenu.open==false)// если игра идет
    {
        let dist = 35;
     
      
        if (keyUpDuration('KeyM',500))
        {
           // alert(565);
            modeGame='city';
            saveDataGame();
            city.start();
    
        }
   
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
        let multEndurance=Math.pow((1+(100-humanBlue.endurance)/100)*0.5,2);//0.25;
        //human.energy -= option[numOpt].downEnergyPanch*multEndurance;
	    if (keyUpDuration('KeyS',50) && humanBlue.SR!=3)
	    {
		    humanBlue.SR=3;
            humanBlue.energy -= option[numOpt].downEnergyPanch*multEndurance;
	    }
        if (keyUpDuration('KeyA',50) && humanBlue.SR!=4)
	    {
		    humanBlue.SR=4;
            humanBlue.energy -= option[numOpt].downEnergyKick*multEndurance;
	    }
        if (keyUpDuration('KeyD',50) && humanBlue.SR!=5)
	    {
            if (humanBlue.energy>option[numOpt].perKickUp/100*maxEnergy)
            {
		        humanBlue.SR=5;
                humanBlue.energy -= option[numOpt].downEnergyKickUp*multEndurance;
            }
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
            if (humanBlue.energy>maxEnergy) humanBlue.energy=maxEnergy;

        }
        if (keyUpDuration('NumpadSubtract',50))
        {
            humanBlue.speedMove-=10;
            if (humanBlue.speedMove<1) humanBlue.speedMove=1;
        }
        if (keyUpDuration('KeyV',50))
        {
            humanRed.HP=0;
        }
        // управление красным
        let dist2=humanRed.x-humanBlue.x;
        controllHuman(humanRed,'red',dist2,humanRed.name);
        controllHuman(humanBlue,'blue',dist2,humanBlue.name);
        // обновление состойний человечков
        updateHuman(humanBlue, actionBlue); 
        updateHuman(humanRed, actionRed);
        let mult = 1.5;
        if (humanRed.hitMade==0)// если синий ударил красного
        {
            let protectionValue= humanRed.protection * (humanRed.energy / maxEnergy);
            let missed = randomInteger(1, 100) > protectionValue ? true : false;
            //console.log('protectionRed='+protectionValue);
            if (humanBlue.SR == 3 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                if (missed==true)
                {
                    humanRed.downHP = option[numOpt].downHitPanch*(1+humanBlue.power/100); 
                    missedKickRed++;
                }
            }
            if (humanBlue.SR == 4 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                if (missed==true)
                {
                    humanRed.downHP = option[numOpt].downHitKick*(1+humanBlue.power/100); 
                    if (humanRed.energy > option[numOpt].downEnergyKickRival)
                    {
                        humanRed.downEnergy = option[numOpt].downEnergyKickRival;
                    }
                    missedKickRed++;
                }
            }
            if (humanBlue.SR == 5 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                let x1=humanBlue.lineArr[4].x1;
                let y1=humanBlue.lineArr[4].y1;
                let dist=calcDist(x1,y1,humanRed.xHead,humanRed.yHead);
                if (missed==true)
                {
                    if (dist<humanRed.haedSize*2)
                    {
                        humanRed.downHP = option[numOpt].downHitKickUp*(1+humanBlue.power/100);
                        // pause=true;
                    }
                    missedKickRed++;
                }
            }  
            if (humanRed.downHP>0) humanRed.hitMade = 1;

           // if (missed == true) console.log('protectionRed: '+protectionValue);
        }
        if(humanBlue.hitMade==0) // если красный ударил синего
        {
            let protectionValue= humanBlue.protection * (humanBlue.energy / maxEnergy);
            let missed = randomInteger(1, 100) > protectionValue ? true : false;
            if (humanRed.SR == 3 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                if (missed==true)
                {
                    humanBlue.downHP = option[numOpt].downHitPanch*(1+humanRed.power/100);
                    missedKickBlue++;
                }
                
            }
            if (humanRed.SR == 4 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                if (missed==true)
                {
                    humanBlue.downHP = option[numOpt].downHitKick*(1+humanRed.power/100); 
                    if (humanBlue.energy > option[numOpt].downEnergyKickRival)
                    {
                        humanBlue.downEnergy = option[numOpt].downEnergyKickRival;
                    }
                    missedKickBlue++;
                }

            }
            if (humanRed.SR == 5 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                let x1=humanRed.lineArr[4].x1;
                let y1=humanRed.lineArr[4].y1;
                let dist=calcDist(x1,y1,humanBlue.xHead,humanBlue.yHead);
                if (missed==true)
                {
                    if (dist<humanBlue.haedSize*2)
                    {
                        humanBlue.downHP = option[numOpt].downHitKickUp*(1+humanRed.power/100);  
                    }
                    missedKickBlue++;
                }
            }
            if (humanBlue.downHP > 0)  humanBlue.hitMade = 1;
            //if (missed == true) console.log('protectionBlue: '+protectionValue);
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
            if (modeGame=='fightChampion')
            {
               // let reward=optionCity[1].list[modeGameOption.numSelect].reward;
                gameOverText='К сожелению вы проиграли бой за звание чемпиона.';
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
            if (modeGame=='fightChampion')
            {
               // let reward=optionCity[1].list[modeGameOption.numSelect].reward;
                gameOverText='Вы стали чемпионом. Поздравляем!!!';
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
        if (humanBlue.HP<=0 ||humanRed.HP<=0 )
        {
            missedKickRed = 0;
            missedKickBlue = 0;
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
        if (modeGame=='fightTest' && timeNow>gameOverTime+1000 /*&& gameOver!=0*/)
        {
            
            let stat={
                humanBlue: {
                    name:humanBlue.name,
                    power:humanBlue.power,
                    endurance:humanBlue.endurance,
                    speedMove:humanBlue.speedMove,
                    protection:humanBlue.protection,
                    result:gameOver==1?'winner':'loser',
                },
                humanRed: {
                    name:humanRed.name,
                    power:humanRed.power,
                    endurance:humanRed.endurance,
                    speedMove:humanRed.speedMove,
                    protection:humanRed.protection,
                    result:gameOver==2?'winner':'loser',
                }
            }
            statData.push(stat);
            console.log(stat);
            console.log(statData);
            console.log(testHumanArr)
            let numTestOld = numTest; // присваеваем страму номору тесту текуший
            do {
                numRedWarrior++;

                if (numRedWarrior >= testHumanArr.length) 
                {
                    numRedWarrior = 0;
                    numBlueWarrior++;
                }
                // если поединки счетчик синего достиг до количества воинов в списке
                if (numBlueWarrior >= testHumanArr.length &&
                    numRedWarrior != numBlueWarrior) 
                {
                    console.log('Test ' + numTest + ' End');
                    numTest++;
                    numRedWarrior = 1;
                    numBlueWarrior = 0;
                    break;
                }
                console.log(testHumanArr[numBlueWarrior].name, testHumanArr[numRedWarrior].name);
            } while (numRedWarrior == numBlueWarrior || 
                      checkDoubleFight(testHumanArr[numBlueWarrior].name, testHumanArr[numRedWarrior].name)
                    );
            if (numTest!=numTestOld)// если был выход из цикла do-while
            {
                calcMaxWinOfParam();
                statData = [];
                console.log('END END');
            }
            //numBlue = Math.trunc(numFight / (optionHuman.length - 1));
            createHumansForFightTest(testHumanArr,numBlueWarrior,numRedWarrior);
            gameOverTime=null;
            gameOver = 0;
            console.log('testEndFight: ' + numFight);
        }
        if ((checkPressKey('Space')==true || timeNow>gameOverTime+3000) &&
            (modeGame=='fightClub' || modeGame=='fightArena' || modeGame=='fight' ) )
        {
            gameOverTime=null;
            if (gameOver==1)
            {
                gameOverText='';
                if (modeGame=='fight' )
                {
                    money+=100;
                    modeGame='city';
                   // saveDataGame();
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
                      //      saveDataGame();
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
                     //   saveDataGame();
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
                   
                    day++;
                   // saveDataGame();
                    modeGame='city'; 
                    city.start();
                   
                }
            }
            gameOver = 0;
            //create();
            //alert(555);
        }
        //saveDataGame();
    }

}
function createTestHumanArr(count,minValue,maxValue)
{
    testHumanArr = [];
    for (let i = 0; i < count;i++)
    {
        let humanOne = {
            name: nameArr[randomInteger(0,nameArr.length-1)]+i,
            power: randomInteger(minValue, maxValue),
            endurance: randomInteger(minValue, maxValue),
            speedMove: randomInteger(minValue, maxValue),
            protection: randomInteger(minValue, maxValue),
            FHIts: [33, 33, 33],
        };
        testHumanArr.push(humanOne);

    }
    console.log(testHumanArr);
}
function calcMaxWinOfParam()
{
    let data = [];//['fred','fred','nikola','fred','nikola'];
    for (let i = 0; i < statData.length;i++)
    {
        if (statData[i].humanBlue.result=='winner')
        {
            data.push(statData[i].humanBlue.name)
        }
        else if (statData[i].humanRed.result=='winner')
        {
            data.push(statData[i].humanRed.name)
        }    
    }
    console.log(data)
    let data2 = [];
    for (let i = 0; i < data.length;i++)
    {
        if (i==0 || checkName(data[i],data2)==false)
        {    
            data2.push({name:data[i],count:1})
            for (let j = 0; j < data.length;j++)
            {
                if (i!=j)
                {
                    len = data2.length - 1;
                    if ( data2[len].name==data[j])
                    {
                        data2[len].count++;
                    }
                }

            }
        }
        //else
        //{
        //    continue;
        //}
    }
    function checkName(name,arr)
    {
        for (let i = 0; i < arr.length;i++)
        {
            if (name == arr[i].name) return true;
        }
        return false;
    }
    console.log(data2);
}
function checkDoubleFight(name1,name2)// проверить на повтор боя одних и тех же бойцов
{
    for (let i = 0; i < statData.length;i++)
    {
        if ((statData[i].humanBlue.name==name1 && statData[i].humanRed.name==name2 )||
            (statData[i].humanBlue.name==name2 && statData[i].humanRed.name==name1)) 
        {
            return true;
        }
    }
    return false;
}
function timerIter() 
{
    this.countTimeAttack = 0;
    this.calc=function (value)
    {
        this.countTimeAttack++;
        if (this.countTimeAttack>=value)
        {
            this.countTimeAttack = 0;
            return true;
        }
        return false;
    }
}
function controllHuman(human,color,dist2,name,strategy=1)
{
        let dist=35;
        if (human.SR == 0)
        {
            // randomInteger(0,100) < 10 ? randomInteger(3,5): 0;
          //  if (human.energy>maxEnergy*0.5)   human.SR = 1; else human.SR = 2;
          human.SR=1;
        }
        if (human.SR == 1 && dist2<dist) human.SR = 0;

        if (color=='red' && human.SR == 2 && human.x >screenWidth-dist) human.SR = 0;
        if (color=='blue' && human.SR == 2 && human.x <20) human.SR = 0;
        let rand = 0;
        if (human.SR == 0 && dist2<dist * 1.5) // условия атаки красным
        {
            //let flagkickUp=false;
            //let valueAttack=5;
            //if (human.energy<option[numOpt].perKickUp/100*maxEnergy)
            //{
            //    valueAttack=4;
            //}



            let R = randomInteger(1, 100);

            let attackSelect = 0;
            if (color=='blue')
            {            
                if (R < frequencyAction.hitPanch)
                {
                    attackSelect = 3;
                }
                else if (R > frequencyAction.hitPanch &&
                    R < frequencyAction.hitPanch+frequencyAction.hitKick ) 
                {
                    attackSelect = 4;
                }
                else if (R > frequencyAction.hitPanch + frequencyAction.hitKick) 
                {
                    attackSelect = 5;
                }
            } 
            else if (color=='red')
            {
                let FHits = [];
                if (modeGame!='fightTest')
                {    
                    for (let i = 0; i < optionHuman.length;i++)
                    {
                        if (optionHuman[i].name==name)
                        {
                            FHits=clone(optionHuman[i].FHIts)

                        }
                    }
                }
                else
                {
                    
                    for (let i = 0; i < testHumanArr.length;i++)
                    {
                        if ( testHumanArr[i].name==name)
                        {
                            FHits=clone(testHumanArr[i].FHIts)

                        }
                    }
                 
                }
                if (R < FHits[0])
                {
                    attackSelect = 3;
                }
                else if (R > FHits[0] &&    R < FHits[0]+FHits[1] ) 
                {
                    attackSelect = 4;
                }
                else if (R >  FHits[0]+FHits[1])
                {
                    attackSelect = 5;
                }
            }

            

          /*  if (color=='red')
            {
                rand = randomInteger(0, 100) < 100 ? randomInteger(3, valueAttack) : 0;
            }
            else 
            {*/
            let resultTimer = null;
            if (color == "blue") 
            {
                let speedAttack = 100+20-(20 + 80 * (human.speedMove / maxParam.speedMove * human.energy / maxEnergy));
                speedAttack /= speedGameMult;
                resultTimer = humanBlue.timer.calc(speedAttack)
                //console.log(speedAttack);
            }
            if (color == "red") 
            {
                let speedAttack = 100+20-(20 + 80 * (human.speedMove / maxParam.speedMove * human.energy / maxEnergy));
                speedAttack /= speedGameMult;
                resultTimer = humanRed.timer.calc(speedAttack);
            }
            rand = resultTimer == true ? attackSelect : 0;
                //console.log('blue '+rand)
            //}
            

            let multEndurance=Math.pow((1+(100-human.endurance)/100)*0.5,2);//0.25;

            if (rand==3)// удар  рукой 
            {
                human.energy -= option[numOpt].downEnergyPanch*multEndurance;
                
            }
            if (rand==4)/// удар ногой вперед
            {
                human.energy -= option[numOpt].downEnergyKick*multEndurance;
            }
            if (rand==5)// удар ногой вверх
            {
                human.energy -= option[numOpt].downEnergyKickUp*multEndurance;
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
  /*  if (human.SR==0)
    {
        if (human.energy < maxEnergy) human.energy += 1 *0.15;
        else human.energy = maxEnergy;
    }*/
    let a = maxEnergy/100;
    let b = maxParam.speedMove/100;
    let speedCalc=(b*2-b)+(b*2-b)*human.speedMove/maxParam.speedMove;
    human.speed=(a*3-a)+(a*3-a)*human.energy/maxEnergy*speedCalc;
    //human.speed = 100*(add / human.energy/maxHpAndEnergy);//*((human.speedMove*5)/100) * mult;
    //human.speed*=2*human.speedMove/maxParam.speedMove ;
    summSpeed = a*3;//(add *6   );

    arrElemCopy(human.angleArr,actionList[human.SR][human.selectFrame].angleArr);
	human.lineArr=calcArrLine(Math.trunc(human.x),human.y,human.angleArr);
    let n=human.lineArr.length-1//расчитываем голову
     
    let sizeHead=7;
    human.xHead=Math.cos(pi*(human.angleArr[n])/180)*(sizeHead+human.lineArr[n].length)+
                                human.lineArr[n].x;
    human.yHead = Math.sin(pi * (human.angleArr[n]) / 180) * (sizeHead + human.lineArr[n].length) +
                                human.lineArr[n].y;

    //speedCount=(summSpeed*40)/(human.speed+1);
    human.timeNow=new Date().getTime();
    if (human.timeNow-human.time>16/speedGameMult /*(summSpeed*40)/(human.speed+1)*/ && human.SR!=0)
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
function saveDataGame()
{
    localStorage.setItem('dataGameFaiting',JSON.stringify({
        money:money,
        day:day,
        param:humanPlayerParam
    }));
    console.log (JSON.parse(localStorage.dataGameFaiting));
}

