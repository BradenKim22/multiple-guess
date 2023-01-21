// Container Elements
var beginCont = document.querySelector(".begin");
var questCont = document.querySelector(".container");
var endCont = document.querySelector(".grade");

// Container Show the one with display:"
beginCont.setAttribute("style", "display:");
questCont.setAttribute("style", "display: none");
endCont.setAttribute("style", "display: none");

// Other Variable grabbing IDs (buttons, choices, questions, time, score, results)
// First Container
var startButton = document.getElementById("start");
// Top of Questions Container
var timeEl = document.getElementById("timer"); // constant update timer on the second box
var scoreEl = document.getElementById("score"); // constant update score on the second box
// Center of Questions Container
var questionsEl = document.getElementById("question"); // Array? Yes
var optionsEl = document.getElementById("options"); // Create elements "button" then append to this variable. Make one correct and the rest false.
// Bottom of Questoins Container
var resultEl = document.getElementById("result"); // Correct text or incorrect text.
// Last Container
var endTitle = document.getElementById("end-title"); // Display regular title until it changes at the end showing High Score
var endScore = document.getElementById("end-score"); // Display end score on the third box make it change later to Initials and Score. while showing high score.
var initials = document.getElementById("initials");
var saveButton = document.getElementById("save");
var resetButton = document.getElementById("reset");
// Display reset to none until you switch the Buttons.
resetButton.setAttribute("style", "display: none");

// Which Question and their answers will appear..
var current = 0;

// Start Time
var time = 60;
// Time Shows on 60.
timeEl.innerHTML = "Time<br/>" + time;

// Score Board
var score = 0;
// Score printed to webpage
scoreEl.innerHTML = "Score<br/>" + score;

// These are the Questions and Options! the last value in the array of each object corresponds with the array length. (the number = the correct answer.)
var questionOpt = {
    "Javascript is to function as CSS is to ___":
    ['Structure', 'Style', 'Cast Style Sheets', 'HTML',1],
    
    "In the modern world what is HTML used for?":
    ['Structure', 'Cascading Style Sheets', 'Functions', 'Formulas',0],
    
    "In Javascript 'document.getElementById' is searching what in which file?":
    ['root ID, CSS', 'Variable ID in Javascript', 'Function ID in JQuery', 'ID in HTML',3],

    "Who is the best student in Class?":
    ['Braden', 'Kyle', 'I Am!', 'Non Existent',2],
        
    "As we have done in the class many times, Where did Javascript go to get Identity?":
    ['Hext Typer Markup Language', 'Cascading Style Sheets', 'JQuery API', 'I dont know.. but it could be the first one..',3],
};

// Global Variable for userInitials and Score.
var userInitials = "";
var userScore = "";

// LocalStorage High Score and Initials
var highScore = localStorage.getItem("highscore");
var highInitials = localStorage.getItem("highinitials");

// For reference and it's correct
var consoleAnswer = questionOpt[Object.keys(questionOpt)[current]][4];
console.log('This is the Object aka Question and One: ' + Object.keys(questionOpt)[current]);
console.log('This is the answer to question number One: ' + questionOpt[Object.keys(questionOpt)[current]][consoleAnswer]);


// Write a function for event listner click start
function startQuiz(event) {
    // Prevent the displays to show the first box and not the last two flex boxes (Questions and Grade)
    event.preventDefault();
    // Hide the Begin box
    beginCont.setAttribute("style", "display: none");
    // Show the Questions box
    questCont.setAttribute("style", "display:");

    // Start Timer
    var timeInt = setInterval(function() {
        time--;
        // Time counts down but if alone will not show original starting seconds example 60 seconds see's it from 59.
        timeEl.innerHTML = "Time<br/>" + time;

        if (time === 0) {
            clearInterval(timeInt);
            gameOver();
        };
    }, 1000);
};


// Display question function through each question. and print it to html
function displayQues(x) {
    // Current Question appears.
    var question = Object.keys(questionOpt)[x];
    questionsEl.innerHTML = "";
    resultEl.innerHTML = "🤔";
    questionsEl.innerHTML = question;
    // Center the text in the middle maybe create bigger margins around the text.

    // Calls display options function
    displayOpt(current);
};


// Display Options
function displayOpt(x) {
    // Chooses the questions objects array aka options answers..
    var options = questionOpt[Object.keys(questionOpt)[x]];
    optionsEl.innerHTML = "";
    // Creates every option in that object aka question to a button.
    for (let i = 0; i < options.length - 1; i++) {
        var optButton = document.createElement('button');
        allOptions = document.createTextNode(options[i]);

        // Reset the color of the button
        optButton.style.backgroundColor = "";

        // Prints out the text onto the button
        optButton.appendChild(allOptions);

        // checks for the correct answer. or wrong.
        optButton.addEventListener("click", gradeAns(i,options,optButton));

        // Prints the button on to the options area of HTML
        optionsEl.appendChild(optButton);
    } ;
};


// Show correct or incorrect..
function gradeAns(y,z,o) {

    return function () {
        // Selected Answer vs Correct Answer and Variables
        var answer = z[z.length - 1];
        
        if (y === answer) {
            // Which one is correct gets 10 score
            score += 10;
            scoreEl.innerHTML = "Score<br/>" + score;
            // Button turns Green
            o.style.backgroundColor = "green";
            // Result at the bottom Correct
            resultEl.innerHTML = "Correct";
            setTimeout(nextQues,250);
        } else {
            // which one is wrong get -time.
            time -= 10;
            // Button turns Red
            o.style.backgroundColor = "red";
            // Result at the bottom Incorrect
            resultEl.innerHTML = "Incorrect";
            setTimeout(nextQues,250);
        }
    };
};


// Display next question and options and if the questions are all done. end the game.
function nextQues() {
    // Move on to the next question by adding 1 to Current but not going over the object.keys(questionOpt).length.
    if (current < 4) {
        current++;
        // On to the next question and options.
        displayQues(current);
    } else {
        // Game Over because there are no more questions
        gameOver();
    }
};


// End the game show score and last box.
function gameOver() {
    // Hide the Questions box
    questCont.setAttribute("style", "display: none");
    // Show the Grade box end container
    endCont.setAttribute("style", "display: ");

    // Display Score
    endScore.innerHTML = score;

};


// Save quiz score and the initials
function saveQuiz(event) {
    event.preventDefault();

    // User Initials
    userInitials = initials.value;
    console.log(userInitials);

    // User Score
    userScore = score;
    console.log(userScore);

    // Save Initials and Score to localstorage
    // IF the initials are entered
    if (!userInitials) {
        alert("Please Enter Initials");
                                                                        // This is very interesting the no ()
                                                                        // for a function will not give me an 
                                                                        // error about the prevent default because 
                                                                        // the default is coming from withing the 
                                                                        // function.. but I want to learn more 
                                                                        // about () after a function...
        saveQuiz;
    // IF the score is greater than the localstorage
    } else if (userScore >= highScore) {
        // Save score and initials to local storage.
        localScore();
    } else {
        // Disregard new score and initials and restart the quiz as it would be..
        showHighscore();
    };
};


// I might have to write a new function for the local storage to not prevent default of local storage(in save quiz)? Make var out of function
function localScore() {
    // Save score and initials to local storage.
    localStorage.setItem("highscore", userScore);
    localStorage.setItem("highinitials", userInitials);
    // Update variables highscore and highinitials
    highInitials = localStorage.getItem("highinitials");
    highScore = localStorage.getItem("highscore");
    showHighscore();
};


// Show last visual on the third box. Changes to title "High Score" shows Initials and Score, Button from save to reset.
function showHighscore() {
    // Hide the Input text box
    initials.setAttribute("style", "display: none");
    // Hide save button
    saveButton.setAttribute("style", "display: none");
    // Show Reset Button
    resetButton.setAttribute("style", "display:");
    // Show High Score
    endTitle.innerHTML = "High Score";
    // Show Initials and Score of High Score
    endScore.innerHTML = highInitials + "     " + highScore;

    // Event Listner for Retake
    resetButton.addEventListener("click", resetQuiz, startQuiz);
};



// When you retake the quiz reset everything and the colors of the button and start at first questions instead of instructions.
// This is not working... But everything works..
function resetQuiz() {
    current = 0;
    time = 160;
    score = 0;
    startQuiz();
};



// Write an Event listner for Start.
startButton.addEventListener("click", startQuiz, displayQues(current));
// Event Listner for Save
saveButton.addEventListener("click", saveQuiz);



// Event Listner for Retake
// This is not working... But everything works..
resetButton.addEventListener("click", resetQuiz);