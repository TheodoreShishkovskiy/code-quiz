// Organizing all HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverSection = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizSection = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreSection = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz Question object (Code Quiz)
var quizQuestions = [ {
    question: "What is most commonly used to add styling to web pages",
    choiceA: "Python",
    choiceB: "React.js",
    choiceC: "CSS",
    choiceD: "HTML",
    correctAnswer: "c"},
    {
    question: "Which HTML attribute would you use to reference an external JavaScript file?",
    choiceA: "index",
    choiceB: "src",
    choiceC: "class",
    choiceD: "src",
    correctAnswer: "d"},
    {
    question: "What part of web application do users interact with?",
    choiceA: "Middle Tier",
    choiceB: "Front End",
    choiceC: "Back End",
    choiceD: "Full Stack",
    correctAnswer: "b"},
    {
    question: "What symbol is used to represent the/and operator in JavaScript?",
    choiceA: "//",
    choiceB: "&&",
    choiceC: "||",
    choiceD: "==",
    correctAnswer: "b"},
    {
    question: "In which HTML element do we put JavaScript?",
    choiceA: "script",
    choiceB: "javascript",
    choiceC: "div",
    choiceD: "js",
    correctAnswer: "a"},
    {
    question: "What basic ways cn people become aware of your website?",
    choiceA: "Url is shared by somebody",
    choiceB: "The link is attached on another website",
    choiceC: "Your website is listed in a search engine",
    choiceD: "All of the above",
    correctAnswer: "d"},
    {
    question: "Which of the following is a local operator in JavaScript?",
    choiceA: "/",
    choiceB: "|",
    choiceC: "&&",
    choiceD: "%",
    correctAnswer: "c"},

];
//Global Variables needed
var finalQuestionindex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;

//Function to cycle through the object array with the quiz questions in order to generate the Q and A
function generateQuizQuestion(){
    gameoverSection.style.display = "none";
    if (currentQuestionIndex === finalQuestionindex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//Start quiz function to start the timer, hide the buttons and display the first question on the quiz.
function startQuiz(){
    gameoverSection.style.display = "none";
    startQuizSection.style.display = "none";
    generateQuizQuestion();

// Timer for quiz
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}

function showScore(){
    quizBody.style.display = "none"
    gameoverSection.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You score is " + score + "out of " + quizQuestions.length + " correct!!!";
}
// Function for End Screen when time is up or quiz is done
//This function allso saves user name and score into an array into the local storage.
submitScoreBtn.addEventListener("click", function highscore(){

    if (highscoreInputName.value === "") {
        alert("Initials must be Entered");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverSection.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreSection.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

//This function is used to clear the list and generate new highscore list
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the highscore without the rest of the page
function showHighscore(){
    startQuizSection.style.display = "none"
    gameoverSection.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreSection.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears local storage of all scores as well as text
function clearScore (){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This functions sets all variables to default values and allows replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverSection.style.display = "none";
    startQuizSection.style.display = "flex";
    timeLeft = 100;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks which responose is correct or incorrect
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if(answer === correct && currentQuestionIndex !== finalQuestionindex){
        score++;
        alert("That is the Correct Answer");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionindex){
        alert("That is the Wrong Answer");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// This button is what starts the Quiz
startQuizButton.addEventListener("click", startQuiz);