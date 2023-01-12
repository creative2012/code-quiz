const startScreen = document.querySelector('#start-screen');
const questions = document.querySelector('#questions');
const endScreen = document.querySelector('#end-screen');

const startBtn = document.querySelector('#start');
const submitBtn = document.querySelector('#submit');

const questionTitle = document.querySelector('#question-title');
const choices = document.querySelector('#choices');

const timeIndicator = document.querySelector('#time');

var timeRemaining = 0;

function int(){

    startScreen.classList.add('hide');
    questions.classList.remove('hide');
    timeRemaining = questionsArr.length * 10;
    timeIndicator.textContent = timeRemaining;
    timer();
}

function timer(){

    setInterval(function (){
        if(timeRemaining > 0){
            timeRemaining--;
            timeIndicator.textContent = timeRemaining;
        } else {
            clearInterval();
            endGame();
        }

    },1000);
    

}

function startQuiz(questionShuff){

    questionTitle.innerHTML = questionShuff[0].question;
    choices.innerHTML = questionShuff[0].answer;

}

function endGame(){

    questions.classList.add('hide');
    endScreen.classList.remove('hide');

}
//function to handle button clicks
function buttonHandler(button){

    if(button.id == "start"){
        int();
    }

}
//function to shuffle questions
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

const wrapper = document.querySelector('.wrapper');

wrapper.addEventListener('click', function(event) {
    const button = event.target;
    const isButton = button.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    } else {
        buttonHandler(button);    
    }
});