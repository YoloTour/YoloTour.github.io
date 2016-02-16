



window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener('mousedown',onDocumentMouseDown,true);




function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();


	renderer.setSize( window.innerWidth, window.innerHeight );


}

function onDocumentMouseDown( event ) {

	event.preventDefault();
	mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	intersects = raycaster.intersectObjects( clickableObjects );

	var dist = distance(camera.position, new THREE.Vector3(0,0,0));
	if(intersects.length > 0 && dist < 5) {
		if(intersects[0].object == btn1Mesh) 
			toggleDayNight();
		else if(intersects[0].object == btn2Mesh){
			if(gomorronPlay){
				gomorron.pause();
				gomorronPlay = false;
			}else{
				gomorron.play();
				gomorronPlay = true;
			}
		}
			
	}

	if(intersects.length > 0) {
		if(intersects[0].object == clickAirplane || intersects[0].object == clickPajala) {
			window.location.href = "http://www.webbkameror.se/webbkameror/pajala/pajala_3_live.php";
			console.log("hej mamma");
		}
		if(intersects[0].object == btn3Mesh){
			
			fireworkCheck = true;

			soundDice = Math.floor(Math.random() * 3) + 1;
			console.log(soundDice);
			switch(soundDice) {
			    case 1:
			        busSound1.play();
			        break;
			    case 2:
			        busSound2.play();
			        break;
			    case 3:
			        busSound3.play();
			        break;

			}
		}
	}

}