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
//randomiseQuestions;
const questionShuff = shuffle(questionsArr);
var intervalID = null;

var timeRemaining = 75;
var questionIndex = 0;
var scoreSave = {
        inital: '',
        score: 0
    }



//function to set base state
function int(){
    startScreen.classList.add('hide');
    questions.classList.remove('hide');
    // timeRemaining = qArrLength * 10;
    timeIndicator.textContent = timeRemaining;
    timer();
}

//function to start the timer and initiate the quiz
function timer(){
    intervalID = setInterval(function (){
        //check if time remaining and count down the timer
        if(timeRemaining > 0){
            timeRemaining--;
            timeIndicator.textContent = timeRemaining;
        } else {
            //if not end the game
            clearInterval(intervalID);
            endGame();
        }

    },1000);

    //start quiz
    runQuiz(questionIndex);
}
//function to run the quiz
function runQuiz(q){

    choices.innerHTML = '';
    questionTitle.innerHTML = questionShuff[q].question;
    let qChoices = questionShuff[q].choices;
    
    for (var i = 0; i < 4; i++ ){
        //create button
       let btn = document.createElement('button');
       //set the text and class
       btn.innerHTML = qChoices[i];
       btn.classList.add('choice');
       //check if this is the correct answer
       if(questionShuff[q].correct == i +1){
        //if so add a data attribute with 1 for true or if not 0 for false
        btn.dataset.test = 1;
       } else {
        btn.dataset.test = 0;
       }
       //add to the page.
       choices.appendChild(btn);

    }
    questionIndex ++;
    

}
//function for wrong answer
function reduceTime(){
    if(timeRemaining > 11){
        timeRemaining -= 10;
        timeIndicator.textContent = timeRemaining;
    } else {
        timeRemaining = 1;
        timeIndicator.textContent = timeRemaining;
    }
    next();

}
//function to move to next question
function next(){
    if(questionIndex < qArrLength && timeRemaining > 0){
        runQuiz(questionIndex);
    } else {
        if(timeRemaining > 0){
            clearInterval(intervalID);
        }
        endGame();
    }
}
//function to end the game
function endGame(){

    questions.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.innerHTML = timeRemaining;

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
            next();
        } else {
            incorrectAns.play();
            reduceTime();
        }
    }
    if(button.id == "submit"){
        //save inital and score
        scoreSave.inital = initials.value;
        scoreSave.score = timeRemaining;
        var toStorage = [];
        if(JSON.parse(localStorage.getItem('highScores')) != null){
            let data = JSON.parse(localStorage.getItem('highScores'));
            data.forEach(function(item) {
                toStorage.push(item);
            });
        }
        toStorage.push(scoreSave);
        toStorage.sort(compare);
        
        localStorage.setItem('highScores',JSON.stringify(toStorage));
    }


}
function compare( a, b ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
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