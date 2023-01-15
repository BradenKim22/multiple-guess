var startButton = document.getElementById("start");
var timeEl = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var questionsEl = document.getElementById("question"); // Array??? pushed with answers?
var optionsEl = document.getElementById("options"); // Create elements "button" then append to this variable. Make one correct and the rest false.
var resultEl = document.getElementById("result"); // Correct text or incorrect text.

var correctEl; // Array with the correct answers? Maybe not..

var time = 60; // i - seconds later
var score = 0; // i + points later

timeEl.innerHTML = "Time<br/>" + time; // style? Center text horizontaly within itself
scoreEl.innerHTML = "Score<br/>" + score; // style? Center text horizontaly within itself


// Do I append innerHTML? or do I change the visibility of the HTML.

