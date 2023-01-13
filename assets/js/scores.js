const orderedList = document.querySelector('#highscores');


//check if scores in local storage
let data = JSON.parse(localStorage.getItem('highScores'));
let header =  document.createElement('div');
header.innerHTML = 'Name<span>Score</span>'
orderedList.appendChild(header);
if (data != null) {
    data.forEach(function (item) {
        let listItem =  document.createElement('li');
        listItem.innerHTML = item.inital+'<span>'+item.score+'</span>'
        orderedList.appendChild(listItem);
    });
} 


//get wrapper that will contain all buttons
const button = document.querySelector('#clear');
//and add event listener
button.addEventListener('click', function () {
    orderedList.innerHTML = '';
    localStorage.removeItem('highScores');
    
});