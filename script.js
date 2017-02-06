// initiating game
  var gameLive=true;
  //game initial level
  var level=1;
  // declare variables at first
  /*---set size of game area for easy change purpose---*/
  var gameW=640;
  var gameH=360;
  // define characters
  var enemies=[
    /*enemy 1*/
    {
      x:90,
      y:10,
      speedY:1,
      width:40,
      height:40
    },
    /*enemy 2*/
    {
      x:150,
      y:10,
      speedY:2,
      width:40,
      height:40
    },
    /*enemy 3*/
    {
      x:250,
      y:10,
      speedY:3,
      width:40,
      height:40
    },
    /*enemy 4*/
    {
      x:350,
      y:10,
      speedY:4,
      width:40,
      height:40
    },
    /*enemy 5*/
    {
      x:450,
      y:10,
      speedY:5,
      width:40,
      height:40
    },
    /*enemy 6*/
    {
      x:540,
      y:10,
      speedY:6,
      width:40,
      height:40
    }
  ];/*---end of var enemies---*/
  //define players
  var player={
    x:10,
    y:160,
    speedX:3,
    width:40,
    height:40,
    isMoving:false
  };/*---end of player---*/
  //setting the destination
  var goal={
    x:600,
    y:160,
    width:40,
    height:40
  }
  //inserting images for characters
  var doodle={};
  var loadDoodle=function(){
    //adding images for player
    doodle.player=new Image();
    doodle.player.src="images/hero.png";
    //adding image for background
    doodle.background=new Image();
    doodle.background.src="images/floor.png";
    //adding image for enemies
    doodle.enemies=new Image();
    doodle.enemies.src="images/enemy.png";
    //adding image for destination
    doodle.goal=new Image();
    doodle.goal.src="images/chest.png";
  };

  //grab the canvas and context
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //event listeners to move player
  var movePlayer=function(){
    player.isMoving=true;
  };
  var stopPlayer=function(){
    player.isMoving=false;
  };
  canvas.addEventListener("mousedown",movePlayer);
  canvas.addEventListener("mouseup",stopPlayer);
  //for touch screen
  canvas.addEventListener("touchstart",movePlayer);
  canvas.addEventListener("touchend",stopPlayer);

  //check collision
  var checkCollision=function(rect1,rect2){
    //compare positions with two closed rectangle: collision happened when distances between two rectanges less than max size of the two rectangles
    var closeOnW=Math.abs(rect1.x-rect2.x)<=Math.max(rect1.width,rect2.width);
    var closeOnH=Math.abs(rect1.y-rect2.y)<=Math.max(rect1.height,rect2.height);
    return closeOnW && closeOnH;
  };

  // //create a fucntion so that to update each enemy's position
  var positionUpdate=function(){
    //update players
    if(player.isMoving){
      player.x+=player.speedX;
    };

    //update enemies positions
    /*below is a forEach loop: element is the properties for each enemy and index is the order of enemy array.*/
    enemies.forEach(function(element,index){
      //enemies movement
      element.y+=element.speedY;
      //check borders so that to have enemies bounce when hit edge
      if(element.y<=10){
        element.y=10;
        element.speedY=-element.speedY;
      }/*---end of if element.y<=10---*/
      else if (element.y>=gameH-50){
        element.y=gameH-50;
        element.speedY=-element.speedY;
      }/*---end of else if---*/

      //check for collision with player
      /*element is a attribute of the function that will be called in forEach loop. So should not be outside of the repeated function (and the loop) */
      if(checkCollision(player,element)){
        //stop the game
        gameLive=false;
        alert("GAME OVER! Give another try!");
        window.location="";/*---reload the window---*/
      };/*---end of checkCollision---*/
    });/*---end of forEach loop---*/

    //check if won the game
    if(checkCollision(player,goal)){
      //stop the game
      gameLive=false;
      alert("Completed! Try next level!");
      window.location="";/*---reload the window---*/

      //multiple levels settings
      level++;
      // layers back to initial positions
      player.x=10;
      player.y=160;
      // enemies move faster at eaching level
      enemies.forEach(function(element,index){
        player.speedX++;
        if(element.speedY>0){
          element.speedY++;
        }
        else{
          element.speedY--;
        }/*---end of if statement---*/
      })/*---end of enemies move faster loop---*/
    }/*---end of check winning---*/
  };/*---end of update function---*/

  //create a function to draw a enemy
  var draw = function() {
    ctx.clearRect(0,0,gameW,gameH);/*clean canvas everytime it moves*/

    //draw background
    ctx.drawImage(doodle.background,0,0);

    //draw player
    // ctx.fillStyle="#00ff00";
    // ctx.fillRect(player.x,player.y,player.width,player.height);
    ctx.drawImage(doodle.player,player.x,player.y);

    //draw each enemy
    // ctx.fillStyle="#3333ff";
    /*below is a forEach loop: element is the properties for each enemy and index is the order of enemy array.*/
    enemies.forEach(function(element,index){
      // ctx.fillRect(element.x,element.y,element.width,element.height);
      ctx.drawImage(doodle.enemies,element.x,element.y);
    });/*---end of forEach loop---*/

    //draw destination
    // ctx.fillStyle="rgb(128,128,0)";
    // ctx.fillRect(goal.x,goal.y,goal.width,goal.height);
    ctx.drawImage(doodle.goal,goal.x, goal.y);
  };/*---end of draw function---*/

  //gets executed multiple times per second so to create animation
  var movement = function() {
    positionUpdate();
    draw();
    //collision detection
    if (gameLive){
      window.requestAnimationFrame(movement);
    };
  };/*---end of movement function---*/

  loadDoodle();/*---load images---*/
  movement();/*---initiating the movement for all ---*/
