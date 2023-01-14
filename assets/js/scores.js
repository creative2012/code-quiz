const orderedList = document.querySelector('#highscores');

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

//check if scores in local storage
let data = JSON.parse(localStorage.getItem('highScores'));
//if there is sort order add scores to page
if (data != null) {
    //add header
    let header =  document.createElement('div');
    header.innerHTML = 'Name<span>Score</span>';
    orderedList.appendChild(header);
    //sort
    data.sort(compare);
    //add each score
    data.forEach(function (item) {
        let listItem =  document.createElement('li');
        listItem.innerHTML = item.inital+'<span>'+item.score+'</span>'
        orderedList.appendChild(listItem);
    });
} 


//get button on page
const button = document.querySelector('#clear');
//and add event listener
button.addEventListener('click', function () {
    orderedList.innerHTML = '';
    localStorage.removeItem('highScores');
    
});