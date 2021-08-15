class ShapeObject extends PIXI.Graphics {

	constructor() {
		super();

		this.acceleration = new PIXI.Point(0,0);
		this.velocity = new PIXI.Point(0,0);

		let radius = Math.random() * 30 + 6;
		
		this.lineStyle(2, 0xFFFFFF, 2);
		//this.beginFill(0x650A5A, 1);

		let random = Math.random();
		if (random < 0.6) {
			this.drawStar(0, 0, 2 + Math.random() * 2, radius, radius, 0);
		} else if (random < 0.8) {
			this.drawCircle(0,0, radius);
		} else if (random < 0.9) {
			this.drawRect(0, 0, radius, radius);
		} else {
			this.moveTo(0, 0);
			this.lineTo(radius/2, radius);
			this.lineTo(radius, 0);
			this.lineTo(0,0);
		}
		//this.drawCircle(0,0, radius);
		
		//this.endFill();
	}
}

let app = new PIXI.Application({transparent: true, antialias:true});

var mouse;

var scopeRadius;

init();

function init() {
	document.getElementById("renderView").appendChild(app.view);

	//resize
	app.renderer.autoResize = true;
	windowResized();
	mouse = new PIXI.Point(window.innerWidth*0.75, window.innerHeight/2);

	addChildElements();

	app.ticker.add(() => animate());

	window.addEventListener("resize", windowResized);
	document.addEventListener("mousemove", mouseMoved);
}

function mouseMoved(event) {
	if (document.documentElement.scrollTop > window.innerHeight) {
		return;
	}

	mouse.x = event.clientX;
	mouse.y = event.clientY + document.documentElement.scrollTop;
}


function addChildElements() {
	for (var i = 0; i < 10 + Math.random() * 20; i++) {
		
		var newShape = new ShapeObject();

		newShape.position.x = Math.random() * window.innerWidth // - window.innerWidth/2;
		newShape.position.y = Math.random() * window.innerHeight // - window.innerHeight/2;

		app.stage.addChild(newShape);
	}
}

function animate() {

	if (document.documentElement.scrollTop > window.innerHeight) {
		return;
	}
	
	// for (var index = 0; index < app.stage.children.count; index++) {
	app.stage.children.forEach(function (shapeObject, index) {
		//var shapeObject = app.stage.children[index]

		var xDistance = (mouse.x - shapeObject.position.x);
		var yDistance = (mouse.y - shapeObject.position.y);
		
		if (
			xDistance < scopeRadius && xDistance > -scopeRadius && 
			yDistance < scopeRadius && yDistance > -scopeRadius) 
		{
			shapeObject.acceleration.x = xDistance*1.2;
			shapeObject.acceleration.y = yDistance*1.2;

		} else {
			const magnitude = 10 + Math.random() * (scopeRadius/2);
 
			shapeObject.acceleration.x = (xDistance-shapeObject.velocity.x)/magnitude;
			shapeObject.acceleration.y = (yDistance-shapeObject.velocity.y)/magnitude;
		}

		
		//not out of 1
		// let alpha = Math.sqrt(shapeObject.acceleration.x^2 + shapeObject.acceleration.y^2)/Math.sqrt(window.innerWidth^2 + window.innerHeight^2) * 0.75 + 0.25
		// console.log(alpha);
		// shapeObject.alpha = alpha;

		shapeObject.rotation += 0.01;

		updateVelocityAndPosition(shapeObject);

	}
	)
}

function updateVelocityAndPosition(shapeObject) {
	shapeObject.velocity.x += shapeObject.acceleration.x;
	shapeObject.velocity.y += shapeObject.acceleration.y;

	shapeObject.position.x += shapeObject.velocity.x/60;
	shapeObject.position.y += shapeObject.velocity.y/60;
}

function windowResized() {
	var introSection = document.getElementsByClassName("introSection")[0];
	introSection.style.height = window.innerHeight*0.8+"px";
	introSection.style.paddingTop = window.innerHeight*0.1+"px";
	introSection.style.paddingBottom = window.innerHeight*0.1+"px";
	
	app.renderer.resize(window.innerWidth, window.innerHeight);

	scopeRadius = window.innerHeight * 0.1;
}