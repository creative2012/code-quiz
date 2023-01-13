const startScreen = document.querySelector('#start-screen');
const questions = document.querySelector('#questions');
const endScreen = document.querySelector('#end-screen');
const startBtn = document.querySelector('#start');
const submitBtn = document.querySelector('#submit');
const questionTitle = document.querySelector('#question-title');
const choices = document.querySelector('#choices');
const timeIndicator = document.querySelector('#time');
const incorrectAns = new Audio('/assets/sfx/incorrect.wav');
const correctAns = new Audio('/assets/sfx/correct.wav');
const initials = document.querySelector('#initials');
const finalScore = document.querySelector('#final-score');
const feedBack = document.querySelector('#feedback');
//randomiseQuestions;
const questionShuff = shuffle(questionsArr);
var intervalID = null;
var timeOutID = null;
var timeRemaining = 0;
var questionIndex = 0;
//object format for saving player score
var scoreSave = {
    inital: '',
    score: 0
}

//function to shuffle questions
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While remaining items
    while (currentIndex != 0) {
        // Pick a remaining item.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current item.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

//function to set base state
function init() {
    startScreen.classList.add('hide');
    questions.classList.remove('hide');
    //add 15 seconds per question
    timeRemaining = qArrLength * 10;
    timeIndicator.textContent = timeRemaining;
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

//function to run the quiz
function runQuiz() {

    choices.innerHTML = '';
    questionTitle.innerHTML = questionShuff[questionIndex].question;
    let qChoices = questionShuff[questionIndex].choices;
    let choiceLetters = ['A. ', 'B. ', 'C. ', 'D. '];

    for (var i = 0; i < 4; i++) {
        //create button
        let btn = document.createElement('button');
        //set the text and class
        btn.innerHTML = choiceLetters[i] + qChoices[i];
        btn.classList.add('choice');
        //add data atribute for answer checking
        btn.dataset.test = i + 1;
        //add to the page.
        choices.appendChild(btn);

    }

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

//function to move to next question
function next() {
    //if more questions available
    if (questionIndex + 1 < qArrLength && timeRemaining > 0) {
        questionIndex++;
        runQuiz();
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
    toStorage.push(scoreSave);
    toStorage.sort(compare);
    //save score
    localStorage.setItem('highScores', JSON.stringify(toStorage));
    //redirect player to show highscores
    window.location.replace('highscores.html');

}

//function to sort scores into high score order
function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
    return 0;
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
        runQuiz();
    }
    if (button.classList.contains('choice')) {
        ///check if correct answer
        let feedback = checkAns(button.dataset.test);
        if(!feedback) reduceTime();
        showFeedback(feedback);
        next();

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