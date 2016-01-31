function updateRocketPosition(){
        

    rocket.velocity.y -= 0.001;
    rocket.sprite.position.x += rocket.velocity.x;  
    rocket.sprite.position.y += rocket.velocity.y;  
    rocket.sprite.position.z += rocket.velocity.z;  
}

function updateSpritePositions(){


    if(inExplosion){
        pCount = particleCount;

        while(pCount--){





            if(time2 < 4){
                //=================== PARTICLES =========================
                // initialize particle
                particle = particles[pCount];
                particle.sprite.material.opacity = 0;
                // give speed to position
                particle.velocity.y -= 0.0002; //Gravity

                particle.velocity.x *= 0.98;
                particle.velocity.y *= 0.98;
                particle.velocity.z *= 0.98;

                particle.sprite.position.x += particle.velocity.x;
                particle.sprite.position.y += particle.velocity.y;
                particle.sprite.position.z += particle.velocity.z;




                //=================== FLARES =========================
            
                flare = flares[flareToMove];
                flare.age = (flareCount/particleCount);
                flare.velocity.x = (Math.random()-0.5)*flareInitSpeed;
                flare.velocity.y = (Math.random()-0.5)*flareInitSpeed - 0.001; //Gravity 
                flare.velocity.z = (Math.random()-0.5)*flareInitSpeed; 

                flare.sprite.position.x = particle.sprite.position.x;
                flare.sprite.position.y = particle.sprite.position.y;
                flare.sprite.position.z = particle.sprite.position.z;
                flare.sprite.material.opacity = 1.0/(time2*10);
            }



            if(flareToMove < flareCount-1)
                flareToMove++;
            else
                flareToMove = 0;

        }   


        fCount = flareCount;

        while(fCount--){

            flare = flares[fCount];
            flare.age--;
            flare.sprite.material.opacity = flare.age/(flareCount/particleCount) / time2/2;

          // console.log(flare.age);
            flare.sprite.position.x += flare.velocity.x;
            flare.sprite.position.y += flare.velocity.y;
            flare.sprite.position.z += flare.velocity.z;



            flare.sprite.position.y += flare.velocity.y;

           // flare.sprite.position.y += gravity;
          
        }  
    }
}


function sendRocket(){
	if(soundOn)
    	fireworkSound11.play();
    
    flareToMove = 0;
    date = Date.now();
    inExplosion = false;

    fCount = flareCount;
    while(fCount--){

        flare = flares[fCount];
        flare.sprite.material.opacity = 0;
    }  
   
    rocket.sprite.material.opacity = 1;

    rocket.sprite.position.setFromMatrixPosition( daBus.matrixWorld );


    rocket.velocity.x = (Math.random()-0.5)*rocketInitSpeed;
    rocket.velocity.y = (Math.random())*rocketInitSpeed +0.07; 
    rocket.velocity.z = (Math.random()-0.5)*rocketInitSpeed; 
}


function initExplosion(x,y,z){

    console.log("Explosion initiated");

    if(soundOn)
    	fireworkSound21.play();

    fCount = flareCount;
    while(fCount--){
        flare = flares[fCount];

        flare.sprite.material.opacity = 0.0;
        flare.sprite.position.x = x;
        flare.sprite.position.y = y;
        flare.sprite.position.z = z;
    } 


    pCount = particleCount;
    while(pCount--){
        particle = particles[pCount];
         // give particle speed
        particle.sprite.position.x = x;
        particle.sprite.position.y = y;
        particle.sprite.position.z = z;

        particle.velocity.x = (Math.random()-0.5)*particleInitSpeed;
        particle.velocity.y = (Math.random()-0.5)*particleInitSpeed;
        particle.velocity.z = (Math.random()-0.5)*particleInitSpeed;
     
            

        particle.sprite.material.opacity = 1.0;
    } 
}