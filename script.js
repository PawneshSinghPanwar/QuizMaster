const questions = [
    {
        question: "Grand Central Terminal, Park Avenue, New York is the world's",
        answers: [
            { text: "largest railway station", correct: true },
            { text: "highest railway station", correct: false },
            { text: "longest railway station", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "The members of the Rajya Sabha are elected by",
        answers: [
            { text: "the people", correct: false },
            { text: "Lok Sabha", correct: false },
            { text: "elected members of the legislative assembly", correct: true },
            { text: "elected members of the legislative council", correct: false }
        ]
    },
    {
        question: "Tripitakas are sacred books of",
        answers: [
            { text: "Buddhists", correct: true },
            { text: "Hindus", correct: false },
            { text: "Jains", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "Who is the father of Geometry?",
        answers: [
            { text: "Aristotle", correct: false },
            { text: "Euclid", correct: true },
            { text: "Pythagoras", correct: false },
            { text: "Kepler", correct: false }
        ]
    },
    {
        question: "Jeev Milkha Singh is associated with which sports?",
        answers: [
            { text: "Volleyball", correct: false },
            { text: "Golf", correct: false },
            { text: "Athletics", correct: true },
            { text: "Hockey", correct: false }
        ]
    },
    {
        question: "'Dandia' is a popular dance of",
        answers: [
            { text: "Punjab", correct: false },
            { text: "Gujarat", correct: true },
            { text: "Tamil Nadu", correct: false },
            { text: "Maharashtra", correct: false }
        ]
    },
    {
        question: "'OS' computer abbreviation usually means ?",
        answers: [
            { text: "Order of Significance", correct: false },
            { text: "Open Software", correct: false },
            { text: "Operating System", correct: true },
            { text: "Optical Sensor", correct: false }
        ]
    },
    {
        question: "Pollination is best defined as",
        answers: [
            { text: "germination of pollen grains", correct: false },
            { text: "transfer of pollen from anther to stigma", correct: true },
            { text: "growth of pollen tube in ovule", correct: false },
            { text: "visiting flowers by insects", correct: false }
        ]
    },
    {
        question: "The nuclear particles which are assumed to hold the nucleons together are",
        answers: [
            { text: "electrons", correct: false },
            { text: "positrons", correct: false },
            { text: "mesons", correct: true },
            { text: "neutrons", correct: false },
        ]
    },
    {
        question: "Which of the following is used in pencils?",
        answers: [
            { text: "Silicon", correct: false },
            { text: "Charcoal", correct: false },
            { text: "Phosphorous", correct: false },
            { text: "Graphite", correct: true }
        ]
    }

]

const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none"

    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();

    questionElement.innerHTML = `You Scored  ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }
    else{
        startQuiz();
    }
})

startQuiz()