
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup //restarImage,groundImage,ground
var servival_Time=0;
var bananaCount=0



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_Stoped=loadImage("sprite_0.png")
 // groundImage= loadImage("ground-png-1.jpg")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

 
}



function setup() {
  //createCanvas(windowWidth,windowHeight)
   createCanvas(500,400)
   monkey = createSprite(50,315,20,20);
   monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stoped", monkey_Stoped)
   monkey.scale=0.1;
  
   ground = createSprite(400,350,900,10);
   //ground.addImage(groundImage);
   //ground.scale=0.2;
   ground.velocityX=-4;
   ground.x=ground.width/2;
  
   bananaGroup = new Group();
   obstacleGroup = new Group();
  
}


function draw() {
        background("green");
  
 stroke("white");
  textSize(20);
  fill("black");
  text("servival Time : " + servival_Time,350,50 )
  text("bananaCount : " +bananaCount,350,100)
  
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 210) {
        monkey.velocityY = -12;
       
    }
  
   //add gravity
    monkey.velocityY = monkey.velocityY + 1               
  
    if (ground.x < 100){
       ground.x = ground.width/2;
    }
   
  if(bananaGroup.isTouching(monkey)){
  bananaCount=bananaCount+1;
  }
  
  if(obstacleGroup.isTouching(monkey)){
     
      ground.velocityX = 0;
      monkey.changeAnimation("stoped",monkey_Stoped)
      
     
      //set lifetime of the game objects so that they are never       destroyed
      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
     
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0); 
  }

    
  monkey.collide(ground);
    
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
}

function spawnObstacle(){
   
   if(frameCount%50===0){
     obstacle= createSprite(500,330,100,100);
     obstacle.addImage(obstaceImage);
     obstacle.scale=0.14;
     obstacle.velocityX=-4;
     obstacle.lifetime=100;
     obstacleGroup.add(obstacle);
    
   }
  
}
function spawnBanana() {
  //write code here to spawn the banana's
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,40,10);
   banana.y = Math.round(random(210,300));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth =banana.depth + 1;
    
    //add each banana to the group
        bananaGroup.add(banana);
  }
}






