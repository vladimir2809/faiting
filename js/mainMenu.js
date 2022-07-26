var mainMenu={
    open:true,
    numSelect:null,
    x:1,
    y:1,
    yText:250,
    dyText:50,
    width:screenWidth,
    height:screenHeight,
    timerId:null,
    listMenu:[
        {name:'newGame',nameLocal:'Новая игра',visible:true},
        {name:'continue',nameLocal:'продолжить',visible:false},
        {name:'author',nameLocal:'авторы',visible:true},
        
    ],
    start:function(){
        if (this.open==true)  this.timerId=setInterval(function(){
            mainMenu.update();
            
        },50);
    },
    close: function(){
        clearInterval(this.timerId);
        this.open=false;
    },
    draw:function(){
        context.fillStyle="#000000";
        context.fillRect(this.x,this.y,this.width,this.height);
        context.font = '40px Arial';
        for(let i=0;i<this.listMenu.length;i++)
        {
            if (this.listMenu[i].visible==true)
            {
                i!=this.numSelect ? context.fillStyle = 'rgb(0,255,0)' :
                            context.fillStyle = 'rgb(255,0,0)';
            }
            else
            {
                 context.fillStyle = 'rgb(128,128,128)'; 
            }
            let text=this.listMenu[i].nameLocal;
          
            let metrics = context.measureText(text);
            context.fillText(text,this.x+this.width/2-metrics.width/2,this.yText+this.dyText*i);
        }
    },
    update: function(){
        let flag=false
        for (let i=0;i<this.listMenu.length;i++)
        { 
            
            let text=this.listMenu[i].nameLocal;            
            let metrics = context.measureText(text);
            if (mouseX>this.x+this.width/2-metrics.width/2 &&
                mouseX<this.x+this.width/2+metrics.width/2 &&
                mouseY>this.yText+this.dyText*i-this.dyText/3 &&
                mouseY<this.yText+this.dyText*i+this.dyText/3 
            )
            {
                this.numSelect=i;
                flag=true;
                if (mouseLeftClick()==true)
                {
                    if (this.numSelect==0)
                    {
                        this.close();
                    }
                }
                break;
                //console.log(i);
                
            }
           
        }
        if (flag==false) this.numSelect=null;
    }
}