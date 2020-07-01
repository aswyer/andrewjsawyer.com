import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';

class CircleMesh extends THREE.LineLoop { //THREE.Mesh
	acceleration = new THREE.Vector2();
	velocity = new THREE.Vector2();
}

var camera, scene, renderer;
var group;
var mouse = new THREE.Vector2();

var groupWidth;
var groupHeight;

//initial calls
init();
animate();

// function changeMode(isDarkEnabled) {
// 	const lightColor = 
// 	const darkColor = new THREE.Color( 0x0C0D0D );

// 	if (isDarkEnabled) {
// 		scene.background = darkColor;

// 		group.children.forEach(function (circle, index) {
// 			circle.material.color = lightColor;
// 		})

// 		document.body.backgroundColor = "red"

// 	} else {
	
// 		scene.background = new THREE.Color( 0xFFFFFF );;

// 		group.children.forEach(function (circle, index) {
// 			circle.material.color = darkColor;
// 		})

// 	}
// }

function init() {
	renderer = new THREE.WebGLRenderer( { antialias: true } );

	resizedWindow();

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xFFFFFF );;

	group = new THREE.Group();

	scene.add(group);

	addChildElements();

	//add listeners
	window.addEventListener("resize", resizedWindow);
	document.addEventListener("mousemove", mouseMoved);
	
	document.getElementById("renderView").appendChild( renderer.domElement );
	renderer.render( scene, camera );
}

function resizedWindow() {
	groupHeight = window.innerHeight;
	groupWidth = window.innerWidth;

	camera = new THREE.OrthographicCamera(-groupWidth/2, groupWidth/2, groupHeight/2, -groupHeight/2, 0.01, 1000);
	camera.position.z = 1;

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function addChildElements() {
	for (var i = 0; i < 25 + Math.random() * 25; i++) {
		var radius = 5;
		if (i < 10) {
			radius += Math.random() * 50
		}
		
		//geometry
		var geometry = new THREE.CircleGeometry(radius, 3 + Math.random() * 5); //3 + Math.random() * 5     //24
		geometry.vertices.splice(0, 1);

		//material
		var material = new THREE.LineBasicMaterial();
		material.color = material.color = new THREE.Color( 0x000000 );
		//new THREE.Color(Math.random(),Math.random(),Math.random()); 

		//object
		var circleObject = new CircleMesh(geometry, material);
		
		circleObject.position.x = Math.random() * groupWidth - groupWidth/2;
		circleObject.position.y = Math.random() * groupHeight - groupHeight/2;
		// circleObject.position.z = Math.random() * -100

		group.add(circleObject);
	}
}

function mouseMoved(event) {
	mouse.x = event.clientX - groupWidth/2
	mouse.y = -(event.clientY- groupHeight/2) - document.documentElement.scrollTop;
}

function animate() {
	requestAnimationFrame( animate );

	const radius = 100;

	// camera.position.x = -mouse.x//25
	// camera.position.y = -mouse.y//25
	
	group.children.forEach(function (circle, index) {

		var xDistance = (mouse.x - circle.position.x)
		var yDistance = (mouse.y - circle.position.y)
		
		if (xDistance < radius && xDistance > -radius && yDistance < radius && yDistance > -radius) {
			circle.acceleration.x = xDistance
			circle.acceleration.y = yDistance

		} else {
			const magnitude = 10 + Math.random() * 50;

			circle.acceleration.x = (xDistance-circle.velocity.x)/magnitude
			circle.acceleration.y = (yDistance-circle.velocity.y)/magnitude
		}
		
		circle.rotation.z += 0.01

		updateVelocityAndPosition(circle);

	})

	renderer.render( scene, camera );
}

function updateVelocityAndPosition(circle) {
	circle.velocity.x += circle.acceleration.x;
	circle.velocity.y += circle.acceleration.y;
		

	circle.position.x += circle.velocity.x/60
	circle.position.y += circle.velocity.y/60
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