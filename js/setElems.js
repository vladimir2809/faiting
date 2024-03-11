// JavaScript source code
function Slider(x,y,width,value,min,max)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 30;
    this.value = value;
    this.max = max;
    this.min = min;
    this.grabMouseBar = false;
    this.oldX = null;
    this.click = false;
    this.countMousePress = null;
    this.bar={
        x: null,
        y: null,
        width:20,
        height:40,
    }
    this.updateBar=function()
    {
        this.bar.x = this.x + this.width * (this.value -this.min)/ (this.max - this.min);
        this.bar.y = this.y - (this.bar.height - this.height) / 2;
    }
    this.init=function()
    {
        //this.bar.x = this.x + this.width * this.value / (this.max - this.min);
        //this.bar.y = this.y - (this.bar.height - this.height) / 2;
        this.updateBar();
    }
    this.draw=function()
    {
        context.fillStyle = "green";
        context.fillRect(this.x,this.y,this.width*(this.value-this.min)/(this.max-this.min),this.height);
        context.strokeStyle = "red";
        context.strokeRect(this.x,this.y,this.width,this.height);
        context.fillStyle = "red";
        context.fillRect(this.bar.x,this.bar.y,this.bar.width,this.bar.height);
        context.strokeStyle = "white";
        context.strokeRect(this.bar.x,this.bar.y,this.bar.width,this.bar.height);

    }
    this.clickBar=function(callback)
    {
        if (this.click==true)
        {
            this.click = false;
            if (checkInObj(this.bar,mouseX,mouseY)==true)
            {
                callback();
            }
            
        }
    }
    this.update=function()
    {
        if (mouseLeftPress==true)
        {
            
            if (checkInObj(this.bar,mouseX,mouseY)==true)
            {
                this.grabMouseBar = true;
            }
         
            if (this.grabMouseBar==true)
            {
                this.bar.x +=( mouseX - this.oldX);
                if (this.bar.x > this.x + this.width)
                {
                    this.bar.x = this.x + this.width;
                    this.grabMouseBar = false;
                }
                if (this.bar.x < this.x)
                {
                    this.bar.x = this.x;
                    this.grabMouseBar = false;
                }
                this.value = this.min+((this.max - this.min) * (this.bar.x - this.x) / this.width);
            }
           // console.log(this.value);
            //if (this.countMousePress==null)
            //{
            //    this.countMousePress=1;
            //}
            //else
            //{
            //    this.countMousePress++;
            //}

        }  
        else
        {
            if (this.grabMouseBar==true)
            {
                this.click = true;
            }
            this.grabMouseBar = false;
            //if (this.countMousePress!=null && this.countMousePress<20)
            //{
            //    this.click = true;
            //    this.countMousePress = null;
            //}
            //this.countMousePress = null;
        }
        this.oldX = mouseX;
    }
}
