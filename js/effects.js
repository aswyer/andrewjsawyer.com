import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';

class CircleMesh extends THREE.LineLoop { //THREE.Mesh
	constructor(geometry, material) {
		super(geometry, material);
		this._acceleration = new THREE.Vector2();
		this._velocity = new THREE.Vector2();
	}

	get acceleration() {
		return this._acceleration;
	}

	get velocity() {
		return this._velocity;
	}
}

var camera, scene, renderer;
var group;
var mouse = new THREE.Vector2();

var groupWidth;
var groupHeight;

const radius = 100;

var contentColor;
var backgroundColor;

//initial calls
init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer( { antialias: true } );

	resizedWindow();
	mouse.x = (groupWidth/4);

	scene = new THREE.Scene();
	group = new THREE.Group();
	scene.add(group);

	addChildElements();

	//add listeners
	window.addEventListener("resize", resizedWindow);
	document.addEventListener("mousemove", mouseMoved);
	
	document.getElementById("renderView").appendChild( renderer.domElement );
	renderer.render( scene, camera );

	//color calls
	updateColorVariables();
	// window.matchMedia('(prefers-color-scheme: dark)')
    //   .addEventListener('change', event => {
	// 	updateColorVariables();
	// })

	console.log("Hi! I'd love to chat about who you are, what you're making, and why you do it. Text me: 470.226.7019");
}

function updateColorVariables() {
	var tempContent = getComputedStyle(document.documentElement).getPropertyValue('--contentColor').substring(1);
	var tempBackground = getComputedStyle(document.documentElement).getPropertyValue('--backgroundColor').substring(1);

	contentColor = new THREE.Color(tempContent);
	backgroundColor = new THREE.Color(tempBackground);

	scene.background = backgroundColor;
	group.children.forEach(function (circle, index) {
		circle.material.color = contentColor;
	})
}

function resizedWindow() {
	groupHeight = window.innerHeight;
	groupWidth = window.innerWidth;

	camera = new THREE.OrthographicCamera(-groupWidth/2, groupWidth/2, groupHeight/2, -groupHeight/2, 0.01, 1000);
	camera.position.z = 1;

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	var introSection = document.getElementsByClassName("introSection")[0];
	introSection.style.height = window.innerHeight*0.8+"px";
	introSection.style.paddingTop = window.innerHeight*0.1+"px";
	introSection.style.paddingBottom = window.innerHeight*0.1+"px";
}

function addChildElements() {
	for (var i = 0; i < 25 + Math.random() * 25; i++) {
		var radius = 5;
		if (i < 10) {
			radius += Math.random() * 50;
		}
		
		//geometry
		var geometry = new THREE.CircleGeometry(radius, 3 + Math.random() * 5);
		geometry.vertices.splice(0, 1);

		//material
		var material = new THREE.LineBasicMaterial();

		//object
		var circleObject = new CircleMesh(geometry, material);
		
		circleObject.position.x = Math.random() * groupWidth - groupWidth/2;
		circleObject.position.y = Math.random() * groupHeight - groupHeight/2;

		group.add(circleObject);
	}
}

function mouseMoved(event) {
	if (document.documentElement.scrollTop > window.innerHeight) {
		return;
	}

	mouse.x = event.clientX - groupWidth/2;
	mouse.y = -(event.clientY- groupHeight/2) - document.documentElement.scrollTop;
}

function animate() {
	

	if (document.documentElement.scrollTop > window.innerHeight) {
		return;
	}
	
	group.children.forEach(function (circle, index) {

		var xDistance = (mouse.x - circle.position.x);
		var yDistance = (mouse.y - circle.position.y);
		
		if (
			xDistance < radius && xDistance > -radius && 
			yDistance < radius && yDistance > -radius) 
		{
			circle.acceleration.x = xDistance*1.2;
			circle.acceleration.y = yDistance*1.2;

		} else {
			const magnitude = 10 + Math.random() * (radius/2);

			circle.acceleration.x = (xDistance-circle.velocity.x)/magnitude;
			circle.acceleration.y = (yDistance-circle.velocity.y)/magnitude;
		}

		circle.rotation.z += 0.01;

		updateVelocityAndPosition(circle);

	})

	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

function updateVelocityAndPosition(circle) {
	circle.velocity.x += circle.acceleration.x;
	circle.velocity.y += circle.acceleration.y;

	circle.position.x += circle.velocity.x/60;
	circle.position.y += circle.velocity.y/60;
}