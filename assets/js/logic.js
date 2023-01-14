const startScreen = document.querySelector('#start-screen');
const questions = document.querySelector('#questions');
const endScreen = document.querySelector('#end-screen');
const startBtn = document.querySelector('#start');
const submitBtn = document.querySelector('#submit');
const timeIndicator = document.querySelector('#time');
const incorrectAns = new Audio('/assets/sfx/incorrect.wav');
const questionTitle = document.querySelector('#question-title');
const choices = document.querySelector('#choices');
const correctAns = new Audio('/assets/sfx/correct.wav');
const initials = document.querySelector('#initials');
const finalScore = document.querySelector('#final-score');
const feedBack = document.querySelector('#feedback');
var intervalID = null;
var timeOutID = null;
var timeRemaining = 0;
var questionIndex = 0;
//object format for saving player score
var scoreSave = {
    inital: '',
    score: 0
}

//function to set base state
function init() {
    //shuffle questons
    questionShuff = shuffle(questionsArr);
    //add 10 seconds per question
    timeRemaining = qArrLength * 10;
    //set time indicator
    timeIndicator.textContent = timeRemaining;
    //show questions
    startScreen.classList.add('hide');
    questions.classList.remove('hide');
}

//function to start the timer
function timer() {
    intervalID = setInterval(function () {
        //check if time remaining and count down the timer
        if (timeRemaining > 0) {
            timeRemaining--;
            timeIndicator.textContent = timeRemaining;
        } else {
            //if not end the game
            clearInterval(intervalID);
            endGame();
        }

    }, 1000);

}

//function to check answer
function checkAns(test) {
    let check = questionShuff[questionIndex].correct;
    if (test == check.toString()) {
        correctAns.play();
        return true;
    } else {
        incorrectAns.play();
        return false;
    }
}

//function to show feed back
function showFeedback(ans) {
    if (timeOutID != null) {
        clearTimeout(timeOutID);
        timeOutID = null;
        feedBack.classList.add('hide');
    }
    //show feedback area
    feedBack.classList.remove('hide');
    //set timout to hide feedback area
    timeOutID = setTimeout(function () {
        feedBack.classList.add('hide');
        timeOutID = null;
    }, 1500);
    //display if correct or wrong guess
    feedBack.innerHTML  = ans ? "Correct!" : "Wrong!";

}

//function for wrong answer
function reduceTime() {
    //if there are seconds to remove
    if (timeRemaining > 10) {
        timeRemaining -= 10;
        timeIndicator.textContent = timeRemaining;
        //if not set timer to 1 second so the game ends
    } else {
        timeRemaining = 0;
        timeIndicator.textContent = timeRemaining;
        clearInterval(intervalID);
        endGame();
    }

}

//function to move run Quiz
function runQuiz() {
    //if more questions available
    if (questionIndex + 1 < qArrLength && timeRemaining > 0) {
        questionIndex++;
        showQuestion();
    } else {
        //if not end game
        if (timeRemaining > 0) {
            clearInterval(intervalID);
        }
        endGame();
    }
}

//function to end the game
function endGame() {
    questions.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.innerHTML = timeRemaining;

}

//function to save score to localStorage
function rememberScores() {
    //save inital and score
    scoreSave.inital = initials.value.toUpperCase();
    scoreSave.score = timeRemaining;
    let toStorage = [];
    //check if old scores in local storage
    let data = JSON.parse(localStorage.getItem('highScores'));
    if (data != null) {
        data.forEach(function (item) {
            toStorage.push(item);
        });
    }
    //add new score
    toStorage.push(scoreSave);
    //save score
    localStorage.setItem('highScores', JSON.stringify(toStorage));
    //redirect player to show highscores
    window.location.replace('highscores.html');

}

//function to handle button clicks
function buttonHandler(button) {
    //start quiz
    if (button.id == "start") {
        //initalise the game
        init();
        //setTimer
        timer();
        //start quiz
        showQuestion();
    }
    if (button.classList.contains('choice')) {
        ///check if correct answer
        let feedback = checkAns(button.dataset.test);
        if(!feedback) reduceTime();
        showFeedback(feedback);
        runQuiz();

    }
    //save score
    if (button.id == "submit") {
        rememberScores();
    }

}

//get wrapper that will contain all buttons
const wrapper = document.querySelector('.wrapper');
//and add event listener
wrapper.addEventListener('click', function (event) {
    const button = event.target;
    const isButton = button.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    } else {
        buttonHandler(button);
    }
});