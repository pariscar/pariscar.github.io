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
      "LEFT": 37,
      "UP": 38,
      "RIGHT": 39,
      "DOWN": 40,
      "W": 87,
      "A": 65,
      "S": 83,
      "D": 68
  }
  var positionX = 0;
  var speedX = 0;
  var positionY = 0;
  var speedY = 0;
  //CHALLENGE VARIABLES
  var gameItem = $('#gameItem');
  var gameItem2 = $('#gameItem2');
  var board = $('#board');
  var boardWidth = board.width();
  var boardHeight = board.height();
  var itemWidth = gameItem.width();
  var itemHeight = gameItem.height();
  var boardXBound = boardWidth - itemWidth;
  var boardYBound = boardHeight - itemHeight;
  //SECOND GAME ITEM VARIABLES
  var positionX2 = 390;
  var speedX2 = 0;
  var positionY2 = 390;
  var speedY2 = 0;
  
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
    repositionGameItem();
    redrawGameItem();
    reset();
    tag();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {   // moves gameItem to the left, right, up, or down when corresponding key is pressed
    if (event.which === KEY.LEFT) {
        speedX = -5;    
    } else if (event.which === KEY.UP) {
        speedY = -5;    
    } else if (event.which === KEY.RIGHT) {
        speedX = 5;     
    } else if (event.which === KEY.DOWN) {
        speedY = 5;  
    }

    if (event.which === KEY.W) {
        speedY2 = -5;
    } else if (event.which === KEY.A) {
        speedX2 = -5;
    } else if (event.which === KEY.S) {
        speedY2 = 5;
    } else if (event.which === KEY.D) {
        speedX2 = 5;
    }
  }

  function handleKeyUp(event) {     // stops gameItem when key is released
      if (event) {
          speedX = 0;   
          speedY = 0;
          speedX2 = 0;
          speedY2 = 0;
      }
  }

  function reset() {      // prevents gameItem from leaving the bounds of the board
      if (positionX >= boardXBound) {  
          positionX = boardXBound;
      } else if (positionX <= 0) {
          positionX = 0;
      }

      if (positionX2 >= boardXBound) {  
          positionX2 = boardXBound;
      } else if (positionX2 < 0) {
          positionX2 = 0;
      }

      if (positionY >= boardYBound) {
          positionY = boardYBound;
      } else if (positionY < 0) {
          positionY = 0;
      }

      if (positionY2 >= boardYBound) {
          positionY2 = boardYBound;
      } else if (positionY2 < 0) {
          positionY2 = 0;
      }
  }

  function tag() {          // runs the function changeColor when the game items collide
    if (positionX + positionY === positionX2 + positionY2) {
        changeColor();
      }
    }
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {   // moves gameItem upward, downward, to the left, and to the right
      positionX += speedX;
      positionY += speedY;

      positionX2 += speedX2;
      positionY2 += speedY2;
  }

  function redrawGameItem() {
      $("#gameItem").css("left", positionX);
      $("#gameItem").css("top", positionY);

      $("#gameItem2").css("left", positionX2);
      $("#gameItem2").css("top", positionY2);
  }

  function changeColor() {
      var boxColor = "red";
      var boxColor2 = "lightBlue";

      // $('#gameItem2').css("background-color", temp);
      var temp = boxColor;
      boxColor = boxColor2;
      boxColor2 = temp;
      $('#gameItem').css("background-color", temp);
      $('#gameItem2').css("background-color", temp);
      
      positionX = 0;
      positionX2 = 390;
      positionY = 0;
      positionY2 = 390;
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
