import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';

class LineObject extends THREE.LineLoop { //
	acceleration = new THREE.Vector2();
	velocity = new THREE.Vector2();
	counter = 0;
}

var camera, scene, renderer;
var group;
var mouse = new THREE.Vector2();

var groupWidth;
var groupHeight;

const distanceFromGroup = 20;
const fov = 20;

var aspect;

// var counter = 0;
// var xDistance = 1;
// var yDistance = 1;
// var shouldSetNewVelocity = true;

//initial calls
init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer( { antialias: true } );

	resizedWindow();

	camera.position.z = distanceFromGroup;

	scene = new THREE.Scene();
	group = new THREE.Group();

	scene.add(group);

	addChildElements();

	//add listeners
	window.addEventListener("resize", resizedWindow);
	document.addEventListener("mousemove", mouseMoved);
	
	document.getElementById("renderView").appendChild( renderer.domElement );
}

function resizedWindow() {
	aspect = window.innerWidth / window.innerHeight;

	groupHeight = window.innerHeight;
	//2*distanceFromGroup*Math.tan(fov/2);
	groupWidth = window.innerWidth;
	//groupHeight * aspect;

	camera = new THREE.OrthographicCamera(-groupWidth/2, groupWidth/2, groupHeight/2, -groupHeight/2, 0.01, 1000);

	renderer.setSize(window.innerWidth, window.innerHeight);

	console.log(groupHeight, groupWidth);
}

function addChildElements() {
	for (var i = 0; i < 25; i++) {
		var radius = 5 + Math.random() * 50;
		//Math.random() * 10 + 
		var geometry = new THREE.CircleGeometry(radius, 30);
		geometry.vertices.splice(0, 1);

		var material = new THREE.MeshBasicMaterial();
		material.color = new THREE.Color(0xffffff);
		//LineBasicMaterial();
		// material.color = new THREE.Color(Math.random()*1,Math.random()*1,Math.random()*1);

		var circleObject = new LineObject(geometry, material);
		//THREE.LineLoop(geometry, material);

		// circleObject.position.x = 5;
		// circleObject.position.x = groupWidth/2
		//Math.random() * groupWidth - groupWidth/2;
		circleObject.position.x = Math.random() * groupWidth - groupWidth/2;
		circleObject.position.y = Math.random() * groupHeight - groupHeight/2;

		group.add(circleObject);
	}
}



function mouseMoved(event) {
	mouse.x = ((event.clientX/window.innerWidth)-0.5) * groupWidth;
	//-((event.clientX/window.innerWidth) * groupWidth) + (groupWidth/2);
	mouse.y = -((event.clientY/window.innerHeight)-0.5) * groupHeight;

	// console.log(mouse.x, "   ", mouse.y);
	// console.log((event.clientX/window.innerWidth));
	// console.log(((event.clientX/window.innerWidth)-0.5));
	// console.log(groupWidth, groupHeight)
}

function animate() {
	requestAnimationFrame( animate );

	
	group.children.forEach(function (circle, index) {

		// if (circle.counter >= 15) {
			
		// 	circle.counter = 0;

		// } else {
		// 	circle.counter += 1;
		// }

		const radius = 100 + 50;
		const magnitude = 50;
		const time = 2;

		var xDistance = (mouse.x - circle.position.x)
		// // var xAltertedDistance = xDistance * altertedDistance(xDistance);

		var yDistance = (mouse.y - circle.position.y)
		// // var yAltertedDistance = yDistance * altertedDistance(yDistance);


		
		if (xDistance < radius && xDistance > -radius && yDistance < radius && yDistance > -radius) {
			circle.acceleration.x = xDistance// * circle.acceleration.x;
			circle.acceleration.y = yDistance
		} else {
			// circle.acceleration.x = 0
			// circle.acceleration.y = 0
			// circle.velocity.x = circle.velocity.x/1.5
			// circle.velocity.y = circle.velocity.y/1.5

			// circle.acceleration
			circle.acceleration.x = (2*xDistance-(circle.velocity.x*time))/150///(Math.pow(time, 2))// + (Math.random() * 500 - 250);
			circle.acceleration.y = (2*yDistance-(circle.velocity.y*time))/150///(Math.pow(time, 2))// + (Math.random() * 500 - 250);
		}

		

		updateVelocityAndPosition(circle);

		
	})

	renderer.render( scene, camera );

}

function updateVelocityAndPosition(circle) {
	circle.velocity.x += circle.acceleration.x;
	circle.velocity.y += circle.acceleration.y;
		

	circle.position.x += circle.velocity.x/60; 
	circle.position.y += circle.velocity.y/60;
}

function altertedDistance(original) {
	const value = -1 * Math.pow((original/25), 2) + 25;
	if (value > 0) {
		return value
	} else {
		return 1
	}
}

// var factor = 2.5;

// var height = 0;
// var width = 0;

// $(document).ready(function() {
//     sizeUpdate();

//     console.log("Hi! My name is Andrew. You should hire me :) 470.226.7019");

//     $( "body" ).mousemove(function( event ) {
//         var yFactor = -1 * (event.pageY - height/2)
//         var xFactor =  -1 * (event.pageX - width/2)

//         var movementStrength = (((xFactor*xFactor)/width+(yFactor*yFactor)/height)/36) * factor

//         $("#bgImg").css("transform", "rotate3d(" + xFactor + ", " + yFactor + ", 0, " + movementStrength + "deg) ");
//     });

//     $( "body" ).mouseleave(function() {
//         $("#bgImg").addClass("animate").delay(500).queue(function(next) {
//             $(this).removeClass("animate");
//             $("#bgImg").css("transform", "rotate(0)");
//             next();
//         });
//       });

//     $( window ).resize(function() {
//         sizeUpdate();
//     });
// });

// function sizeUpdate() {
//     height = $(window).height();
//     width = $(window).width();

//     if (width > 1920) {
//         factor = 1;
//     } else if (width > 3840) {
//         factor = 0.5;
//     }
// }