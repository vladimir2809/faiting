var context;
var canvas;
var timeNow = 0;
//var SRBRed=0;// выбор приема Blue select reception blue
window.addEventListener('load', function () {
    preload();
    create();
    setInterval(drawAll,16);
    setInterval(update,16); 
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
var humanBlue={
    x:100,
    y:263,
    xBuffer:100,
    xStart:100,
	dx:0,
	dy:0,
	numMoveFrame:null,
    numAction:0,
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
var humanRed={
    x:500,
    y:263,
    xBuffer:500,
    xStart:500,
	dx:0,
	dy:0,
	numMoveFrame:null,
    numAction:0,
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
    humanBlue.lineArr=calcArrLine(10,10/*humanBlue.x,humanBlue.y*/,humanBlue.angleArr);
    humanRed.lineArr=calcArrLine(humanRed.x,humanRed.y,humanRed.angleArr);
    humanBlue.xStart = humanBlue.xBuffer = actionBlue[0][0].xHuman;
    humanRed.xStart = humanRed.xBuffer = actionRed[0][0].xHuman;
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
    //context.strokeStyle='rgb(0,0,255)';
    drawHuman(humanBlue,'Blue');
    drawHuman(humanRed,"Red");
    //for (let i=0;i<humanBlue.lineArr.length;i++)
    //{
    //    let x=humanBlue.lineArr[i].x;
    //    let y=humanBlue.lineArr[i].y;
    //    let x1=humanBlue.lineArr[i].x1;
    //    let y1=humanBlue.lineArr[i].y1;
    //    context.beginPath();
    //    context.moveTo(x,y);
    //    context.lineTo(x1,y1 );
    //    context.stroke();
    //    if (i==humanBlue.lineArr.length-1)//рисуем голову
    //    { 
    //        let sizeHead=7;
    //        let xx=Math.cos(pi*(humanBlue.angleArr[i])/180)*(sizeHead+humanBlue.lineArr[i].length)+
    //                                    humanBlue.lineArr[i].x;
    //        let yy=Math.sin(pi*(humanBlue.angleArr[i])/180)*(sizeHead+humanBlue.lineArr[i].length)+
    //                                    humanBlue.lineArr[i].y;                    
    //        context.beginPath()
    //        context.arc(xx,yy, sizeHead,0,2*pi);
    //        context.stroke();
    //    }
    //}
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
function update()
{
	 //updateLineHuman(100,263,1);
	timeNow=new Date().getTime();
	if (checkPressKey('ArrowRight') && humanBlue.SR!=1)
	{
		humanBlue.SR=1;
	}
	if (checkPressKey('ArrowLeft') && humanBlue.SR!=2)
	{
		humanBlue.SR=2;
	}
	if (checkPressKey('KeyS') && humanBlue.SR!=3)
	{
		humanBlue.SR=3;
	}
        if (checkPressKey('KeyA') && humanBlue.SR!=4)
	{
		humanBlue.SR=4;
	}
        if (checkPressKey('KeyD') && humanBlue.SR!=5)
	{
		humanBlue.SR=5;
	}
    if(humanRed.SR==0)humanRed.SR =randomInteger(0,100) < 10 ? randomInteger(1,5): 0;
  
    updateHuman(humanBlue, actionBlue);
    updateHuman(humanRed, actionRed);
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

    arrElemCopy(human.angleArr,actionList[human.SR][human.selectFrame].angleArr);
    human.timeNow=new Date().getTime();
    if (human.timeNow-human.xTime> 1 )
	{
        human.x += human.dx;
        human.xTime = new Date().getTime();;
    }
	human.lineArr=calcArrLine(Math.trunc(human.x),human.y,human.angleArr);
	
    if (human.timeNow-human.time> 100 )
	{ 
		human.selectFrame++;
	    human.time=new Date().getTime();

	};
}

