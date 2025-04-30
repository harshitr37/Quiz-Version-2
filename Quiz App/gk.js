
const questionContainer = document.getElementById("question");
const optionsContainer = document.getElementById("opt");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

let currentQuestion= 0;
let score = 0;
let totalQuestions = 0;
let questions = [];


async function fetchQuestions() {
    try{
        let response = await fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple");
        let data = await response.json();
        questions = data.results;
        totalQuestions = questions.length;
        showQuestion();
    }catch(error){
        console.error("Error fetching quiz data",error);

    }
    
    
}

function showQuestion(){
    resetState();
    let questionData = questions[currentQuestion];
    questionContainer.innerHTML = questionData.question;

    let answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers.sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("opt");
        button.addEventListener("click", () => checkAnswer(button, answer, questionData.correct_answer));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
    let options = document.querySelectorAll(".opt");
    options.forEach(opt => opt.disabled = true);

    if(selectedAnswer === correctAnswer){
        button.classList.add("correct");
        score++;
        scoreDisplay.innerHTML = `Score: ${score}/${totalQuestions}`;
    } else {
        button.classList.add("wrong");

        options.forEach(opt =>{
            if(opt.innerHTML === correctAnswer){
                opt.classList.add("correct");
            }
        });
    }
}

function resetState(){
    optionsContainer.innerHTML = "";
}

nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        alert(`Quiz Over! Your Score: ${score}`);
        window.location.href = `start.html?score=${score}`;
    }

});

fetchQuestions();