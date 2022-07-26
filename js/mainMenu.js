var mainMenu={
    open:true,
    numSelect:null,
    numMenu:0,
    x:1,
    y:1,
    yText:250,
    dyText:50,
    width:screenWidth,
    height:screenHeight,
    timerId:null,
    listMenu:[
        [
            {name:'newGame',nameLocal:'Новая игра',visible:true},
            {name:'continue',nameLocal:'продолжить',visible:false},
            {name:'author',nameLocal:'авторы',visible:true},
            
        ],
        [
            {name:'yes',nameLocal:'ДА',visible:true},
            {name:'not',nameLocal:'НЕТ',visible:true}, 
        ],
    ],
    start:function(){
        if (localStorage.dataGameFaiting!=undefined)
        {
            this.listMenu[0][1].visible=true;
        }
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
        if (this.numMenu==0)
        {
            this.drawNameGame();
            this.drawListMenu(this.numMenu);
        }
        if (this.numMenu==1)
        {
            this.drawNameGame();
            context.font = '30px Arial';
            context.fillStyle = 'rgb(255,255,255)';
            context.fillText('Вы действительно хотите начать новую игру?',70,150);
            context.fillText('Данные о старой игре будут удалены.',70,180);
            this.drawListMenu(this.numMenu);
        }
    },
    drawNameGame:function()
    {
        context.font = '60px Arial';
        context.fillStyle = 'rgb(255,255,0)';
        context.fillText('Путь бойца',250,100);
    },
    drawListMenu: function(numMenu)
    {
        context.font = '40px Arial';
        for(let i=0;i<this.listMenu[numMenu].length;i++)
        {
            if (this.listMenu[numMenu][i].visible==true)
            {
                i!=this.numSelect ? context.fillStyle = 'rgb(0,255,0)' :
                            context.fillStyle = 'rgb(255,0,0)';
            }
            else
            {
                    context.fillStyle = 'rgb(128,128,128)'; 
            }
            let text=this.listMenu[numMenu][i].nameLocal;
            
            let metrics = context.measureText(text);
            context.fillText(text,this.x+this.width/2-metrics.width/2,this.yText+this.dyText*i);
        }
    },
    update: function(){
        let flag=false
        for (let i=0;i<this.listMenu[this.numMenu].length;i++)
        { 
            
            let text=this.listMenu[this.numMenu][i].nameLocal;            
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
                   
                    if (this.numMenu==0 && this.numSelect==0  )
                    { 
                        if (localStorage.dataGameFaiting!=undefined )
                        {       
                            this.numMenu=1;
                            break;
                        }
                        else
                        {
                            this.close();
                        }
                    }
                    if (this.numMenu==1 && this.numSelect==1  )
                    {
                        this.numMenu=0;
                        break;
                    }
                    if (this.numMenu==1 && this.numSelect==0  )
                    {
                        //localStorage.dataGameFaiting
                        localStorage.removeItem('dataGameFaiting');
                        this.close();
                    }
                    if (this.numSelect==1 && this.numMenu==0 &&
                             this.listMenu[0][this.numSelect].visible==true)
                    {
                        //localStorage.dataGameFaiting
                        //let obj=null;//localStorage.getItem('dataGameFaiting');
                        let obj=JSON.parse(localStorage.getItem('dataGameFaiting'));
                        money=obj.money;
                        day=obj.day;
                        humanPlayerParam=clone(obj.param);
                        continueGame=true;
                        modeGame='city';
                        city.start();
                        //console.log(localStorage.getItem('dataGameFaiting'));
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