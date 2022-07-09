const scoreDisplay = document.querySelector("#score-display");
const questionDisplay = document.querySelector("#questions-display");
const questions = [
    {
        quiz: ['value', 'estimate', 'evaluate'],
        options: ['jury', 'assess'],
        correct: 2
    },
    {
        quiz: ['close', 'nearby', 'next'],
        options: ['trace', 'adjacent'],
        correct: 2
    },
    {
        quiz: ['foreign', 'national', 'ethnic'],
        options: ['mad', 'exotic'],
        correct: 2
    },
    {
        quiz: ['fast', 'quick', 'prompt'],
        options: ['charity', 'rapid'],
        correct: 1
        },
    {
        quiz: ['assume', 'insight', 'weather'],
        options: ['forecast', 'sustainable'],
        correct: 2
    }
];

let score = 0;
let clicked = []

scoreDisplay.textContent = score;

function populateQuestions(){
    questions.forEach(question => {
        const questionBox = document.createElement('div');
        questionBox.classList.add('question-box');
        
        const logoDisplay = document.createElement('h1');
        logoDisplay.textContent = '✎';
        questionBox.append(logoDisplay);

        question.quiz.forEach(tip => {
            const tipText = document.createElement('p');
            tipText.textContent = tip;
            questionBox.append(tipText);
        })


        const questionButtons = document.createElement('div')
        questionButtons.classList.add('question-buttons')
        questionBox.append(questionButtons)

        question.options.forEach((option, optionIndex) => {
            const questionButton = document.createElement('button')
            questionButton.classList.add('question-button')
            questionButton.textContent = option
            questionButton.addEventListener('click', () => checkAnswer(questionBox, option, optionIndex + 1, question.correct))
            questionButtons.append(questionButton)
        })

        const answerDisplay = document.createElement('div')
        answerDisplay.classList.add('answer-display')
        questionBox.append(answerDisplay)

        questionDisplay.append(questionBox);
    })
};

populateQuestions();

function checkAnswer(questionBox, option, optionIndex, answer){

    if (answer === optionIndex){
        score ++
        addResult(questionBox, "correct", "Well done, correct!")
    }
    else{
        addResult(questionBox, "wrong", "Wrong answer..")
    }
    scoreDisplay.textContent =score;
    clicked.push(option)
    console.log(clicked)
    console.log(questionBox)
    questionBox.querySelectorAll(".question-button").forEach(button =>{
        button.disabled = 'true'
    })
}

function addResult(questionBox, answerClass, answerText){
    const answerDisplay = questionBox.querySelector('.answer-display')
    answerDisplay.classList.add(answerClass)
    answerDisplay.textContent= answerText
}