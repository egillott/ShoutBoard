/*eslint-env browser */
/*globals ActiveXObject */

var canvas = document.getElementById('whatANiceCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var penSize = 5;
var penDown = false;
var red = 0;
var green = 0;
var blue = 0;
var drawMode = false;
var eraser = false;
changeMode();

var names;

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

var red2;
var green2;
var blue2;

function eraserMode() {
    var eraserbutton = document.getElementById("eraser");
    if (!eraser) {
        red2 = red;
        green2 = green;
        blue2 = blue;
        red = 256;
        green = 256;
        blue = 256;
        eraserbutton.value = "Pen";
    }
    else {
        eraserbutton.value = "Eraser";
        red = red2;
        green = green2;
        blue = blue2;
    }
    eraser = !eraser;
    
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
    
    
    var imagename = prompt("Name your image", "Sample Name");
   	if (imagename !== null) {
   		tryUploading(imagename, data);
	}

 //   window.open(data, '_blank', 'location=0, menubar=0');
}
function loadImage() {
	getNameList();
    
   /*
        var response = nameAvailable(imagename);
        if (response === "False") {
            // load image
        }
        else if (response === "True") {
            alert("No image found!");
        }
       */
//      window.open(data, '_blank', 'location=0, menubar=0');
//    }
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
    updateIndicator();
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

function getImageData(imageData) {
    var sizing = document.getElementById("whatANiceCanvas");
	sizing.width = window.innerWidth;
    sizing.height = window.innerHeight;
    
    var ctx = sizing.getContext("2d");
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0,0);
    };
    img.src = imageData;
    init();
}

function populateNameList(nameList) {
	//TODO someshit
	var imagename = prompt(nameList, "Sample Name");
    if (imagename !== null) {
   		tryGetting(imagename);
   	}
}

function resize_canvas() {
	// do something with canvas
	var data = canvas.toDataURL();
    var sizing = document.getElementById("whatANiceCanvas");
    sizing.width = window.innerWidth;
    sizing.height = window.innerHeight;
    
    var ctx = sizing.getContext("2d");
    var img = new Image();
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


//remember to call nameAvailable first before sending the image
//responseText is True or False for nameAvailable, and okay or just nothing(if it breaks) for sendPOSTRequest
//nameAvailable("testImageName");
//sendPOSTRequest("testImageName","SomeBullshitYouGetFromCallingCanvasToDataURL");
function sendPOSTRequest(imageName, imageData) {
	var xhttp = new XMLHttpRequest();
	var msg = imageName + "&" + imageData;
	xhttp.open("POST", "submit", true);
	xhttp.setRequestHeader("Content-type", "img");
	xhttp.send(msg);
	return xhttp;
}

function tryUploading(imageName, imageData) {
	var xhttp = sendPOSTRequest("check", imageName);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			if (xhttp.responseText === "True") {
				sendPOSTRequest(imageName, imageData);
			}
		}
	};
}

function tryGetting(imageName) {
	var xhttp = new XMLHttpRequest();
	var path = "image/" + imageName;
	xhttp.open("GET", path, true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			getImageData(xhttp.responseText);
		}
	};
}

//this returns a comma separated list of names, ex, "test000,test001,wow"
function getNameList() {
	var xhttp = new XMLHttpRequest();
	var path = "name";
	xhttp.open("GET", path, true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			populateNameList(xhttp.responseText);
		}
	};
}