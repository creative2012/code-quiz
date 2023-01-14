const questionsArr = [
    {
        question: 'Javascript is an _______ language?',
        choices: [
            'Object-Oriented', //1
            'Object-Based', //2
            'Procedural', //3
            "None of the above" //4
        ],
        //human readable correct choice - actual in logic would be (correct -1) 
        correct: 1
    },
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        choices: [
            'var',
            'let',
            'Both A and B',
            "None of the above"
        ],
        correct: 3
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        choices: [
            'getElementbyId()',
            'GetElementsByClassName()',
            'Both A and B',
            "None of the above"
        ],
        correct: 3
    },
    {
        question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        choices: [
            'Throws an error',
            'Ignores the statements',
            'Gives a warning',
            "None of the above"
        ],
        correct: 2
    },
    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        choices: [
            'document.write()',
            'console.log()',
            'window.alert()',
            "All of the above"
        ],
        correct: 4
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        choices: [
            'Const',
            'var',
            'let',
            "constant"
        ],
        correct: 1
    },
    
]
const qArrLength = questionsArr.length;
const questionTitle = document.querySelector('#question-title');
const choices = document.querySelector('#choices');
var questionShuff = [];

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

//function to show question
function showQuestion() {

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
