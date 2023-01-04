var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false

var level = 0

$(document).keypress(function() {
  if (!started) {

    nextSequence();
    started = true;

  }
})

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}


function nextSequence() {

  $("h2").remove()

  userClickedPattern = []

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)

  playSound(randomChosenColour)

  animatePress(randomChosenColour)
}

$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)

  playSound(userChosenColour)

  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.length - 1)

})

//animation
function animatePress(currentColour) {

  $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


//checking the answer
function checkAnswer(currentLevel) {

  //if the latest input is right
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    var sound = new Audio("sounds/wrong.mp3")
    sound.play()

    $("body").addClass("game-over")

    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);

    $("h1").text("Game Over, Press any key to Restart!")
    $("h1").after("<h2>Your Level is </h2>")
    $("h2").text("Your level is " + level)

    startover()
  }
}

//reseting all the values
function startover(){
  level = 0
  gamePattern = []
  userClickedPattern = []
  started = false
  randomChosenColour = []
  userChosenColour = []
}
