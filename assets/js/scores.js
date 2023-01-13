

//get wrapper that will contain all buttons
const button = document.querySelector('#clear');
//and add event listener
button.addEventListener('click', function () {
    localStorage.removeItem('highScores');
    
});