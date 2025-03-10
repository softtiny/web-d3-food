import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();
const gui = new dat.GUI({name: 'My GUI'});

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


loader.load( 'momo_food/momo_food2.glb', function ( gltf ) {
	
	scene.add( gltf.scene );
	window.gltf=gltf
   
}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.x = .25;
camera.position.y = .33;
camera.position.z = .27;
camera.rotateX(-0.87)
camera.rotateY(.52)
camera.rotateZ(.54)




controls.maxPolarAngle = Math.PI/3;  
controls.minPolarAngle = Math.PI/9;

const initialDistance = controls.getDistance();

// Camera settings object
const cameraSettings = {
    distance: initialDistance,
    minDistance: initialDistance * 0.5,
    maxDistance: initialDistance * 1.2,
    // Function to update camera position
    updateDistance: function(value) {
        const direction = camera.position.clone().sub(controls.target).normalize();
        camera.position.copy(controls.target).add(direction.multiplyScalar(value));
    }
};

// Set initial constraints
controls.minDistance = cameraSettings.minDistance;
controls.maxDistance = cameraSettings.maxDistance;

// Create GUI controls
const cameraFolder = gui.addFolder('Camera Distance');
cameraFolder.add(cameraSettings, 'distance', cameraSettings.minDistance, cameraSettings.maxDistance)
    .onChange(value => cameraSettings.updateDistance(value))
    .name('Current Distance');
window.cameraFolder=cameraFolder

// Update the displayed distance in real-time
function updateGUIDistance() {
    cameraSettings.distance = controls.getDistance();
    // Update the GUI display
    cameraFolder.__controllers[0].updateDisplay();
}

function animate() {
    updateGUIDistance();
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );