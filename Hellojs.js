"use strict";

var G = 6.67408 // * 0.00000000001;
var canvas = document.getElementById('main-canvas');
var ctx = canvas.getContext('2d');
var check = false;

function max(a,b) {
  if (a>=b) return a;
  if (b>a) return b;
}

function min(a,b) {
	if (a<=b) return a;
	if (b<a) return b;
}


function drag() 
{

	if (!e) var e = window.event;
	x1 = getX(e);
	y1 = getY(e);
}

function resizeCanvas()
{

	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	// body...
}
window.onresize = resizeCanvas();
window.onload = resizeCanvas();

function clearCanvas()
{
    canvas.height = canvas.height;
}
function drawcircle(x,y,m,color) 
{
	    ctx.beginPath();
	    ctx.arc(x, y, m, 0, 2 * Math.PI, false);
      	ctx.fillStyle = color;
      	ctx.fill();
}	
function getX(e)
	{
		if (e.pageX)
		{
			return e.pageX;
		}
		else if (e.clientX)
		{
			return e.clientX+(canvas.documentElement.scrollLeft || canvas.body.scrollLeft) - canvas.documentElement.clientLeft;
		}

		return 0;
	}

	// Y-координата
function getY(e)
	{
		if (e.pageY)
		{
			return e.pageY;
		}
		else if (e.clientY)
		{
			return e.clientY+(canvas.documentElement.scrollTop || canvas.body.scrollTop) - canvas.documentElement.clientTop;
		}

		return 0;
	}

function drawvector(x,y) 
{
	if (p > 0)
	{
  	ctx.beginPath();
    ctx.moveTo(x,y);
 	ctx.lineTo(xe,ye);
	ctx.lineWidth = 2;
	ctx.stroke();
	}
}

var x3, x1 , x2 , y3 , y1 , y2, v1;
var au = 40;
var au2 = 320;


x2 = 600 + 50 * Math.cos(au2);
x1 = 500;
x3 = 600 + 50 * Math.cos(au);
y3 = 250 + 50 * Math.sin(au);
y2 = 250 + 50 * Math.sin(au2);
y1 = 150;
													
 																
function a(m,r)
 {
	return (G * m * r / Math.abs(r * r * r));
 }
var xe = x1;
var ye = y1;
var p = -1;
function vectorchangecoords() 
{
	canvas.onmousedown = function(e)
	{
      p = 1;
      xe = getX(e);
      ye = getY(e);
	}
	canvas.onmouseup = function(e)
	{
		p = -1;
	}
 canvas.onmousemove = function(e)
	{
		if (!e) e = window.event;
		if (e.altKey)
			drag();
		else
		{

	if ( p > 0)
	{
		
		xe = getX(e);
		ye = getY(e);
	}
	}	
	}
}	




var r1 = 4;
var r2 = 40;

var vx1 = 0;

var vy1 = 0;

function setspeed(x1,y1,xe,ye,m)
{
	vx1 = (xe - x1) ;
	vy1 = (ye - y1) ;
}

function rbetween(x,y,x1,y1)
	{
	return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
	} 

function sin(y,y1,r) 
{
	var sin = (y - y1)/r; 										
	
	return sin;
}

function cos(x,x1,r) 
{
	var cos = (x - x1)/r;
	return cos;
}




var starvar = 1;
star1.onclick = function(){
 starvar = 1;
}
stars2.onclick = function(){
 starvar = 2;
}



var r = rbetween(x2,y2,x1,y1);

var start1 = Date.now();

var timer1 = setInterval(function() {
var timePassed1 = Date.now() - start1;

	clearCanvas();
	drawvector(x1,y1);
 	vectorchangecoords();
  	rbetween(x2,y2,x1,y1);
  	setspeed(x1,y1,xe,ye,0.001);

  	drawcircle(x1,y1,r1,"green");
  	drawcircle(x2,y2,r2,"red");
  	if(starvar == 2)
  	{
  		drawcircle(x3,y3,r2,"yellow");
  	}
  	


},35)

var r13;
var vx2,vy2,vx3,vy3;
vx2 = 0;
vy2 = 0;

vy3 = 0;
vx3 = 0;


canvas.onclick = function(e)
	
{
document.getElementById("txt").innerHTML = (+document.getElementById("txt").innerHTML) + 1;

clearInterval(timer1);
var start = Date.now();
var timer = setInterval(function() {
  	var timePassed = Date.now() - start;
     au = au + 0.01;
     au2 = au2 + 0.01;
	function twostars() 
	{
  	x2 = 600 + 50 * Math.cos(au2);	//
  	y2 = 250 + 50 * Math.sin(au2);	//
  									// вращение системы из двух звезд
  	x3 = 600 + 50 * Math.cos(au);	//
  	y3 = 250 + 50 * Math.sin(au);	//
  	r13 = rbetween(x1,y1,x3,y3);
  	r = rbetween(x2,y2,x1,y1);
  	if (Math.abs(r) < 42 || Math.abs(r13) < 42)
  		clearInterval(timer);
  	x1 = x1 + vx1/100;
  	y1 = y1 + vy1/100;
  	vx1 = vx1 + ((a(100,r) * cos(x2,x1,r)) * 100) + ((a(100,r13) * cos(x3,x1,r13)) * 100);
  	vy1 = vy1 + ((a(100,r) * sin(y2,y1,r)) * 100) + ((a(100,r13) * sin(y3,y1,r13)) * 100);
  	drawcircle(x1,y1,r1,"green");
  	drawcircle(x3,y3,r2,"yellow");  //
  	drawcircle(x2,y2,r2,"red");		//
	}

	function onestar() 
	{
	
  	vy2 = vy2 + (a(0.001,r) * sin(y1,y2,r) * 100);	//
    vx2 = vx2 + (a(0.001,r) * cos(x1,x2,r) * 100);	//
    												// вращение одной звезды
    x2 = x2 + vx2/100;								//
    y2 = y2 + vy2/100;								//

    r = rbetween(x2,y2,x1,y1);

    if (Math.abs(r) < 42)
    {
  	clearInterval(timer);
  	}

  	x1 = x1 + vx1/100;
  	y1 = y1 + vy1/100;
  	vx1 = vx1 + ((a(100,r) * cos(x2,x1,r)) * 100);
  	vy1 = vy1 + ((a(100,r) * sin(y2,y1,r)) * 100);
  	drawcircle(x1,y1,r1,"green");

    drawcircle(x2,y2,r2,"red");	   				
	}
  	clearCanvas();	
  	if (starvar == 1)
  	onestar();
  	else if (starvar == 2)
  	twostars();	

   },17)
}
 
/*circle.onclick = function() {
	var mass = prompt('mass','');
    circle.style.width = mass/100000 + 'px';
    circle.style.height = mass/100000 + 'px';
}
circle2.onclick = function()
{
	var mass = prompt('mass','');
    circle2.style.width = mass/100000  +'px'; 
    circle2.style.height = mass/100000 + 'px';
  
//+(circle2.style.width.slice(0,-2))

}
circle.style.left = "600px";
circle2.style.left = "500px";

circle.style.top = "200px";
circle2.style.top = "200px";




button.onclick = function() {
var start = Date.now(); // сохранить время начала
  var rx =  +circle.style.left.slice(0,-2) + (+circle.style.width.slice(0,-2)/2) - +circle2.style.left.slice(0,-2) + (+circle2.style.width.slice(0,-2)/2);
  var ry =  +circle.style.top.slice(0,-2) + (+circle.style.width.slice(0,-2)/2) - +circle2.style.top.slice(0,-2) + (+circle2.style.width.slice(0,-2)/2);
   
  var r = Math.sqrt(rx*rx + ry*ry);
  var x0 = +circle2.style.left.slice(0,-2);
  var y0 = +circle2.style.top.slice(0,-2);

  var x01 = +circle.style.left.slice(0,-2);
  var y01 = +circle.style.top.slice(0,-2);


  
  var m1= (+circle.style.width.slice(0,-2))*100000;
  var m2= (+circle2.style.width.slice(0,-2))*100000;
  var x,x1;
  var y,y1;
  var t;
  var sin;
  var cos;
  var timePassed;

  var vx = 0;
  var vx0 = vx;
  var vy = 0;

var timer = setInterval(function() {
  timePassed = Date.now() - start;
  
  sin = ry/r;
  cos = rx/r;
 

  // рисует состояние анимации, соответствующее времени timePassed
    
   t = timePassed/1000 * 60 * 60;

   //vx = vx + a(m1,r)*t;
   

   
  	y = y0 + vy * t + sin * (x-x0) / cos;
  	x = x0 + vx * t + ax(m1,r)*(t)*(t)/2;
    x1 = x01 - ax(m2,r)*(t)*(t)/2;
    y1 = y01 - sin * (x01-x1) / cos;

   if ((+circle2.style.left.slice(0,-2) + +circle2.style.width.slice(0,-2)) >= (+circle.style.left.slice(0,-2) + +circle.style.width.slice(0,-2) / 2))
      clearInterval(timer);

   
  
   
   
   circle2.style.left = x + 'px';
   circle.style.left = x1 + 'px';

   
   circle2.style.top = y + 'px';
   circle.style.top = y1 + 'px';



}, 20);
}
*/
	/*var wid = window.innerWidth;
    var hig = window.innerHeight;
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
		context.beginPath();

  var planet =
  {
  	x: 0,
  	y: 0,
  	m: 10,
  	f: 0,
  	u: 0,
  
  draw : function() {
  context.arc(this.x, this.y, this.m*2, 0, 2 * Math.PI, false);
      	context.fillStyle = "green";
      	context.fill();
      }
  };
  planet.draw();
  planet.anim = function() {
      var start = Date.now(); // сохранить время начала

      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;

         planet.draw();
        if (timePassed > 2000) clearInterval(timer);

      }, 20);
    }
    planet.anim();


function getCoords(elem) 
{ 
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
function drag(smth) 
{ 
	var ball = document.getElementById(smth);

	ball.onmousedown = function(e) {

	  var coords = getCoords(ball);
	  var shiftX = e.pageX - coords.left;
	  var shiftY = e.pageY - coords.top;

	  ball.style.position = 'absolute';
	  document.body.appendChild(ball);
	  moveAt(e);

	  ball.style.zIndex = 1000; // над другими элементами

	  function moveAt(e) {
	    ball.style.left = e.pageX - shiftX + 'px';
	    ball.style.top = e.pageY - shiftY + 'px';
	  }

	  document.onmousemove = function(e) {
	    moveAt(e);
	  };

	  ball.onmouseup = function() {
	    document.onmousemove = null;
	    ball.onmouseup = null;
	  };

	}

	ball.ondragstart = function() {
	  return false;
	};
}
function planetsetup(smth) {
	var planet = document.getElementById('circle');
  	circle.style.width = ;
  	circle.style.height = ;
  	 }




function newplanet(name) {
	var name =
  {
  	x: 0,
  	y: 0,
  	m: 0,
  	f: 0,
  	u: 0,
  };
  name.m = prompt('mass','');
  planetsetup(name);
  
}

var np = prompt('planet','');
newplanet(np);
drag('circle');





    */





    /*var wid = window.innerWidth;
    var hig = window.innerHeight;
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
		context.beginPath();

    var t1 = [0,0,10,7,50];
        for(var i = 0; i < 1000; i++)
        {
        	context.clearRect(0, 0, wid, hig);
        	t1[0]++;
        	t1[1]++;
        context.arc(t1[0] + 2*t1[2], t1[1]+ 2*t1[2], t1[2]*2, 0, 2 * Math.PI, false);
      	context.fillStyle = "green";
      	context.fill();
       }*/
      


