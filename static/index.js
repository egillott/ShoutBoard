// index.js

// request message on server
//Calls SimpleServlet to get the "Hello World" message
/*eslint-env browser */
/*globals ActiveXObject */

var canvas = document.getElementById('whatANiceCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var penSize = 10;

var context = canvas.getContext('2d');

var drawPoint = function(e) {
	context.beginPath();
	context.arc(e.offSetX, e.offSetY, penSize, 0, Math.PI * 2);
	context.fill();
}



canvas.addEventListener('mousedown', drawPoint)

function resize_canvas() {
			var sizing = document.getElementById("whatANiceCanvas");
			sizing.width = window.innerWidth;
			sizing.height = window.innerHeight;
			
			var ctx = sizing.getContext("2d");
			ctx.moveTo(0,0);
			ctx.lineTo(sizing.width, sizing.height);
			ctx.stroke();
}