var monkey , monkey_running,backgroundImage,monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup,invisibleGround;
var score,highscore,gameOverImage;
var gameState=PLAY;
var PLAY=1;
var END=0;

function preload(){
  monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyImage=loadAnimation("sprite_4.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("e32357043fb801a3dd875a1a1bc632d5.jpg")
  gameOverImage=loadImage("download.png")
}

function setup() {
  createCanvas(550,400);
  ground = createSprite(200,200,1,1);
  ground.addImage("ground",backgroundImage);
  ground.scale=1.15;
  ground1 = createSprite(275,200,1,1);
  ground1.addImage("gameOver",gameOverImage);
  ground1.visible=false;
  ground1.scale=2.2;
  
  monkey = createSprite(40,300,1,1);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.125;
  
  invisibleGround = createSprite(40,390,75,10);
  invisibleGround.visible=false;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  //monkey.debug=true;
  score=0;  
  gameState=PLAY;
  
  highscore=0;
}


function draw() {
  drawSprites();
    
  if(gameState===PLAY){
    stroke("white")
    fill("red")
    textSize(20)
    text("Score: "+ score,410,50)
    text("High score: "+ highscore,50,50);    
    ground.velocityX=-2.5;
    if(ground.x<150){
      ground.x=ground.width/2;
    }
        banana();
        obstacles();
    
        score=Math.round(frameCount/10);
           
        monkey.collide(invisibleGround);
        monkey.velocityY=monkey.velocityY+0.8;

        if(monkey.y>330 && keyDown("space")){
          monkey.velocityY=-20;
        }
        if(obstacleGroup.isTouching(monkey)){
          gameState=END
        }
        if(foodGroup.isTouching(monkey)){
          foodGroup.destroyEach();
        }
        
  }
  
  if(gameState===END){
    monkey.changeAnimation("monkey",monkeyImage)
    ground.depth=0;
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    ground1.depth=ground.depth+50;
    obstacleGroup.visible=false;
    foodGroup.visible=false;
    ground1.visible=true;
    monkey.velocityY=0;
    if(keyDown("r")){
      frameCount=0;
      gameState=PLAY;
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      ground1.visible=false;
      foodGroup.visible=true;
      if(score>highscore){
        highscore=score;
      }
      obstacleGroup.visible=true;
      
    }    
    fill("red");
    textSize(25);
    text("Press R to Restart",170,350);
    
    
  }
   
  
}
function obstacles(){
  if(frameCount%75===0 && frameCount>0){
    obstacle = createSprite(500,367.5,1,1)
    obstacle.addImage("obstacle",obstacleImage)
    obstacle.scale=0.25;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    //obstacle.debug=true;
    obstacle.setCollider("circle",0,0,150)
    obstacleGroup.add(obstacle);
  }
  
}
function banana(){
  if(frameCount%100===0 && frameCount>0){
   var banana = createSprite(450,350,1,1);
   banana.addImage("banana",bananaImage)
   banana.scale=0.075;
   banana.velocityX=-3;
   var selectPos=Math.round(random(1,5)) 
   switch(selectPos){
     case 1:banana.y=200;
       break;
     case 2:banana.y=240;
       break;
     case 3:banana.y=280;
       break;
     case 4:banana.y=320;
       break;
     case 5:banana.y=360;
   }
   new Group(foodGroup); 
   foodGroup.add(banana); 
  }
}