const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, Enemy1,Enemy3;
var backgroundImg,platform;
var killer, slingshot;

var gameState = "onThread";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    Enemy1 = new Enemy(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    Enemy2 = new Enemy(810, 220);
    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    killer = new Killer(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(killer.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300,50);
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    Enemy1.display();
    Enemy1.score();
    log1.display();

    box3.display();
    box4.display();
    Enemy2.display();
    Enemy2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    killer.display();
    platform.display();
    slingshot.display();    
}

function mouseDragged(){
        Matter.Body.setPosition(killer.body, {x: mouseX , y: mouseY});
    }



function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && killer.body.speed < 1  ){
        
        killer.trajectory = [];
        Matter.Body.setPosition(killer.body,{x:200 , y: 50 });
        slingshot.attach(killer.body);
    }
    
}


async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=15){
        bg = "sprites/School.png";
    }
    else{
        bg = "sprites/house.jpg";
    }

    backgroundImg = loadImage(bg);
    //console.log(backgroundImg);
}
