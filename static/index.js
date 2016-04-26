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
var drawMode = false;

changeMode();

var context = canvas.getContext('2d');

var offsetX = 0;
var offsetY = 0;

var image = new Image();
image.onload = function() {
    draw();
};
image.src='images/test.png';

context.lineWidth = penSize * 2;

updateIndicator();

var drawPoint = function(e) {
	if (penDown && drawMode) {
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
	else if(penDown && !drawMode) {
		translatePoint(e);
	}
};
var translatePoint = function(e) {
	if (penDown) {
		offsetX-=(e.clientX/1);
		offsetY-=(e.clientY/1);
		draw();
		offsetX=0;
		offsetY=0;
	}
};
function draw() {
    context.save();
    context.translate(offsetX, offsetY);
    context.clearRect(-offsetX, -offsetY, window.innerWidth, window.innerHeight);
    context.drawImage(image,0,0);
    context.restore();
}
function changeMode() {
    var x = document.getElementById("mode");
    if (!drawMode) {
        x.value = "Go Into Navigate Mode";
    }
    else {
        x.value = "Go Into Draw Mode";
    }
    drawMode = !drawMode;
}
function clearCanvas() {
    if (confirm("Are you sure you want to clear?") === true) {
        context.clearRect(0,0,canvas.width, canvas.height);
    }
    
}
function saveImage() {
    var data = canvas.toDataURL();
    window.open(data, '_blank', 'location=0, menubar=0');
}

var dropPen = function(e) {
    if (drawMode) {
        penDown = true;
        drawPoint(e);
    }
    else {
	penDown = true;
	//translatePoint(e);
        //offsetX-=50;
        draw();
    }
};

var liftPen = function() {
	penDown = false;
	context.beginPath();
};

canvas.addEventListener('mousedown', dropPen);
canvas.addEventListener('mousemove', drawPoint);
canvas.addEventListener('mouseup', liftPen);

function init() {
	penSize = 5;
    penDown = false;
    drawMode = false;
    context.lineWidth = penSize * 2;
    changeMode();
}

function changePenSize(value) {
	penSize = value;
	context.lineWidth = penSize * 2;
}

function changePenColor(type, value) {
	if (type === 1)
		red = value;
	else if (type === 2)
		green = value;
	else 
		blue = value;
	updateIndicator();
}

function updateIndicator() {
	context.beginPath();
	context.arc(window.innerWidth-80, window.innerHeight-120, 20, 0, Math.PI * 2);
	context.fillStyle = 'rgb('+red+','+green+','+blue+')';
	context.fill();
	context.beginPath();
}

function resize_canvas() {
	// do something with canvas
	var data = canvas.toDataURL();
    var sizing = document.getElementById("whatANiceCanvas");
    sizing.width = window.innerWidth;
    sizing.height = window.innerHeight;
    
    var ctx = sizing.getContext("2d");
    var img = new Image;
    img.onload = function() {
        ctx.drawImage(img, 0,0);
    };
    img.src = data;
    init();
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

testPOSTRequest();
function testPOSTRequest() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "submit", true);
	xhttp.setRequestHeader("Content-type", "img");
	xhttp.setRequestHeader("Content-Length", "70");
	xhttp.send("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAPTCAYAAABR9xSMAAAg");
}
