
function drawRoute() {
	visibility(lineGroup,true);
	showRoute = true;
	
	var days = parseInt(document.getElementById("antaldagar").value);
	document.getElementById("hideTour_btn").innerHTML = "Dölj Tour";
	
	if(days < 0 || !days)
		days = 0;
	else if(days > 365) {
		window.alert("Det här är ingen hälsosam idé! 365 dagar räcker gott och väl för dig.");
		document.getElementById("antaldagar").value = 365;
		days = 365;	
	}

	if(lineGroup.children.length > 0) {
		for(i = lineGroup.children.length-1; i > 0; i--)
			lineGroup.remove(lineGroup.children[i]);
	}
	var stepsizeoriginal = 0.1;
	var stepsize = stepsizeoriginal;
	var stepsize2 = stepsizeoriginal;

	var theta = 1.5;
	var phi = 0.9;

	lineGroup.children[0].visible = true;
	if(days > 0)
		drawLine(theta,phi,theta+stepsize/2,phi+stepsize2/2,theta+stepsize,phi+stepsize2);
	for(i = 0; i < 5*days; i++) 
	{

		stepsize = (Math.random()*2-1)*stepsizeoriginal;	
		stepsize2 = (Math.random()*2-1)*stepsizeoriginal;

		drawLine(theta,phi,theta+stepsize/2,phi+stepsize2/2,theta+stepsize,phi+stepsize2);
		
		theta+=stepsize;
		phi += stepsize2;
	}

}

function hideRoute(){
	if(showRoute){	
		visibility(lineGroup,false);
		showRoute = false;
		document.getElementById("hideTour_btn").innerHTML = "Visa Tour";
	}else{
		visibility(lineGroup,true);
		showRoute = true;
		document.getElementById("hideTour_btn").innerHTML = "Dölj Tour";
	}
}

function addMarker() {

	var map = THREE.ImageUtils.loadTexture( "textures/sprites/marker.png" );
    var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
    var sprite = new THREE.Sprite( material );
    sprite.translateX(5.05*Math.sin(1.5+0.1)*Math.cos(0.9+0.1));
	sprite.translateY(5.05*Math.sin(1.5+0.1)*Math.sin(0.9+0.1));
	sprite.translateZ(5.05*Math.cos(1.5+0.1));
    sprite.visible = false;
    lineGroup.add( sprite );

}

function drawLine(theta, phi, theta2, phi2, theta3, phi3) {
	var material = new THREE.LineBasicMaterial({
	color: 0xff0000, linewidth: 10
	});

	var radius = 5.05;
	var x1 = radius*Math.sin(theta)*Math.cos(phi);
	var y1 = radius*Math.sin(theta)*Math.sin(phi);
	var z1 = radius*Math.cos(theta);

	var x2 = radius*Math.sin(theta2)*Math.cos(phi2);
	var y2 = radius*Math.sin(theta2)*Math.sin(phi2);
	var z2 = radius*Math.cos(theta2);

	var x3 = radius*Math.sin(theta3)*Math.cos(phi3);
	var y3 = radius*Math.sin(theta3)*Math.sin(phi3);
	var z3 = radius*Math.cos(theta3);

	var geometry = new THREE.Geometry();

	geometry.vertices.push(
			new THREE.Vector3( x1, y1, z1 ),
			new THREE.Vector3( x2, y2, z2 ),
			new THREE.Vector3( x3, y3, z3 )
	);


	var line = new THREE.Line( geometry, material );
	lineGroup.add( line );

}


function loadStars(){
	geometry = new THREE.Geometry();
	
	sprite1 = textureLoader.load( "textures/sprites/star12.png", null);
	sprite2 = textureLoader.load( "textures/sprites/star12.png", null);
	sprite3 = textureLoader.load( "textures/sprites/star13.png", null);
	sprite4 = textureLoader.load( "textures/sprites/star14.png", null);
	sprite5 = textureLoader.load( "textures/sprites/star15.png", null);
	
	for ( i = 0; i < 20000; i ++ ) {

		var vertex = new THREE.Vector3();
		vertex.x = Math.random()* 20000 - 10000;
		vertex.y = Math.random() * 20000 - 10000;
		vertex.z = Math.random() * 20000 - 10000;

		if(Math.abs(vertex.x) > 1000 || Math.abs(vertex.y) > 1000 || Math.abs(vertex.z) > 1000) {
			geometry.vertices.push( vertex );
		}
	}

	parameters = [ [ [0.0, 0.0, 0.0], sprite1, 90 ],
					 [ [0.0, 0.0, 0.0], sprite2, 80 ],
					 [ [0.0, 0.0, 0.0], sprite3, 100 ],
					 [ [0.0, 0.0, 0.0], sprite4, 70 ],
					 [ [0.0, 0.0, 0.0], sprite5, 60 ]];
					 		 
	var particles = [];
	
	for ( i = 0; i < 5; ++i ) {	
		color  = parameters[i][0];
		sprite = parameters[i][1];
		size   = parameters[i][2];

		materials[i] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, 
			depthTest: true, transparent : true, alphaTest: 0.015, opacity: 0.25, fog: 0.8} );

		materials[i].color.setHSL( color[0], color[1], color[2] );

		particles = new THREE.Points( geometry, materials[i] );

		particles.rotation.x = Math.random() * 6;
		particles.rotation.y = Math.random() * 6;
		particles.rotation.z = Math.random() * 6;
		
		stars.push(particles);


	}

	for (var i = 0; i < stars.length; ++i){nightSky.add(stars[i]);}
}


function loadClouds(){
	
	var map = THREE.ImageUtils.loadTexture( "textures/sprites/cloud1.png" );

    radius = 5.35;
    var rand1 = Math.random()*100;
    var rand2 = Math.random()*100;
    var rand3 = 1 - Math.random()*0.5;

    for(i = 0; i < 100; i++) {
        var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
    	material.opacity = 0.7;
    	var sprite = new THREE.Sprite(material);
    	
    	sprite.translateX(radius*Math.sin(rand1)*Math.cos(rand2));
		sprite.translateY(radius*Math.sin(rand1)*Math.sin(rand2));
		sprite.translateZ(radius*Math.cos(rand1));
		sprite.scale.set(rand3,rand3,rand3);

		rand1 = Math.random()*100;
		rand2 = Math.random()*100;
		rand3 = 1 - Math.random()*0.5;
    	clouds.push(sprite);

    }
	cloudGroup =new THREE.Object3D;
	for (var i = 0; i < clouds.length; ++i){cloudGroup.add(clouds[i]);}
			sceneGraph.add(cloudGroup);
}

function loadModels(){
	///OBJ
			onProgress = function ( xhr ) {
				if ( xhr.lengthComputable ) {
					var percentComplete = xhr.loaded / xhr.total * 100;
					//console.log( Math.round(percentComplete, 2) + '% downloaded' );
				}
			};
			onError = function ( xhr ) {
				//console.log("build house error " + xhr);
			};
			THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

			// Loader
			var loader2 = new THREE.OBJMTLLoader();


			var windmill = new THREE.Object3D;
			scene.add(windmill);
					//************* OBJ ***********************

			loader2.load( "obj/bus.obj", "obj/bus.mtl", function(object){ 
				

				object.scale.set(0.2, 0.2, 0.2);
				busGroup.add(daBus);
				daBus.add(object);
				daBus.position.x = 10;
				object.rotation.y -= Math.PI/2;
				
			}, onProgress, onError);


			var loader = new THREE.JSONLoader();
			//************* JSON ***********************


			var yoloText =new THREE.Object3D;

			loader.load("obj/yolotour.js", 

				function(geometry) {

					var objectMaterial = new THREE.MeshBasicMaterial({map: textureLoader.load("textures/rainbow.png"), transparent: true, opacity: 0.7 });

					objectMaterial.side = THREE.DoubleSide;
					object = new THREE.Mesh(geometry, objectMaterial);
					object.rotation.z = -0.07;
					object.translateY(5.5);
					sceneGraph.add(object);

			});

			loader.load("obj/2016.js", 

				function(geometry) {

					var objectMaterial = new THREE.MeshBasicMaterial({map: textureLoader.load("textures/rainbow.png"), transparent: true, opacity: 0.7 });

					objectMaterial.side = THREE.DoubleSide;
					object = new THREE.Mesh(geometry, objectMaterial);
					object.rotation.z = -0.07;
					object.translateY(-7.5);
					object.scale.set(0.7,0.7,0.7);
					sceneGraph.add(object);

			});
			//Pajala AirPORT
			loader2.load( "obj/pajala1.obj", "obj/pajala1.mtl", function(object){ 
				

				object.scale.set(0.6, 0.6, 0.6);
				object.position.x = 16.5;
				pajalaGroup.add(object);
				
			}, onProgress, onError);
			
			//Pajala AirPLANE
			loader2.load( "obj/airplane.obj", "obj/airplane.mtl", function(object){ 
				

				object.scale.set(0.2, 0.2, 0.2);

				object.rotation.x = -1;
				pajalaPlaneGroup.rotation.y = 3.14/2.5;
				pajalaPlaneGroup.add(object);
				
			}, onProgress, onError);


			fire_material = new THREE.ShaderMaterial( {

			    uniforms: { 
			        tExplosion: {
			            type: "t", 
			            value: textureLoader.load( 'explosion.png' )
			        },
			        time: { // float initialized to 0
			            type: "f", 
			            value: 0.0 
			        }
			    },
			    vertexShader: document.getElementById( 'vertexShader' ).textContent,
			    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
			    
			} );

			loader.load("obj/fire.js", 

				function(geometry) {

					object = new THREE.Mesh(geometry, fire_material);
					object.rotation.y = Math.PI;
					object.scale.x = 0.12;
					object.scale.y = 0.12;
					object.scale.z = 0.15;
					object.translateZ(-3.7);
					daFire.add(object);
					daFire.translateY(0.3);


			});

}

function loadBasics(){

			
			sunGroup =new THREE.Object3D;
			//***********************************

			var sunGeometry = new THREE.SphereGeometry( 5, 42, 42 );

			var sunMaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xffffaa});
			sunMaterial.map = textureLoader.load('textures/earth5.png');
			sunSphere = new THREE.Mesh( sunGeometry, sunMaterial );

			var insideGeometry = new THREE.SphereGeometry( 5, 42, 42);
			var insideMaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xffffaa});
			insideMaterial.map = textureLoader.load('textures/cockpit2.jpg');
			insideSphere = new THREE.Mesh( insideGeometry, insideMaterial );
			insideSphere.material.side = THREE.BackSide;

			sunGroup.add( sunSphere);
			sunSphere.add( insideSphere);
			scene.add(sunGroup);
			clickableObjects.push(sunSphere	); //btn1Mesh

			
			// BUTTON 1
			var box1Geometry = new THREE.CubeGeometry( 5,0.5,5 );
			var box1Material = new THREE.MeshPhongMaterial({map: textureLoader.load("textures/button.png")});
			box1Material.color = new THREE.Color("rgb(150, 150, 150)");
			var box1Mesh = new THREE.Mesh( box1Geometry, box1Material );
			btn1.add(box1Mesh);

			var btn1Geometry = new THREE.CylinderGeometry( 0.8, 0.8, 0.5, 32 );
			var btn1Material = new THREE.MeshPhongMaterial();
			btn1Material.color = new THREE.Color("rgb(170, 0, 0)");
			btn1Mesh = new THREE.Mesh( btn1Geometry, btn1Material );
			btn1Mesh.translateY(-0.3);
			btn1.add(btn1Mesh);

			btn1.translateY(4.8);
			btn1.scale.x = 0.15;
			btn1.scale.y = 0.15;
			btn1.scale.z = 0.15;

			// BUTTON 2
			var box2Geometry = new THREE.CubeGeometry( 10,1,6 );
			var box2Material = new THREE.MeshPhongMaterial({map: textureLoader.load("textures/button2.jpg")});
			box2Material.color = new THREE.Color("rgb(150, 150, 150)");
			var box2Mesh = new THREE.Mesh( box2Geometry, box2Material );
			btn2.add(box2Mesh);

			var btn2Geometry = new THREE.CylinderGeometry( 0.8, 0.8, 0.5, 32 );
			var btn2Material = new THREE.MeshPhongMaterial();
			btn2Material.color = new THREE.Color("rgb(180, 160, 100)");
			btn2Mesh = new THREE.Mesh( btn2Geometry, btn2Material );
			btn2Mesh.translateY(0.8);
			btn2Mesh.translateX(-4);
			btn2Mesh.translateZ(-0.8);
			btn2.add(btn2Mesh);

			btn2.translateZ(-4.15);
			btn2.translateX(-2);
			btn2.translateY(-1.0);
			btn2.scale.x = 0.15;
			btn2.scale.y = 0.15;
			btn2.scale.z = 0.15;
			btn2.rotation.x = Math.PI/2;
			btn2.rotation.z = -0.5;

			// BUTTON 2
			var btn3Geometry = new THREE.CubeGeometry( 1.5,1.5,4 );
			var btn3Material = new THREE.MeshPhongMaterial({map: textureLoader.load("textures/rainbow.png"), transparent: true, opacity: 0.0});
			btn3Material.color = new THREE.Color("rgb(150, 150, 150)");
			btn3Mesh = new THREE.Mesh( btn3Geometry, btn3Material );
			btn3.add(btn3Mesh);


	

			//ADD LINEGROUP
			lineGroup = new THREE.Object3D;
			addMarker();
			sunSphere.add(lineGroup);


			//ADD BUS
			busGroup =new THREE.Object3D;
			daBus =new THREE.Object3D;
			daBus.add(daFire);
			var busGeometry = new THREE.SphereGeometry( 1, 32, 32 );

			var busMaterial = new THREE.MeshPhongMaterial({wireframe: false, color: 0xffffaa});
			busMaterial.map = textureLoader.load('textures/rainbow.png');
			busSphere = new THREE.Mesh( busGeometry, busMaterial );

			//ADD PAJALA
			pajalaGroup = new THREE.Object3D;
			pajalaPortGroup = new THREE.Object3D;
			pajalaPlaneGroup = new THREE.Object3D;

			pajalaPortGroup.position.x = 16;
			pajalaPlaneGroup.position.x = 3;;

			pajalaGroup.add(pajalaPortGroup);
			pajalaPortGroup.add(pajalaPlaneGroup);
			clickPajala = new THREE.Mesh(new THREE.CubeGeometry(2,0.8,2.2), new THREE.MeshNormalMaterial());
			clickAirplane = new THREE.Mesh(new THREE.CubeGeometry(1.5,0.7,0.7), new THREE.MeshNormalMaterial());
			clickPajala.material.opacity = 0;
			clickPajala.material.transparent = true;
			clickAirplane.material.opacity = 0;
			clickAirplane.material.transparent = true;

			pajalaGroup.add(clickPajala);
			clickPajala.position.x = 16;
			pajalaPlaneGroup.add(clickAirplane);




			//Add clickable objects
			clickableObjects.push(btn1Mesh); //btn1Mesh
			clickableObjects.push(btn2Mesh); //btn1Mesh
			clickableObjects.push(btn3Mesh); //btn1Mesh
			clickableObjects.push(clickPajala);
			clickableObjects.push(clickAirplane);

			//FIREEE	
		    fire_material2 = new THREE.ShaderMaterial( {
			    uniforms: {tExplosion: {type: "t", value: textureLoader.load( 'smoke.png' ), uOpacity: 0.1},
			        time: { // float initialized to 0
			            type: "f", 
			            value: 0.0 
			        }
			    },
			    vertexShader: document.getElementById( 'vertexShader' ).textContent,
			    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			    
			} );
		    
		    // create a sphere and assign the material
		    mesh = new THREE.Mesh( 
		        new THREE.TetrahedronGeometry( 10, 4 ), 
		        //new THREE.CylinderGeometry(10, 30, 80, 30, 30, false),
		        fire_material2 
		    );

		   
		    mesh.scale.set(0.085, 0.085, 0.025);
			mesh.translateZ(3.5);
		    daFire.add( mesh );
		    daFire.translateZ(-0.7);

		    
		    // create a sphere and assign the material
		    mesh2 = new THREE.Mesh( 
		        new THREE.TetrahedronGeometry( 10, 4 ), 
		        //new THREE.CylinderGeometry(10, 30, 80, 30, 30, false),
		        fire_material2 
		    );

		   
		    mesh2.scale.set(0.07, 0.07, 0.020);
			mesh2.translateZ(4.3);
		    daFire.add( mesh2 );
 



			//busSphere.position.x = 10;
			//busGroup.add( busSphere);
			sceneGraph.add(busGroup);
			sceneGraph.add(pajalaGroup);
	

			var pathGeometry = new THREE.TorusGeometry( 10, 0.1, 10, 100 );
			var pathMaterial = new THREE.MeshLambertMaterial({map: textureLoader.load("textures/rainbow.png"), transparent: true, opacity: 0.3 });
			path = new THREE.Mesh( pathGeometry, pathMaterial );

			path.rotation.x = Math.PI/2; 

			
			
			addResenarer();
			//sceneGraph.add(path);
}

function toggleDayNight(){
	console.log(date.getHours());

	if(day){
		renderer.setClearColor ( 0x000000, 1 );
		visibility(nightSky, true);
		visibility(daySky, false);
		day = false;
		pointLight.color.setHSL( 0.8, 0.8, 0.8 );

	}else{
		resetCloudOpacity();
		renderer.setClearColor ( 0xB3EAFF, 1 );
		day = true;
		visibility(nightSky,false);
		visibility(daySky,true);
		pointLight.color.setHSL( 0,0,0 );
	}
}

function setCloudOpacity() {
	var posBus = new THREE.Vector3();
	var posCloud = new THREE.Vector3();
	posBus.setFromMatrixPosition( daBus.matrixWorld );

	for(i = 0; i < clouds.length; i++) {
			posCloud = posCloud.setFromMatrixPosition(clouds[i].matrixWorld);
			clouds[i].material.opacity = Math.max(1.4 - 0.7*2*distance(posCloud, posBus)/10, 0);
	}
}


function resetCloudOpacity() {
	for(i = 0; i < clouds.length; i++) {
		clouds[i].material.opacity = 0.7;
	}
}

function addLights(){

	pointLight = new THREE.PointLight( 0xaaffff, 1.5, 0 );
	pointLight.color.setHSL( 0,0,0 );
	pointLight.position.set( 0, 0, 0 );
	sceneGraph.add( pointLight );

	var cabinLight = new THREE.PointLight( 0xaaffff, 1.5, 0 );
	cabinLight.color.setHSL( 0.1,0.1,0.1 );
	cabinLight.position.set( 0, 0, 0 );
	sceneGraph.add( cabinLight );


	//var light = new DirectionalLight( 0xB3EAFF, 1);

	var light = new THREE.DirectionalLight( 0xffffff,0.2);
	light.position.set( -20, 20, 20 ).normalize();
	sceneGraph.add(light);

	var A_light = new THREE.AmbientLight( 0xdddddd ); // soft 
	daySky.add( A_light );
}

function visibility(object, bool){
	object.traverse(function(child) {child.visible = bool;});
}


function markTextfield() {
	document.getElementById("antaldagar").select();
}

function distance(first, second) {
	return Math.pow((Math.pow(Math.abs(first.x - second.x),3) + Math.pow(Math.abs(first.y - second.y),3) + Math.pow(Math.abs(first.z - second.z),3)),1/3);
}

function addResenarer() {
	var map, material, sprite;
	
	for(var i = 1; i < 33; i++){

		map = THREE.ImageUtils.loadTexture( "resenarer/" + String(i) + ".png" );
	    material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
	    sprite = new THREE.Sprite( material );
		sprite.translateY(i/50);
		sprite.translateX(5 + i/2);
	    sprite.visible = true;
	    resenar = new THREE.Object3D;
	    resenar.add( sprite );
	    sceneGraph.add(resenar);
	    resenarer.push(resenar);

	    resenar.rotation.z = i/10;

	}   
}