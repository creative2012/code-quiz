const questionsArr = [
    {
        question: 'Javascript is an _______ language?',
        choices: [
            'Object-Oriented',
            'Object-Based',
            'Procedural',
            "None of the above"
        ],
        //human readable correct choice - actuall would be (correct -1) 
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
        question: 'pon encountering empty statements, what does the Javascript Interpreter do?',
        choices: [
            'Thorws an erro',
            'Ignores the statements',
            'Gives a warning',
            "None of the above"
        ],
        correct: 2
    },
    
]
const qArrLength = questionsArr.length;