import * as PIXI from 'pixi.js'
import ShapeObject from './ShapeObject'

let app;
var mouse;
var scopeRadius;

export default class Graphic {

	setup(viewID) {
		this.renderView = document.getElementById(viewID);

		app = new PIXI.Application({backgroundAlpha: true, antialias:true});
	
		this.renderView.appendChild(app.view);
	
		//resize
		app.renderer.autoResize = true;
		this.initialWindowSize();
		mouse = new PIXI.Point(window.innerWidth*0.75, window.innerHeight/2);
	
		this.addChildElements();
	
		app.ticker.add(() => this.animate());
	
		window.addEventListener("resize", this.windowResized);
		document.addEventListener("mousemove", this.mouseMoved);
	}
	
	mouseMoved(event) {
		if (document.documentElement.scrollTop > window.innerHeight) {
			return;
		}
	
		mouse.x = event.clientX;
		mouse.y = event.clientY + document.documentElement.scrollTop;
	}
	
	
	addChildElements() {
		for (var i = 0; i < 10 + Math.random() * 20; i++) {
			
			var newShape = new ShapeObject();
	
			newShape.position.x = Math.random() * window.innerWidth // - window.innerWidth/2;
			newShape.position.y = Math.random() * window.innerHeight // - window.innerHeight/2;
	
			app.stage.addChild(newShape);
		}
	}
	
	animate() {
		if (document.documentElement.scrollTop > window.innerHeight) {
			return;
		}
		
		const self = this;
		app.stage.children.forEach(function (shapeObject, index) {
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

				shapeObject.rotation += 0.01;
				self.updateVelocityAndPosition(shapeObject);
		})
		// }
	}
	
	updateVelocityAndPosition(shapeObject) {
		shapeObject.velocity.x += shapeObject.acceleration.x;
		shapeObject.velocity.y += shapeObject.acceleration.y;
	
		shapeObject.position.x += shapeObject.velocity.x/60;
		shapeObject.position.y += shapeObject.velocity.y/60;
	}
	
	initialWindowSize() {
		renderView.style.height = window.innerHeight*0.8+"px";
		renderView.style.paddingTop = window.innerHeight*0.1+"px";
		renderView.style.paddingBottom = window.innerHeight*0.1+"px";
		
		app.renderer.resize(window.innerWidth, window.innerHeight);
	
		scopeRadius = window.innerHeight * 0.1;
	}
	
	windowResized() {
		app.renderer.resize(window.innerWidth, window.innerHeight);
		scopeRadius = window.innerHeight * 0.1;
	}
}

