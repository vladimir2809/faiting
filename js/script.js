var context;
var canvas;
var screenWidth = 800;
var screenHeight = 600;
var timeNow = 0;
//var SRBRed=0;// выбор приема Blue select reception blue
var maxHpAndEnergy = 1000;
var HPBlue = maxHpAndEnergy;
var HPRed = maxHpAndEnergy ;
var energyBlue = maxHpAndEnergy;
var energyRed = maxHpAndEnergy;
var gameOver = 0;// если 0 - игра продолжается, 1 - победил синий,2 - победил красный 
window.addEventListener('load', function () {
    preload();
    setInterval(update,16); 
    create();
    setInterval(drawAll,16);
});
var frameArr={
    
}
var Line={
    x:null,
    y:null,
    x1:null,
    y1:null,
    length:null,
    angle:0,
    select:false,
}
/* var dataLine={
    lengthArr:[
        30,
        20,
        20,
        20,
        20,
        20,
        20,
        20,
        20,
        10,
    ],
} */
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
	dx:0,
	dy:0,
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
//var bigText = {
//    being:false,
//    x:null,
//    y:null,
//    text:'',
//}
//var humanRed={
//    x:500,
//    y:263,
//    xBuffer:500,
//    xStart:500,
//	dx:0,
//	dy:0,
//	numMoveFrame:null,
//    numAction:0,
//    selectFrame:0,
//    SR: 0,// выбор приема
//    time:0,
//    xTime:0,
//    timeNow:0,
//    angleArr:[
//        -90,
//        45,
//        135,
//        90,
//        90,
//        45,
//        135,
//        -15,
//        -15,
//        -90
//    ],

//    lineArr:[],
    
//}
function preload()
{
    
}
function create()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    initKeyboardAndMouse(['ArrowLeft','Space','ArrowRight',
                            'ArrowUp','ArrowDown', 'ControlLeft',"KeyW"
                            ,"KeyD","KeyS","KeyA"]);
    humanBlue=JSON.parse(JSON.stringify(Human));
    humanRed=JSON.parse(JSON.stringify(Human));
    humanRed.x = 300;
    humanBlue.name='Blue';
    humanRed.name='Red';
    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
    HPBlue = maxHpAndEnergy;//* 0.1;
    HPRed = maxHpAndEnergy;//* 0.1;
    energyBlue = maxHpAndEnergy;
    energyRed = maxHpAndEnergy;
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

    context.fillStyle='rgb(210,210,210)';
    context.fillRect(0,0,canvas.width,canvas.height);// очистка экрана
    context.beginPath();
    context.strokeStyle='rgb(0,0,0)';
    context.moveTo(1,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2 );
    context.stroke();
    drawHuman(humanBlue,'Blue');
    drawHuman(humanRed, "Red");
    //if (HPBlue >= 0) HPBlue -= 5.9; else HPBlue = maxHpAndEnergy;
    //if (energyBlue >= 0) energyBlue -= 5.9; else energyBlue= maxHpAndEnergy;
    drawStrip(30, 30,  maxHpAndEnergy, maxHpAndEnergy, 0, 'Red');
    drawStrip(30, 30, HPBlue, maxHpAndEnergy, 0, 'Green');
    drawStrip(screenWidth-screenWidth * 0.4 - 30, 30,  maxHpAndEnergy, maxHpAndEnergy, 0, 'Red');
    drawStrip(screenWidth-screenWidth * 0.4 - 30, 30, HPRed, maxHpAndEnergy, 1, 'Green');
    drawStrip(30, 7, energyBlue, maxHpAndEnergy, 0, 'Blue');
    drawStrip(screenWidth-screenWidth * 0.4 - 30, 7, energyRed, maxHpAndEnergy, 1, 'Blue');
    if (gameOver!=0) 
    {
        let text = gameOver == 1 ? 'Победил синий' : 'Победил красный';
        let color = gameOver == 1 ? "Blue" : "Red";
        drawTextCenterScreen(text, "Arial", 40, color,screenHeight/2-30);
    }
}
function drawStrip(x,y,value,max,side,color)
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
function drawHuman(human,color)
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
    if (gameOver==0)
    {
        let dist = 35;
	    if (checkPressKey('ArrowRight') && humanBlue.SR!= 1&& humanBlue.x<humanRed.x-dist)
	    {
		    humanBlue.SR=1;
	    }
	    if (checkPressKey('ArrowLeft') && humanBlue.SR!=2 && humanBlue.x>40)
	    {
		    humanBlue.SR=2;
	    }
	    if (checkPressKey('KeyS') && humanBlue.SR!=3)
	    {
		    humanBlue.SR=3;
            energyBlue -= 5;
	    }
            if (checkPressKey('KeyA') && humanBlue.SR!=4)
	    {
		    humanBlue.SR=4;
            energyBlue -= 7;
	    }
            if (checkPressKey('KeyD') && humanBlue.SR!=5)
	    {
		    humanBlue.SR=5;
            energyBlue -= 10;
	    }
        if (humanRed.SR == 0)
        {
            // randomInteger(0,100) < 10 ? randomInteger(3,5): 0;
            if (energyRed>maxHpAndEnergy*0.5)   humanRed.SR = 1; else humanRed.SR = 2;
        }
        if (humanRed.SR == 1 && humanRed.x < humanBlue.x + dist) humanRed.SR = 0;
        if (humanRed.SR == 2 && humanRed.x >screenWidth-dist) humanRed.SR = 0;
        let rand = 0;
        if (humanRed.SR == 0 && humanRed.x < humanBlue.x + dist * 1.5) // условия атаки красным
        {
            rand = randomInteger(0, 100) < 10 ? randomInteger(3, 5) : 0
            if (rand==3)
            {
                energyRed -= 5;
            }
            if (rand==4)
            {
                energyRed -= 7;
            }
            if (rand==5)
            {
                energyRed -= 10;
            }
            humanRed.SR = rand;
        }
        updateHuman(humanBlue, actionBlue);
        updateHuman(humanRed, actionRed);
        let mult = 1.5;
        if (humanRed.hitMade==0)
        {
            if (humanBlue.SR == 3 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                humanRed.downHP = 20; 
                humanRed.hitMade = 1;
            }
            if (humanBlue.SR == 4 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                humanRed.downHP = 10;
                if (energyRed > 10) humanRed.downEnergy = 20;
                humanRed.hitMade = 1;
            }
            if (humanBlue.SR == 5 && humanBlue.selectFrame == 2 && humanRed.x - humanBlue.x < dist * mult) 
            {
                humanRed.downHP = 50;
                humanRed.hitMade = 1;
            }  
        }
        if(humanBlue.hitMade==0)
        {
            if (humanRed.SR == 3 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                humanBlue.downHP = 20;
                humanBlue.hitMade = 1;
            }
            if (humanRed.SR == 4 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                humanBlue.downHP = 10; 
                if (energyBlue > 10)humanBlue.downEnergy = 20;
                humanBlue.hitMade = 1;
            }
            if (humanRed.SR == 5 && humanRed.selectFrame == 2 && humanBlue.x - humanRed.x < dist * mult) 
            {
                humanBlue.downHP = 50;
                humanBlue.hitMade = 1;
            }
        } 
        let mult2 = 0.5;
        if (humanBlue.SR==0)
        {
            if (energyBlue < maxHpAndEnergy) energyBlue += 1 * mult2; else energyBlue = maxHpAndEnergy;
        }
        if (humanRed.SR==0)
        {
            if (energyRed < maxHpAndEnergy) energyRed += 1 * mult2; else energyRed = maxHpAndEnergy;
        }
        //console.log(humanBlue.hitMade);
        if (humanBlue.SR == 0 && humanBlue.selectFrame == 0) humanRed.hitMade = 0;
        if (humanRed.SR == 0 && humanRed.selectFrame == 0) humanBlue.hitMade = 0;
        if (HPBlue <= 0) gameOver = 2;
        if (HPRed <= 0) gameOver = 1;
    }
    if (gameOver!=0)
    {
        if (checkPressKey('Space')==true)
        {
            gameOver = 0;
            create();
        }
    }
    //if (humanRed.hitMade==2) humanRed.hitMade = 0;
    //if (humanBlue.hitMade==2) humanBlue.hitMade = 0;

 }
function updateHuman(human,actionList)
{

   
    
	if (human.selectFrame>=actionList[human.SR].length)
	{
		human.SR=0;
        human.selectFrame = 0;
	}
	
    if (human.selectFrame >0 /*&& human.SR>0*/ && human.selectFrame!=0)
    {
        human.xBuffer = actionList[human.SR][human.selectFrame ].xHuman-actionList[human.SR][human.selectFrame-1 ].xHuman;
        //console.log("dx "+human.dx + ' SR ' + human.SR +" sF " +human.selectFrame);
        if (human.xBuffer!=0)
        {
            human.dx =human.xBuffer/5;
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
    let mult = 0.25;
    let add = 30;
    if (human.name == 'Red') human.speed = add + energyRed * mult;
    if (human.name == 'Blue') human.speed = add + energyBlue * mult;

    summSpeed = add + maxHpAndEnergy * mult;
    arrElemCopy(human.angleArr,actionList[human.SR][human.selectFrame].angleArr);
	human.lineArr=calcArrLine(Math.trunc(human.x),human.y,human.angleArr);
    human.timeNow=new Date().getTime();
	if (human.timeNow-human.xTime> (summSpeed*5)/(human.speed+1) )
	{
        human.x += human.dx;
        human.xTime = new Date().getTime();;
    }
    if (human.timeNow-human.time> (summSpeed*50)/(human.speed+1) )
	{ 
		human.selectFrame++;
    
	    human.time=new Date().getTime();

	}
    if ((human.downHP>0 || human.downEnergy>0) && human.hitMade==1)
    {
        if (human.name=='Red')
        {
            HPRed -= human.downHP;
            energyRed -= human.downEnergy;
            human.downHP = 0;
            human.downEnergy = 0;
        }
        if (human.name=='Blue')
        {
            HPBlue -= human.downHP;
            energyBlue -= human.downEnergy;
            human.downHP = 0;
            human.downEnergy = 0;
        }
        human.hitMade = 2; //alert(585);
        human.timeHitMe = new Date().getTime();;
    }
}

