/*eslint-env browser */
/*globals ActiveXObject */

var canvas = document.getElementById('whatANiceCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var penSize = 5;
var penDown = false;
var red = 256;
var green = 256;
var blue = 256;

var context = canvas.getContext('2d');
context.lineWidth = penSize * 2;

var drawPoint = function(e) {
	if (penDown) {

		context.lineTo(e.clientX, e.clientY);
		context.strokeStyle = 'rgb('+red+','+green+','+blue+')';
		context.stroke();
		context.beginPath();
		context.arc(e.clientX, e.clientY, penSize, 0, Math.PI * 2);
		context.fillStyle = 'rgb('+red+','+green+','+blue+')';
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
	}	

}

var dropPen = function(e) {
	penDown = true;
	drawPoint(e);
}

var liftPen = function() {
	penDown = false;
	context.beginPath();
	
}

canvas.addEventListener('mousedown', dropPen);
canvas.addEventListener('mousemove', drawPoint);
canvas.addEventListener('mouseup', liftPen);

function init() {

}

function changePenSize(value) {
	penSize = value;
	context.lineWidth = penSize * 2;
}

function changePenColor(type, value) {
	if (type == 1)
		red = value;
	else if (type == 2)
		green = value;
	else 
		blue = value;
}

function resize_canvas() {
	// do something with canvas
	/*
			var sizing = document.getElementById("whatANiceCanvas");
			sizing.width = window.innerWidth;
			sizing.height = window.innerHeight;
			
			var ctx = sizing.getContext("2d");
			ctx.moveTo(0,0);
			ctx.lineTo(sizing.width, sizing.height);
			ctx.stroke();
	*/
}
