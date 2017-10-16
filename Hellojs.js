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
 



