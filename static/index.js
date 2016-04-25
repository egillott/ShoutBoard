// index.js

// request message on server
//Calls SimpleServlet to get the "Hello World" message
/*eslint-env browser */
/*globals ActiveXObject */

var sizing = document.getElementById('whatANiceCanvas');
sizing.width = window.innerWidth;
sizing.height = window.innerHeight;

function resize_canvas() {
			var canvas = document.getElementById("whatANiceCanvas");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			
			var ctx = canvas.getContext("2d");
			ctx.moveTo(0,0);
			ctx.lineTo(canvas.width, canvas.height);
			ctx.stroke();
}