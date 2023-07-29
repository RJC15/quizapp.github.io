const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options-container');
const feedbackElement = document.querySelector('.feedback');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.querySelector('.result-container');
const finalScoreElement = document.getElementById('final-score');
const percentageElement = document.getElementById('percentage');
const tryAgainButton = document.getElementById('try-again-btn');
const itemButtons = document.querySelectorAll('.item-buttons button');
const startContainer = document.querySelector('.start-container');
const itemButtonsContainer = document.querySelector('.item-buttons');
const startButton = document.getElementById('start-btn');
const quizContainer = document.querySelector('.quiz-container');
const mainMenuButton = document.getElementById('main-menu-btn');

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedItemCount = 0;
let questionBank = [];

const questionBank20 = [
  // Sample question for 20 items question bank
  {
    question: "Sample Question 1 (20 items)",
    options: [
      "A. Option A",
      "B. Option B",
      "C. Option C",
      "D. Option D"
    ],
    answer: "A. Option A"
  },
  // Add more questions here for the 20 items question bank
];

const questionBank50 = [
  // Sample question for 50 items question bank
  {
    question: "Sample Question 1 (50 items)",
    options: [
      "A. Option A",
      "B. Option B",
      "C. Option C",
      "D. Option D"
    ],
    answer: "A. Option A"
  },
  // Add more questions here for the 50 items question bank
];

const questionBank100 = [
  // Sample question for 100 items question bank
  {
    question: "Sample Question 1 (100 items)",
    options: [
      "A. Option A",
      "B. Option B",
      "C. Option C",
      "D. Option D"
    ],
    answer: "A. Option A"
  },
  // Add more questions here for the 100 items question bank
];

startButton.addEventListener('click', () => {
  startContainer.style.display = 'none'; // Hide the start container
  itemButtonsContainer.style.display = 'block'; // Show the item selection buttons
});

// Add event listeners to the item selection buttons
itemButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedItemCount = parseInt(button.dataset.items);
    itemButtonsContainer.style.display = 'none'; // Hide the item selection buttons
    quizContainer.style.display = 'block'; // Show the quiz container

    // Choose the question bank based on the selected item count
    if (selectedItemCount === 20) {
      questionBank = questionBank20;
    } else if (selectedItemCount === 50) {
      questionBank = questionBank50;
    } else if (selectedItemCount === 100) {
      questionBank = questionBank100;
    }

    startQuiz(); // Start the quiz with the selected item count
  });
});

function shuffleQuestions() {
  shuffledQuestions = questionBank.sort(() => Math.random() - 0.5);
}

// Initialize the quiz and display the first question
function startQuiz() {
  shuffleQuestions();
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  nextButton.style.display = 'block';
  resultContainer.style.display = 'none';
}

// Add an event listener to the "Next" button to handle next question display
nextButton.addEventListener('click', showNextQuestion);

// Function to show the next question or display the result if the quiz is over
function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Function to display the current question
function showQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option) => {
    const optionElement = document.createElement('button');
    optionElement.textContent = option;
    optionElement.classList.add('option');
    optionElement.addEventListener('click', checkAnswer); // Add the click event listener for options
    optionsContainer.appendChild(optionElement);
  });

  // Hide the "Next" button until an answer is selected
  nextButton.style.display = 'none';

  // Clear the previous feedback
  feedbackElement.textContent = '';
}

// Function to check the selected answer and display feedback
function checkAnswer(event) {
  const selectedOption = event.target.textContent;
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
    score++;
    feedbackElement.textContent = 'Correct!';
  } else {
    feedbackElement.textContent = 'Wrong!';
    // Show the correct answer when the user selects the wrong option
    const correctAnswerElement = document.createElement('p');
    correctAnswerElement.textContent = `The correct answer is: ${currentQuestion.answer}`;
    feedbackElement.appendChild(correctAnswerElement);
  }

  // Remove the click event listener on the selected option (prevent multiple selections)
  const options = optionsContainer.querySelectorAll('.option');
  options.forEach((option) => {
    option.removeEventListener('click', checkAnswer);
  });

  // Display the "Next" button to proceed to the next question
  nextButton.style.display = 'block';
}

// Function to display the quiz results
function showResult() {
  const totalQuestions = shuffledQuestions.length;
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  questionElement.textContent = '';
  optionsContainer.innerHTML = '';
  feedbackElement.textContent = '';

  finalScoreElement.textContent = score;
  percentageElement.textContent = percentage + '%';

  nextButton.style.display = 'none';
  resultContainer.style.display = 'block';
}

// Event listener for the "Try Again" button to start the quiz again
tryAgainButton.addEventListener('click', () => {
  startQuiz();
  resultContainer.style.display = 'none';
});

// Event listener for the "Main Menu" button to go back to the item selection screen
mainMenuButton.addEventListener('click', () => {
  resultContainer.style.display = 'none';
  itemButtonsContainer.style.display = 'block';
});
