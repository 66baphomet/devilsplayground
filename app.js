const canvas =document.querySelector('.app');

const ctx = canvas.getContext("2d");
// head variable start

let height=20;
let width=20;
let x=Math.floor(Math.random()*(canvas.width-width));
let y=Math.floor(Math.random()*(canvas.height-height));

let dx=0;
let dy=0;
// head variable end

//fruit variable start
let fruitRadius=6;
let fruitX=Math.floor(Math.random()*(canvas.width-2*fruitRadius))+fruitRadius;
let fruitY=Math.floor(Math.random()*(canvas.height-2*fruitRadius))+fruitRadius;

function createRandom()
{
    fruitX=Math.floor(Math.random()*(canvas.width-2*fruitRadius))+fruitRadius;
    fruitY=Math.floor(Math.random()*(canvas.height-2*fruitRadius))+fruitRadius;
}
//fruit variable end

function drawFruit()
{

    ctx.beginPath();
    ctx.arc(fruitX,fruitY,fruitRadius,0,Math.PI*2);
    ctx.fillStyle="#2C3E50";
    ctx.fill();
    ctx.closePath();
}

//goat variable start
let goatRadius=12;
let goatX;
let goatY;

function createRandomGoat()
{
    goatX=Math.floor(Math.random()*(canvas.width-2*goatRadius))+goatRadius;
    goatY=Math.floor(Math.random()*(canvas.height-2*goatRadius))+goatRadius;
}
//goat variable end

function drawGoat()
{

    ctx.beginPath();
    ctx.arc(goatX,goatY,goatRadius,0,Math.PI*2);
    ctx.fillStyle="#2C3E50";
    ctx.fill();
    ctx.closePath();
}


var devilHead = new Image();
devilHead.src="devil.jpg";

function drawHead()
{
    ctx.beginPath();
    ctx.drawImage(devilHead,x,y,height,width);

    ctx.fill();
    ctx.closePath();
}

let countDownBoolean=true;
let timerId;

function keyDownHandler(event)
{
    if(countDownBoolean)
    {
     timerId=setInterval(function countDown(){
            counter--;
        },200);

        countDownBoolean=false;
    }
    switch(event.keyCode)
    {
        case 39:
            dx=3;
            dy=0;
            break;
        case 37:
            dx=-3;
            dy=0;
            break;
        case 40:
            dy=3;
            dx=0;
            break;
        case 38:
            dy=-3;
            dx=0;
            break;  
    }

}

function keyScreenHandler(keyScreenCode)
{
    if(countDownBoolean)
    {
      timerId= setInterval(function countDown(){
            counter--;
        },200);

        countDownBoolean=false;
    }

    switch(keyScreenCode)
    {
        case 39:
            dx=3;
            dy=0;
            break;
        case 37:
            dx=-3;
            dy=0;
            break;
        case 40:
            dy=3;
            dx=0;
            break;
        case 38:
            dy=-3;
            dx=0;
            break;  
    }

}

document.addEventListener('keydown',keyDownHandler,false);

let score=0;

let counter=666;
let goat=false;

let halfWidth=width/2;
let halfHeight=height/2;

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    drawHead();

//fruit will be drawn if score is divisible by 10 and >0
    if(!(score%10==0 && score>0))
    {
        drawFruit();
    }

//checking fruit and head collision
    if((x+width>=fruitX && x<=fruitX ) && (y+height>=fruitY && y<=fruitY))
    {
        score++;

        var audio= new Audio("devilEat.mp3");
        audio.play();

//if not divisible by 10 and >0 a new random fruit is drawn
        if(!(score%10==0 && score>0))
        {
            createRandom();
        }
        //if score divisible by 10 and >0 goat is created
        else if(score%10==0)
        {
        				//enabling drawGoat() to execute
            goat=true;
            createRandomGoat();
            //fruit properties are assigned undefined to avoid unexpected behaviour
            fruitX=undefined;
            fruitY=undefined;
        }
    }
    
    if(goat)
    {   
        drawGoat();
    }


//checking head and goat collision
    if((x+width>=goatX-5 && x<=goatX+5) && (y+height>=goatY-5 && y<=goatY+5))
    {
    				//goat properties set to undefined to avoid unexpected behaviour
        goatX=undefined;
        goatY=undefined;
        //a new random fruit is drwan
        createRandom();
        score+=3;
        var audio= new Audio("devilEat.mp3");
        audio.play();
        //stopping drawGoat() function
        goat=false;
    }

//enabling the head to appear on the opposite wall
    if(x+halfWidth>canvas.width)
    {
        x=-halfWidth;
    }
    else if(x+halfWidth<0)
    {
        x=canvas.width-halfWidth;
    }
    else if(y+halfHeight>canvas.height)
    {
        y=-halfHeight;
    }
    else if(y+halfHeight<0)
    {
        y=canvas.height-halfHeight;
    }

    x+=dx;
    y+=dy;

    document.querySelector('#score').innerHTML=score;
    document.querySelector('#countDown').innerHTML=counter;

    if(counter<=0 && score>=60)
    {
      clearInterval(timerId);
        document.querySelector('#final').innerHTML="The Devil is pleased. Welcome aboard son.";
       //changing #final background
  document.querySelector('#final').classList.add('final2');
 //showing game over
 setTimeout(()=>{ctx.clearRect(0,0,canvas.width,canvas.height); canvas.style.backgroundColor=" black";
        ctx.font="30px Arial";
        ctx.fillStyle="antiquewhite";
        ctx.fillText("Game Over!",80,200);},1000);
        
        //game over audio
        var audio= new Audio("gameOver.mp3");
        audio.play();
    }
    else if(counter<=0 && score<60)
    {
      clearInterval(timerId);
        document.querySelector('#final').innerHTML="That's all you got son? What a disappointment. The Devil gets your soul now.";
       
       //changing #final background       
        document.querySelector('#final').classList.add('final2');
       //showing game over on canvas
setTimeout(()=>{ ctx.clearRect(0,0,canvas.width,canvas.height);  canvas.style.backgroundColor="black";
        ctx.font="30px Arial";
        ctx.fillStyle="antiquewhite ";
        ctx.fillText("Game Over!",80,200);},1000);
        //game over audio
        var audio= new Audio("gameOver.mp3");
        audio.play();
    }
    //stops the game when counter is 0
    if(counter>0)
    {
    requestAnimationFrame(draw);
    }
}


requestAnimationFrame(draw);
