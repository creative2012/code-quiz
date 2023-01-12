const startScreen = document.querySelector('#start-screen');
const questions = document.querySelector('#questions');
const endScreen = document.querySelector('#end-screen');
const startBtn = document.querySelector('#start');
const submitBtn = document.querySelector('#submit');
const questionTitle = document.querySelector('#question-title');
const choices = document.querySelector('#choices');
const timeIndicator = document.querySelector('#time');
var incorrectAns = new Audio('/assets/sfx/incorrect.wav');
var correctAns = new Audio('/assets/sfx/correct.wav');
var timeRemaining = 0;

//function to set base state
function int(){
    startScreen.classList.add('hide');
    questions.classList.remove('hide');
    timeRemaining = questionsArr.length * 10;
    timeIndicator.textContent = timeRemaining;
    timer();
}

//function to start the timer and initiat the quiz
function timer(){
    setInterval(function (){
        //check if time remaining and count down the timer
        if(timeRemaining > 0){
            timeRemaining--;
            timeIndicator.textContent = timeRemaining;
        } else {
            //if not end the game
            clearInterval();
            endGame();
        }

    },1000);

    //randomise questions
    let qShuff = shuffle(questionsArr);
    //start quiz
    runQuiz(0, qShuff);
}
//function for wrong answer
function reduceTime(){
    if(timeRemaining > 6){
        timeRemaining -= 5;
        timeIndicator.textContent = timeRemaining;
    } else {
        timeRemaining = 1;
        timeIndicator.textContent = timeRemaining;
    }

}

function runQuiz(q, questionShuff){

    questionTitle.innerHTML = questionShuff[q].question;
    let qLength = questionShuff.length
    let qChoices = questionShuff[q].choices;
    
    for (var i = 0; i < qLength; i++ ){
        //create button
       let btn = document.createElement('button');
       //set the text and class
       btn.innerHTML = qChoices[i];
       btn.classList.add('choice');
       //check if this is the correct answer
       if(questionShuff[q].correct == i +1){
        //if so add a data attribute with 1 for true or o for false
        btn.dataset.test = 1;
       } else {
        btn.dataset.test = 0;
       }
       //add to the page.
       choices.appendChild(btn);

    }
    

}
//function to get next question
function next(){

}
//function to end the game
function endGame(){

    questions.classList.add('hide');
    endScreen.classList.remove('hide');

}
//function to handle button clicks
function buttonHandler(button){
    if(button.id == "start"){
        int();
    }
    if(button.classList.contains('choice')){
        ///check if correct answer
        if(button.dataset.test == 1){
            correctAns.play();
        } else {
            incorrectAns.play();
            reduceTime();
        }
    }


}
//function to shuffle questions
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
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

//get wrapper that will contain all buttons
const wrapper = document.querySelector('.wrapper');
//and add event listener
wrapper.addEventListener('click', function(event) {
    const button = event.target;
    const isButton = button.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    } else {
        buttonHandler(button);    
    }
});