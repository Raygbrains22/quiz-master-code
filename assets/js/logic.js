// DOM elements
const startButton = document.getElementById('start');
const questionsContainer = document.getElementById('questions');
const questionTitle = document.getElementById('question-title');
const choicesContainer = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitButton = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');
const timerEl = document.getElementById('time');

let currentQuestionIndex = 0;
let time = questions.length * 15; // 15 seconds per question
let timerId;

function startQuiz() {
    // Hide start screen
    document.getElementById('start-screen').classList.add('hide');
    // Show questions container
    questionsContainer.classList.remove('hide');
    // Start timer
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    // Show first question
    getQuestion();
}

function getQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.title;
    choicesContainer.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.setAttribute('value', choice);
        choiceButton.textContent = `${index + 1}. ${choice}`;
        choiceButton.onclick = questionClick;
        choicesContainer.appendChild(choiceButton);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong!';
    } else {
        feedbackEl.textContent = 'Correct!';
    }
    
    feedbackEl.classList.remove('hide');
    setTimeout(() => {
        feedbackEl.classList.add('hide');
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    questionsContainer.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScoreEl.textContent = time;
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    const initials = initialsInput.value.trim();

    if (initials !== '') {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        const newScore = {
            score: time,
            initials: initials
        };
        highscores.push(newScore);
        localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = 'highscores.html';
    }
}

startButton.onclick = startQuiz;
submitButton.onclick = saveHighscore;
