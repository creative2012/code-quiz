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