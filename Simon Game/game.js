var btnColours = ["red", "blue", "green", "yellow"];
var userClicked = [];
var gamePattern = [];

var started = false;
var level = 0;

function nextSequence() {
    userClicked = [];
    $("#level-title").text("Level " + level);
    level ++;

    var randNum = Math.random();
    randNum = randNum * 4;
    randNum = Math.floor(randNum);
    var randomChosenColour = btnColours[randNum];
    
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    playSound(randomChosenColour);
}

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    
    userClicked.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClicked.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;   
    }
});

function checkAnswer(currentLevel) {
    if (userClicked[currentLevel] === gamePattern[currentLevel]) {
        if (userClicked.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
        } else {
            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout (function() {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game over. Press any key to restart");

            startOver();
    }
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}