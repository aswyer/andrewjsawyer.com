import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 3, 0.2, 3 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById("renderView").appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

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