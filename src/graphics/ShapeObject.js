import * as PIXI from 'pixi.js'
import { Graphics } from '@pixi/graphics';
import '@pixi/graphics-extras';


export default class ShapeObject extends Graphics {

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