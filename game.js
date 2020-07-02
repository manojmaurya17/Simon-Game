var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var userClickedPettern = []
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPettern[currentLevel]){
        console.log("succes");
        if (userClickedPettern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPettern = [];
    started = false;
}


function nextSequence(){
    userClickedPettern = []
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("Level "+ level);
    playSound(randomChosenColor);
}


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPettern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPettern.length-1);
});


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
