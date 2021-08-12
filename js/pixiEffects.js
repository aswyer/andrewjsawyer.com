//import '/js/@pixi/graphics-extras';

class ShapeObject extends PIXI.Graphics {

	constructor() {
		super()

		this.acceleration = new PIXI.Point(0,0);
		this.velocity = new PIXI.Point(0,0);

		let radius = Math.random() * 50 + 5;
		
		this.lineStyle(2, 0xFFFFFF, 1);
		//this.beginFill(0x650A5A, 1);
		//this.drawStar(0, 0, 3 + Math.random() * 5, radius, radius, 0);
		this.drawCircle(0,0, radius);
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
	mouse = new PIXI.Point(window.innerWidth/2,window.innerHeight/2);

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
	for (var i = 0; i < 10 + Math.random() * 10; i++) {
		
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

		//shapeObject.rotation.z += 0.01;

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