var PLAY=1;
var END=0;
var estado=PLAY;
var trex, trexRunning;
var piso,pisoima, pisoinvi
var nubes,nubes1
var captus,cap1,cap2,cap3,cap4,cap5,cap6
var scorre=0
var nobes,captu;
var game,over;
var rein,iciar;
var jumpsound,muertesound,puntossound;
var tero,tero1
var animacion;

 
function preload(){
trexRunning= loadAnimation("azul.gif",
"trex2.png","trex3.png")
 // piso
pisoima=loadAnimation("ground2.png")
  nubes1=loadImage("cloud.png")
  //captus
  cap1=loadImage("obstacle1.png")
  cap2=loadImage("obstacle2.png")
  cap3=loadImage("obstacle3.png")
  cap4=loadImage("obstacle4.png")
  cap5=loadImage("obstacle5.png")
  cap6=loadImage("obstacle6.png")
// game over 
  over=loadImage("gameOver.png")
// reiniciar
  iciar=loadImage("restart.png")
// sonidos
jumpsound=loadSound("jump.mp3")
muertesound=loadSound("die.mp3")
puntossound=loadSound("checkPoint.mp3")
//teros
  tero1=loadAnimation("tero1.png","tero2.png")
  animacion=loadAnimation("trex_collided.png")
}
function setup() {
  
  createCanvas(600, 200);
  
  //sprite del trex
  trex=createSprite(40,100,20,20)
  trex.addAnimation("running",trexRunning);
  trex.addAnimation("happy",animacion)
  trex.scale=0.5;
  trex.debug=false
  
  edges=createEdgeSprites();
  
  nobes=new Group()
  captu=new Group()
  
  // piso
  piso=createSprite(200,180,400,20)
piso.addAnimation("piso",pisoima);
  pisoinvi=createSprite(200,190,400,20)
  pisoinvi.visible=false
// game over
  game=createSprite(300,100)
  game.addImage(over)
  game.scale=.5
  // reiniciar
  rein=createSprite(300,140)
rein.addImage(iciar)
  rein.scale=.5
}

function draw() {
  background(180);
  text("puntos "+ scorre,30,40)
 
 
  if (estado==PLAY){
 scorre=scorre+Math.round(getFrameRate()/60)
    piso.velocityX=-(4+3*scorre/100)
      game.visible=false
      rein.visible=false
    if (piso.x<0){ 
   piso.x=piso.width/2  } 
  
  if(keyDown("space")&& trex.y>=150){
     trex.velocityY=-10;
    jumpsound.play();
  }
    
   if(frameCount%150==0){
      teros();
      }
    
 if (scorre>0 && scorre%100==0){
   puntossound.play();
     } 
    
  trex.velocityY=trex.velocityY+0.5;
    NUBES();
    cap();
    if(trex.isTouching(captu))
  {
    muertesound.play();
     estado=END;   
  }
 
   
  }

    else   if(estado==END) {
piso.velocityX=0
nobes.setVelocityXEach(0)
captu.setVelocityXEach(0)
 captu.setLifetimeEach(-1)  
nobes.setLifetimeEach(-1)
  trex.changeAnimation("happy",animacion)
      game.visible=true
      rein.visible=true
      if(mousePressedOver(rein)){
        reset();
         
         }
    }
  
  
  trex.collide(pisoinvi)

  
    drawSprites();
}
function NUBES(){
  if(frameCount%60==0){
  nubes=createSprite(600,100,40,10)
    nubes.y=Math.round(random(10,75))
  nubes.velocityX=-8;
 nubes.addImage(nubes1)
    nubes.depth=trex.depth
    trex.depth=trex.depth+1
    nubes.lifetime=220
    nobes.add(nubes);
}
}


    function cap (){
if(frameCount%60==0){
  captus=createSprite(600,165,10,40)
  captus.velocityX=-(6+scorre/100)
 var ram=Math.round(random(1,6))
  
 
 switch(ram){
   case 1:captus.addImage(cap1); 
     captus.scale=.8
     break;
    case 2:captus.addImage(cap2);
     captus.scale=.7
     break;
     case 3: captus.addImage(cap3);
     captus.scale=.6
     break;
     case 4: captus.addImage(cap4);
     captus.scale=.6
     break;
     case 5: captus.addImage(cap5);
     captus.scale=.5
     break;
     case 6: captus.addImage(cap6);
     captus.scale=.5
     break;
     default:break;
        }
 
  captus.lifetime=170;

 captu.add(captus);
  
  
  
}      
            
  
    }
    
    
function teros(){
 if (frameCount%80==0){
     tero=createSprite(700,165,10,40)
    tero.y=Math.round(random(150,190))
 tero.velocityX=-4;
 tero.addAnimation(tero1)
    //tero.lifetime=220
    //tero.add(nubes);
   console.log(tero.x)
 }
  
}


function reset(){
  estado=PLAY;
    
  game.visible=false
      rein.visible=false
    
    
  nobes.destroyEach();
    captu.destroyEach();
    scorre=0
    trex.changeAnimation("running",trexRunning)
    
  }





