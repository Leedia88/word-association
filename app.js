//Connect with Word API
const data = null;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        console.log(xhr.status);
		console.log(this.responseText);
	}
});
// Open a new connection, using GET request on the URL endpoint and custom the header to include Credentials with Origin (CORS requirement)

xhr.open("GET", "https://twinword-word-association-quiz.p.rapidapi.com/type1/?level=5&area=sat");
xhr.setRequestHeader('access-control-allow-origin', 'http://127.0.0.1')
xhr.setRequestHeader("X-RapidAPI-Key", "f8dcafe8aamshbd9192a63f7c5afp145273jsn87edbf5dc48a");
xhr.setRequestHeader("X-RapidAPI-Host", "twinword-word-association-quiz.p.rapidapi.com");
xhr.setRequestHeader('access-control-allow-headers', 'accept')
xhr.setRequestHeader('Access-Control-Allow-Credentials', true);

//Send request
xhr.send(data);

xhr.onload = function () {
    // Begin accessing JSON data here
    var dataDisplay = JSON.parse(this.response)

    const scoreDisplay = document.querySelector("#score-display");
    const questionDisplay = document.querySelector("#questions-display");
    const questions = dataDisplay.quizlist
    console.log(questions)
    
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
    
            question.option.forEach((option, optionIndex) => {
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


  }
