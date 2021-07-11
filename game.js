function load_images(){

    
    enemy_image=new Image; //creating a Image object
    
    enemy_image.src="v1.png";
    
    
    player_img=new Image;
    player_img.src="circimg.png";
    
    
    
    gem_img=new Image;
    gem_img.src="vacc.png";
    
    
    
    
    
}


function init(){
    
    
    //get our canvas object from html
    canvas=document.getElementById("mycanvas");
    console.log(canvas);
    W=700;
    H=400;
    
    canvas.width=W;
    canvas.height=H;
    
    
    //create a context (pen)
    pen=canvas.getContext('2d');
    console.log(pen);
    
    game_over=false;
    
    
    e1={
        
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20,
    };
    
    e2={
        x:300,
        y:150,
        w:60,
        h:60,
        speed:30,
        
    };
    
    e3={
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40,
        
    };
    
    
    enemy=[e1,e2,e3];
    
    
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100,
    }
    
    
    gem={
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    }
    
    
  
    canvas.addEventListener('mousedown',function(){ //pressing the mouse
        console.log("Mouse pressed");
        player.moving=true; //changing the current state of player
    });
    
    
    //to stop the player moving
     canvas.addEventListener('mouseup',function(){ //releasing the mouse
        console.log("Mouse released");
        player.moving=false; //changing the current state of player
    });
    

    
    
    
}

function isOverlap(rect1,rect2){
    
    if(rect1.x<rect2.x+rect2.w &&
      rect1.x+rect1.w>rect2.x &&
      rect1.y<rect2.y+rect2.w &&
      rect1.y+rect1.w>rect2.w){
        return true;
    }
    
    return false;
    
    
}

function draw(){
    
     //clear the canvas area for old frame
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle="red";
    
    
    //draw the player
    pen.drawImage(player_img,player.x,player.y+50,player.h+20,player.w+20);
    
    
    
    
    //draw the vaccine
    pen.drawImage(gem_img,gem.x,gem.y+50,gem.h+30,gem.w+30);
    
    
   
    
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
        
        
    }
    
    //display the score
    pen.fillStyle="black";
    pen.font="30px Arial";
    pen.fillText("Score "+player.health,10,40);
    
    
    
}


function update(){
    
    //if the state of player is moving
    if(player.moving==true){
        player.x+=player.speed;
        player.health+=20;
    }
    
    
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(player,enemy[i])){
            player.health-=50;
            
            if(player.health<=0){
                console.log(player.health);
                game_over=true;
                alert("Game Over"+ player.health);
            }
        }
    }
    
    //check for collision b/w player and gem
    if(isOverlap(player,gem)){
        console.log("You won");
        alert("Congratulations! You have been successfully vaccinated against Corona.");
        game_over=true;
        return;
        
    }
  
    for(let i=0;i<enemy.length;i++){
        enemy[i].y+=enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
            enemy[i].speed*=-1;
        }
    }
    
}




function gameloop(){
    
    if(game_over==true){
        clearInterval(f);
    }
    
    draw();
    update();
    
    console.log("In gameloop");
    
    
}


load_images();
init();
var f=setInterval(gameloop,100);





