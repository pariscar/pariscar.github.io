/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
      DOWN: 40,
      UP: 38,
      W: 87,
      S: 83
  }

  var leftPaddle = Properties('#leftPaddle', 5, 180, 0, 0);
  var rightPaddle = Properties('#rightPaddle', 418, 180, 0, 0); // id, x, y, speedX, speedY
  var ball = Properties('#gameItem', 200, 200, 4, 3);

  var leftScore = $('#leftScore');
  var rightScore = $('#rightScore');

  var board = $('#board');
  var boardWidth = board.width();
  var boardHeight = board.height();
  var boardXBound = boardWidth - ball.width;
  var boardYBound2 = boardHeight - ball.height;
  var boardYBound = boardHeight - leftPaddle.height;
  var pointsL = 0;
  var pointsR = 0;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  $("<p>").appendTo(leftScore).attr("id", "leftScore").text("Player 1: " + pointsL).css('color', 'black')
                                                                                   .css('font-family', 'OCR A Std, monospace');

  $("<p>").appendTo(rightScore).attr("id", "rightScore").text("Player 2: " + pointsR).css('color', 'black')
                                                                                     .css('font-family', 'OCR A Std, monospace');

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    repositionPaddles();
    repositionBall();
    redrawPaddles();
    redrawBall();
    resetPaddles();
    resetBall();

    if (doCollide(ball, leftPaddle)){
        ball.speedX = -ball.speedX;
    }

    if (doCollide(ball, rightPaddle)){
        ball.speedX = -ball.speedX;
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
        rightPaddle.speedY = 5;
    } else if (event.which === KEY.UP) {
        rightPaddle.speedY = -5;
    }

    if (event.which === KEY.W) {
        leftPaddle.speedY = -5;
    } else if (event.which === KEY.S) {
        leftPaddle.speedY = 5;
    }
  }

  function handleKeyUp(event) {
      if (event.which === KEY.DOWN) {
          rightPaddle.speedY = 0;
      } else if (event.which === KEY.UP) {
          rightPaddle.speedY = 0;
      }

      if (event.which === KEY.W) {
          leftPaddle.speedY = 0;
      } else if (event.which === KEY.S) {
          leftPaddle.speedY = 0;
      }
  }

  /* score board */

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function Properties($id, x, y, speedX, speedY) {
    var objTest = {};

    objTest.id = $id;
    objTest.x = x;
    objTest.y = y;
    objTest.speedX = speedX;
    objTest.speedY = speedY;
    objTest.width = $($id).width();
    objTest.height = $($id).height();
    objTest.rightX = objTest.x + objTest.width;
    objTest.bottomY = objTest.y + objTest.height;

    return objTest;
  }

  function repositionPaddles() {
    rightPaddle.x += rightPaddle.speedX;
    rightPaddle.rightX = rightPaddle.x + rightPaddle.width;
    rightPaddle.y += rightPaddle.speedY;
    rightPaddle.bottomY = rightPaddle.y + rightPaddle.height;

    leftPaddle.x += leftPaddle.speedX;
    leftPaddle.rightX = leftPaddle.x + leftPaddle.width;
    leftPaddle.y += leftPaddle.speedY;
    leftPaddle.bottomY = leftPaddle.y + leftPaddle.height;
  }

  function repositionBall() {
    ball.x += ball.speedX;
    ball.rightX = ball.x + ball.width;
    ball.y += ball.speedY;
    ball.bottomY = ball.y + ball.height;
  }

  function redrawPaddles() {
    $('#rightPaddle').css('left', rightPaddle.x);
    $('#rightPaddle').css('top', rightPaddle.y);

    $('#leftPaddle').css('left', leftPaddle.x);
    $('#leftPaddle').css('top', leftPaddle.y);
  }

  function redrawBall() {
    $('#gameItem').css('left', ball.x);
    $('#gameItem').css('top', ball.y);
  }

  function resetPaddles() {  
    if (leftPaddle.y < 0){
        leftPaddle.y = 0;
    } else if (leftPaddle.y > boardYBound) {
        leftPaddle.y = boardYBound;
    }

    if (rightPaddle.y < 0){
        rightPaddle.y = 0;
    } else if (rightPaddle.y > boardYBound) {
        rightPaddle.y = boardYBound;
    }
  }

  function resetBall() {
    if (ball.x < 0){
        ball.speedX = -ball.speedX;
        pointsR++;
        //ball.x = 200;
        //ball.y = 200;
        console.log(pointsR);
    } else if (ball.x > boardXBound) {
        ball.speedX = -ball.speedX;
        pointsL++;
        //ball.x = 200;
        //ball.y = 200;
        console.log(pointsL);
    }

    if (ball.y < 0) {
        ball.speedY = -ball.speedY;
    } else if (ball.y > boardYBound2) {
        ball.speedY = -ball.speedY;
    }
  }

  //showResult(pointsL);
  //showResult(pointsR);

  
 function doCollide(obj1, obj2){
   if (obj1.x < obj2.rightX &&
       obj1.rightX > obj2.x &&
       obj1.y < obj2.bottomY &&
       obj1.bottomY > obj2.y){
        return true;
    } else {
        return false;
    }
 }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
