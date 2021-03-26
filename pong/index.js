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
  
  var rightPaddle = properties('#rightPaddle', 420, 180, 0, 0);
  var leftPaddle = properties('#leftPaddle', 0, 180, 0, 0);
  var ball = properties('#gameItem', 200, 200, 2, 3);

  var board = $('board');
  var boardWidth = board.width();
  var boardHeight = board.height();
  var paddleHeight = leftPaddle.height;
  var paddleWidth = leftPaddle.width;
  var boardXBound = boardWidth - ball.width;
  var boardYBound2 = boardHeight - ball.height;
  var boardYBound = boardHeight - paddleHeight;
  var points1 = 0;
  var points2 = 0;
  // var boardXBound = ;
  // var boardYBound = ;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

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
    reset();
    gamePoint();
    doCollide();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
        rightPaddle.speedY = 5;
        console.log('works');
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

  function properties($id, x, y, speedX, speedY) {
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
    rightPaddle.y += rightPaddle.speedY;

    leftPaddle.x += leftPaddle.speedX;
    leftPaddle.y += leftPaddle.speedY;
  }

  function repositionBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
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

  function reset() {                  // replace magic numbers with board bounds; possibly doCollide function
      if (rightPaddle.y < 0) {
          rightPaddle.y = 0;
      } else if (rightPaddle.y > 360) {
          rightPaddle.y = 360;
      }

      if (leftPaddle.y < 0) {
          leftPaddle.y = 0;
      } else if (leftPaddle.y > 360) {
          leftPaddle.y = 360;
      }

      if (ball.y >= 410) {
          ball.speedY = -ball.speedY;
      } else if (ball.y < 0) {
          ball.speedY = -ball.speedY;
      }

      if (ball.x >= 410) {
          ball.speedX = -ball.speedX;
      } else if (ball.x < 0) {
          ball.speedX = -ball.speedX;
      }
  }
  //square1 --- ball,   square2 --- leftPaddle
 function doCollide(){
   if (ball.x < leftPaddle.rightX &&
       ball.rightX > leftPaddle.x &&
       ball.y < leftPaddle.bottomY &&
       ball.bottomY > leftPaddle.y){
          ball.speedX = -ball.speedX;
          ball.speedY = -ball.speedY;
    } else if (ball.x < rightPaddle.rightX &&
               ball.rightX > rightPaddle.x &&
               ball.y < rightPaddle.bottomY &&
               ball.bottomY > rightPaddle.y){
                   ball.speedX = -ball.speedX;
                   ball.speedY = -ball.speedY;
               }
 }

 /* (square1.leftX < square2.rightX &&
        square1.rightX > square2.leftX &&
        square1.topY < square2.bottomY &&
        square1.bottomY > square2.topY) */

 function gamePoint() {
   if (ball.x === 0) {
        points2++;
        //console.log(points2);
   } else if (ball.x === 410) {
        points1++;
        console.log(points1);          
      }
  }
  var $score = $("#score");
  $("<p>").appendTo($score).text("Player 1 score: " + points1).css('color', 'white');
  $("<p>").appendTo($score).text("Player 2 score: " + points2).css('color', 'white');

  /*       if (ballX <= leftPaddleXPos && ballY <= leftPaddleYPos) {
          points2 = points2 + 1;
          console.log(points2);
      } else if (ballX <= rightPaddleXPos && ballY <= rightPaddleYPos) {
          points1 = points1 + 1;
      }
 */

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
