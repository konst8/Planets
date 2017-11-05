"use strict";

var G = 6.67408// * 0.00000000001;
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


function dragx() 
{

	if (!e) var e = window.event;
	return getX(e);
}

function dragy() 
{

	if (!e) var e = window.event;
	return getY(e);
}

function resizeCanvas()
{

	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}
window.onresize = resizeCanvas();
window.onload = resizeCanvas();

function clearCanvas()
{
    canvas.height = canvas.height;
}
function drawcircle(x,y,r,color) 
{
	    ctx.beginPath();
	    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
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

function drawvector(xd,yd,x,y) 
{
	
  	ctx.beginPath();
  	ctx.arc(xd, yd, 4, 0, 2 * Math.PI, false);
    ctx.fillStyle = "White";
    ctx.fill();
    ctx.strokeStyle = "White";
    ctx.moveTo(x,y);
 	ctx.lineTo(xd,yd);
	ctx.lineWidth = 1;
	
	ctx.stroke();
	
}



var x3, x1 , x2 , y3 , y1 , y2, v1;
var au = 40;
var au2 = 320;


x2 = canvas.width/2 + 50 * Math.cos(au2);
x1 = 500;
x3 = canvas.width/2 + 50 * Math.cos(au);
y3 = canvas.height/2 + 50 * Math.sin(au);
y2 = canvas.height/2 + 50 * Math.sin(au2);
y1 = 150;
													
 																
function a(m,r)
 {
	return (G * m * r / Math.abs(r * r * r));
 }
var xe = 100;
var ye = 100;
var p = -1;
var xeb = xe;
var yeb = ye;

var currx = 100;
var curry = 100;
var realmode;

var checkbox = document.getElementById("real");
    checkbox.onchange = function() {
      realmode = checkbox.checked;
      if(realmode)
      {
      	alert("Now you start real mode, so you can fill lines with real mass and radius! Don't forget that accelerate must be muuuuch smaller than in normal mode!");
      	G = 6.67408 * 0.00000000001;
      }
      else G = 6.67408;
    };
 

function vectorchangecoords() //------------- возвращать значения во входные переменные х и y!
{
	canvas.onmousedown = function(e)
	{
      p = 1;
      xe = getX(e);
      xeb = xe;
      ye = getY(e);
      yeb = ye;
    
	}
	canvas.onmouseup = function(e)
	{
		xe = xeb;
		ye = yeb;
		p = -1;
	}
 	canvas.onmousemove = function(e)
	{
		if (!e) e = window.event;
		if (e.altKey)
		{
			currx = dragx();
			curry = dragy();
			xe = currx;
			ye = curry;	
		}
		
		else
		{

	if ( p > 0)
	{
		
		xe = getX(e);
		xeb = xe;
		ye = getY(e);
		yeb = ye;
	}
	}	
	}
}	




var r1 = 4;
var r2 = 40;

var vx1 = 0;

var vy1 = 0;

function setspeedx(x,xe)
{
	return (xe - x);
}

function setspeedy(y,ye)
{
	return (ye - y) ;
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

create_new_planet.onmouseover = function()
{
	create_new_planet.style.font = "25px trebuchet ms";
	create_new_planet.style.color = "#FFFACD";
}
create_new_planet.onmouseout = function()
{
    create_new_planet.style.font = "23px trebuchet ms";
    create_new_planet.style.color = "White";
}



var r = rbetween(x2,y2,x1,y1);







var r13;
var vx2,vy2,vx3,vy3;
vx2 = 0;
vy2 = 0;

vy3 = 0;
vx3 = 0;


//----------------------------------------------------------- create planet


var arrayofplanets = [];
var rbetweenplanets = [];
var arrayofvx  = [];
var arrayofvy = [];
var currnumplanet = 0;

var testcount = 0;

create_new_planet.onclick = function(e)
{	

		ifenterpress = 0;
		currx = 100;
		curry = 100;
		xe = 100;
		ye = 100;
	currnumplanet++;
	e = e || window.event;
	arrayofplanets[currnumplanet - 1] = {
		mass : 100,
		x : 100,
		y : 100,
		vx : 0,
		vy : 0,
		radius : 10,
		color : "red" 
	}
	arrayofplanets[currnumplanet-1].mass = +(document.getElementById("mas").value);
	arrayofplanets[currnumplanet-1].radius = +(document.getElementById("rad").value);
	arrayofplanets[currnumplanet-1].color = document.getElementById("colo").value;
	
}
	
//---------------------------------------------------------- 

var ifenterpress = 0;

document.onkeydown = function(e)
{
	e = e || window.event;
	if (e.which == 13)
		ifenterpress = 1;
}

document.getElementById("pausee").onclick = function(e)
{
	document.getElementById("pausee").style.bottom = "30px";
}



//--------------------------------------------------------- main part

var numofdl = 0;

var checkforoneclick = 0;
var drawflyline = [];
for (var i = 0; i < 20; i++) {
	drawflyline[i] = [];
	}

var timerate = 60;

document.getElementById("txt").innerHTML = timerate;
var start = Date.now();
var timer = setInterval(function() {
  	var timePassed = Date.now() - start;

  	clearCanvas();
	window.onresize = resizeCanvas();
	if(currnumplanet > 0 && !ifenterpress)
	{
	vectorchangecoords();
	arrayofvx[currnumplanet-1] = xe;
	arrayofvy[currnumplanet-1] = ye;
	arrayofplanets[currnumplanet-1].x = currx;
 	arrayofplanets[currnumplanet-1].y = curry;
 	for (var i = 0; i < arrayofplanets.length; i++) {
 		for (var counter = 0; counter < arrayofplanets.length; counter++) {
 			rbetweenplanets[i*10 + counter] = rbetween(arrayofplanets[i].x,arrayofplanets[i].y,arrayofplanets[counter].x,arrayofplanets[counter].y);
 		}
 	}
 	arrayofplanets[currnumplanet-1].vx = setspeedx(arrayofplanets[currnumplanet-1].x,xe);
 	arrayofplanets[currnumplanet-1].vy = setspeedx(arrayofplanets[currnumplanet-1].y,ye);
 	if(!ifenterpress)
 	{
 	for (var i = testcount; i < arrayofplanets.length; i++) {
	drawvector(arrayofvx[i],arrayofvy[i],arrayofplanets[i].x,arrayofplanets[i].y);
	}
}
 	for (var i = 0; i < arrayofplanets.length; i++) {
		drawcircle(arrayofplanets[i].x,arrayofplanets[i].y,arrayofplanets[i].radius,arrayofplanets[i].color);
	}
	for (var cur = 0; cur < arrayofplanets.length; cur++) {
			for (var i = 0; i < 4999; i += 2) {
				drawflyline[cur][i] = arrayofplanets[cur].x;
  				drawflyline[cur][i+1] = arrayofplanets[cur].y;
  			}
  		}
}if(ifenterpress)
{
	testcount = currnumplanet;
	
		for (var i = 0; i < arrayofplanets.length; i++) {
			for (var cuo = 0; cuo < arrayofplanets.length; cuo++) {
				if(i != cuo)
				{
				arrayofplanets[i].vx += (a(arrayofplanets[cuo].mass,rbetweenplanets[i*10 + cuo]) * cos(arrayofplanets[cuo].x,arrayofplanets[i].x,rbetweenplanets[i*10 + cuo]) * 100);
				arrayofplanets[i].vy += (a(arrayofplanets[cuo].mass,rbetweenplanets[i*10 + cuo]) * sin(arrayofplanets[cuo].y,arrayofplanets[i].y,rbetweenplanets[i*10 + cuo]) * 100);
				}
			}

		}
		for (var i = 0; i < arrayofplanets.length; i++) {
			arrayofplanets[i].x += arrayofplanets[i].vx/100;
			arrayofplanets[i].y += arrayofplanets[i].vy/100;
		}

		for (var i = 0; i < arrayofplanets.length; i++) {
 			for (var counter = 0; counter < arrayofplanets.length; counter++) {
 				rbetweenplanets[i*10 + counter] = rbetween(arrayofplanets[i].x,arrayofplanets[i].y,arrayofplanets[counter].x,arrayofplanets[counter].y);
 			}
 		}

 		
		

		
			for (var i = 0; i < arrayofplanets.length; i++) {
				drawflyline[i][numofdl] = arrayofplanets[i].x;
  				drawflyline[i][numofdl+1] = arrayofplanets[i].y;
  			}
  			for (var i = 0; i < arrayofplanets.length; i++) {
  				for (var j = 0; j < 4997; j += 4) {
  					drawcircle(drawflyline[i][j],drawflyline[i][j+1],0.5,arrayofplanets[i].color);
  				}
  			}
  			if(numofdl < 4998)
  				numofdl += 4;
  			else numofdl = 0;

  		for (var i = 0; i < arrayofplanets.length; i++) {
  			for (var j = 0; j < arrayofplanets.length; j++) {
  				if(i != j)
  				{
  					if(rbetweenplanets[i*10 + j] <= (arrayofplanets[i].radius + arrayofplanets[j].radius))
  					{
  						alert("You Lose");
  						ifenterpress = 0;
  						arrayofplanets = [];
						rbetweenplanets = [];
						arrayofvx  = [];
						arrayofvy = [];
						currnumplanet = 0;
						testcount = 0;
  					}
  				}
  			}
  		}
  		for (var i = 0; i < arrayofplanets.length; i++) {
			drawcircle(arrayofplanets[i].x,arrayofplanets[i].y,arrayofplanets[i].radius,arrayofplanets[i].color);
		}
  	
  		}
  	
	

    /*au = au + 0.01;
    au2 = au2 + 0.01;
function twostars() 
	{
  	x2 = canvas.width/2 + 50 * Math.cos(au2);	//
  	y2 = canvas.height/2 + 50 * Math.sin(au2);	//
  									// вращение системы из двух звезд
  	x3 = canvas.width/2 + 50 * Math.cos(au);	//
  	y3 = canvas.height/2 + 50 * Math.sin(au);	//
  	r13 = rbetween(x1,y1,x3,y3);
  	r = rbetween(x2,y2,x1,y1);
  	if (Math.abs(r) < 42 || Math.abs(r13) < 42)
  		clearInterval(timer);
  	x1 = x1 + vx1/100;
  	y1 = y1 + vy1/100;
  	vx1 = vx1 + ((a(100,r) * cos(x2,x1,r)) * 100) + ((a(100,r13) * cos(x3,x1,r13)) * 100) + 0.001;
  	vy1 = vy1 + ((a(100,r) * sin(y2,y1,r)) * 100) + ((a(100,r13) * sin(y3,y1,r13)) * 100) + 0.001;
  	drawflyline[i] = x1;
  	drawflyline[i+1] = y1;

  	for (var j = 0; j < 4999; j += 2) {
  		drawcircle(drawflyline[j],drawflyline[j+1],0.5,"White");
  	}
  	if(i < 4998)
  	i += 2;
  	else i = 0;
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
  	alert("You Lose!");
  	}

  	
  	vx1 = vx1 + ((a(100,r) * cos(x2,x1,r)) * 100) + 0.001;//к вопросу о том что за "+0.001". без этого тело будет летать по элептической орбите стабильно как и происходило бы на самом деле
  	vy1 = vy1 + ((a(100,r) * sin(y2,y1,r)) * 100) + 0.001;//однако таких идеальных ситуаций не бывает т.к на тело действует бесконечное множество других тел
  														// и что бы было интереснее я сделал погрешность на это
  	x1 = x1 + vx1/100;
  	y1 = y1 + vy1/100;

  	drawflyline[i] = x1;
  	drawflyline[i+1] = y1;

  	for (var j = 0; j < 4999; j += 2) {
  		drawcircle(drawflyline[j],drawflyline[j+1],0.5,"White");
  	}
  	if(i < 4998)
  	i += 2;
  	else i = 0;

  	drawcircle(x1,y1,r1,"green");


    drawcircle(x2,y2,r2,"red");	
	}

clearCanvas();	
if (starvar == 1)
onestar();
else if (starvar == 2)
twostars();	
*/


},1000/timerate)



