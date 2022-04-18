var context;
var canvas;
var time=0;
var selectFrame=0;
var SRBlue=0;// выбор приема Blue
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
	dx:0,
	dy:0,
	numMoveFrame:null,
    numAction:0,
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
    humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
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
    arrLine.push(calcLineInHuman(arrLine[1].x1,arrLine[1].y1,
                    filtrAngle(angleArr[3]),
                    dataLine.lengthArr[3]*scale));
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
    context.moveTo(1,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2 );
    context.stroke();
    
    for (let i=0;i<humanBlue.lineArr.length;i++)
    {
        let x=humanBlue.lineArr[i].x;
        let y=humanBlue.lineArr[i].y;
        let x1=humanBlue.lineArr[i].x1;
        let y1=humanBlue.lineArr[i].y1;
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(x1,y1 );
        context.stroke();
        if (i==humanBlue.lineArr.length-1)//рисуем голову
        { 
            let sizeHead=7;
            let xx=Math.cos(pi*(humanBlue.angleArr[i])/180)*(sizeHead+humanBlue.lineArr[i].length)+
                                        humanBlue.lineArr[i].x;
            let yy=Math.sin(pi*(humanBlue.angleArr[i])/180)*(sizeHead+humanBlue.lineArr[i].length)+
                                        humanBlue.lineArr[i].y;                    
            context.beginPath()
            context.arc(xx,yy, sizeHead,0,2*pi);
            context.stroke();
        }
    }
}
function update()
{
	 //updateLineHuman(100,263,1);
	let time2=new Date().getTime();
	if (checkPressKey('ArrowRight') && SRBlue!=1)
	{
		SRBlue=1;
	}
	if (checkPressKey('ArrowLeft') && SRBlue!=2)
	{
		SRBlue=2;
	}
	if (checkPressKey('KeyS') && SRBlue!=3)
	{
		SRBlue=3;
	}
	if (selectFrame==actionBlue[SRBlue].length-1)
	{
		humanBlue.dx+=actionBlue[SRBlue][selectFrame].xHuman-100;
		console.log(humanBlue.dx);
	}
	if (SRBlue!=0)
	{
		if (selectFrame==actionBlue[SRBlue].length-1)
		{
			SRBlue=0;
			selectFrame=0;
			humanBlue.numMoveFrame=null;
			
			
		}
	//	console.log(SRBlue+' '+ selectFrame);
	}
	
	
	
	// if (actionBlue[SRBlue][selectFrame].xHuman!=100)
	// {
		// if (humanBlue.numMoveFrame != selectFrame)
		// {
			// humanBlue.x-=100-actionBlue[SRBlue][selectFrame].xHuman;
	/* 		humanBlue.numMoveFrame = selectFrame;
		}
	}		
	*/	
	
	arrElemCopy(humanBlue.angleArr,actionBlue[SRBlue][selectFrame].angleArr);
	humanBlue.x=actionBlue[SRBlue][selectFrame].xHuman+humanBlue.dx;
	humanBlue.y=actionBlue[SRBlue][selectFrame].yHuman;
	humanBlue.lineArr=calcArrLine(humanBlue.x,humanBlue.y,humanBlue.angleArr);
	time2=new Date().getTime();
    if (time2-time> 150 )
	{
		selectFrame++;
		selectFrame %= (actionBlue[SRBlue].length);
		time=new Date().getTime();
	};
 }


