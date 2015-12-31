 function loadRocket(){
    console.log("Rocket loaded");
    
    var map = textureLoader.load("textures/particle.png");

        
        var material = new THREE.SpriteMaterial( {map: map, color: 0xffffff, fog: true, blending: THREE.AdditiveBlending, transparent: true} );
        material.opacity = 1.0;
        var sprite = new THREE.Sprite(material);
        sprite.scale.set(0.2,0.2,0.2);
        sprite.visible = true;

        var position = {
            'x' : 0,
            'y' : 0,
            'z' : 0,
        }
        var velocity = {
            'x' : 0,
            'y' : 0,
            'z' : 0,
        }
        rocket = {
          'sprite' : sprite,
          'position' : position,
          'velocity' : velocity,
          'age' : 0
        }
   

    for (var i = 0; i < particles.length; ++i){
        particleGroup.add(rocket.sprite);
    }
}

function loadParticles(){
    console.log("Particles loaded");
    
    var map = textureLoader.load("textures/particle.png");

    for(i = 0; i < particleCount; i++) {
        
        var material = new THREE.SpriteMaterial( {map: map, color: 0xffffff, fog: true, blending: THREE.AdditiveBlending, transparent: true} );
        material.opacity = 0.0;
        var sprite = new THREE.Sprite(material);
        sprite.translateX(Math.random()*10-5);
        sprite.translateY(Math.random()*10-5);
        sprite.translateZ(Math.random()*10-5);
        sprite.scale.set(0.5,0.5,0.5);
        sprite.visible = true;

        var position = {
            'x' : 0,
            'y' : 0,
            'z' : 0,
        }
        var velocity = {
            'x' : 0,
            'y' : 0,
            'z' : 0,
        }
        particle = {
          'sprite' : sprite,
          'position' : position,
          'velocity' : velocity,
          'age' : 0
        }
        particles.push(particle);
    }
   

    for (var i = 0; i < particles.length; ++i){
        particleGroup.add(particles[i].sprite);
    }
}

function loadFlares(){
    console.log("Flares loaded");
    
    var map = textureLoader.load("textures/particle.png");


    for(i = 0; i < flareCount; i++) {
      
        var material = new THREE.SpriteMaterial( {map: map, color: 0xffffff, fog: true, blending: THREE.AdditiveBlending, transparent: true} );
        material.opacity = 0.0;
        var sprite = new THREE.Sprite(material);
        sprite.translateX(Math.random()*10-5);
        sprite.translateY(Math.random()*10-5);
        sprite.translateZ(Math.random()*10-5);
        sprite.scale.set(0.2,0.2,0.2);
        sprite.visible = true;

        var position = {
            'x' : 0,
            'y' : 0,
            'z' : 0,
        }

        var velocity = {
            'x' : 0,
            'y' : 0,
            'z' : 0,
        }

        flare = {
          'sprite' : sprite,
          'position' : position,
          'velocity' : velocity,
          'age' : 0
        }
       
        flares.push(flare);

    }
   

    for (var i = 0; i < flares.length; ++i){
        flareGroup.add(flares[i].sprite);
    }
}

