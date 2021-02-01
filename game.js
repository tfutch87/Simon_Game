
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var playerName = prompt(" what is your name? ").toUpperCase(); 
var highScore = 0;



//to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// start of the game
$(document).on("keypress", function (e) {


    if (!started){ 
        $("#game").show();
        $("form").hide();
        $("#level-title").text(playerName + ", Game On");

   nextSequence();
  // sets the started game to true prevents the function from running again
   started = true;
}

});


function gameStart(){

    if (!started){ 
        $("#game").show();
        $("form").hide();
        $("#level-title").text(playerName + ", Game On");

   nextSequence();
  // sets the started game to true prevents the function from running again
   started = true;
}

}



//  Used to display the full pattern to the player
function displayPatter(index, array) {
 
    if(index >= array.length)
      return;
   
    $("#" + gamePattern[index]).fadeOut(150).fadeIn(150);
    playsound(gamePattern[index]);
    index ++;
    setTimeout(displayPatter.bind({}, index, array), 500);
};



// detect when any of the buttons are clicked and trigger a handler function.
$(".btn1").click(function () {

    // new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    // color added to user clicked array userChosenColour[]
     userClickedPattern.push(userChosenColour);

    // using Javascript to play the sound for the button colour selected
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
    
    
    animatePress(userChosenColour);

    // gets the value of the last item in array
    var index = userClickedPattern.length-1;
    
    
    // function to check the answer passing in the array index number
    checkAnswer(index);
      

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playsound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Sorry," + playerName +  " Game Over, Press Any Key to Restart");

      $("#game").hide();

      
      $("#contact").replaceWith('<form action="mailto:tyren@hico.solutions" method="post" enctype="text/plain"> <label> Game Patten </label><input id="myField" value="' + gamePattern.toString() + '" /><label> Your Pattern </label><input id="myField" value="' + userClickedPattern.toString() + '" /> <br><br> <label> To recieve your results enter your email address </label> <input type="email" value="" /> <input type="submit"> <br> </form>');


      $('#myField').value = gamePattern.toString();
      

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}


function nextSequence() {

    var high_score = highScore;
    
    // nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = []; 

  console.log("level" + level);
  console.log("level" + highScore);


        $("#level").text("level: " + level);

    // generates random number from 1-4
    var randomNumber = Math.floor(Math.random() * 4);

    // picks random color in array of colors 
    var randomChosenColour = buttonColours[randomNumber];

    // adds random color to game patteren[]
    gamePattern.push(randomChosenColour);

    setTimeout(function() {
        displayPatter(0, gamePattern);
      }, 500);
    // animates the colors when selected
    // $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // playsound(randomChosenColour);

    console.log("game patten " + gamePattern);


      // increase the level 
    level++;
   

    highScore = level;

    if (level > high_score){

        $("#score").text("Score: " + highScore);
    }

    console.log(highScore);
    
}

// playing the sounds, using the name of the button that was clicked
function playsound (name){

        // using Javascript to play the sound for the button colour selected
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();

}

// animate on button press
function animatePress(currentColor){

// quries the current color ID and adds the button class to the button
        $("#" + currentColor).addClass("pressed");

        // removes the class after .1 sec
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
          }, 100);
}

/* Open the sidenav */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    $("#menuButton").fadeOut().fadeIn();
  }
  
  /* Close/hide the sidenav */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
   
  }

  function startOver(){

    level = 0;    
    gamePattern = [];
    started = false;
    


  }
