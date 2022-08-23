// Organizing all HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var fineScoreEl = document.getElementById("finalScore");
var gamedoneSection = document.getElementById("gamedone");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizSection = document.getElementById("statingpage")
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreSection = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endgameBtns");
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
    ChoiceD: "HTML",
    correctAnswer: "c"},
    {
    question: "Which HTML attribute would you use to reference an external JavaScript file?",
    choiceA: "index",
    choiceB: "src",
    choiceC: "class",
    ChoiceD: "src",
    correctAnswer: "d"},
    {
    question: "What part of web application do users interact with?",
    choiceA: "Middle Tier",
    choiceB: "Front End",
    choiceC: "Back End",
    ChoiceD: "Full Stack",
    correctAnswer: "b"},
    {
    question: "What symbol is used to represent the/and operator in JavaScript?",
    choiceA: "//",
    choiceB: "&&",
    choiceC: "||",
    ChoiceD: "==",
    correctAnswer: "b"},
    {
    question: "In which HTML element do we put JavaScript?",
    choiceA: "<script>",
    choiceB: "<javascript>",
    choiceC: "<div>",
    ChoiceD: "<js>",
    correctAnswer: "a"},
    {
    question: "What basic ways cn people become aware of your website?",
    choiceA: "Url is shared by somebody",
    choiceB: "The link is attached on another website",
    choiceC: "Your website is listed in a search engine",
    ChoiceD: "All of the above",
    correctAnswer: "d"},
    {
    question: "Which of the following is a local operator in JavaScript?",
    choiceA: "/",
    choiceB: "|",
    choiceC: "&&",
    ChoiceD: "%",
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
    gamedoneSection.style.display = "none";
    if (currentQuestionIndex === finalQuestionindex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "p" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//Start quiz function to start the timer, hide the buttons and display the first question on the quiz.
