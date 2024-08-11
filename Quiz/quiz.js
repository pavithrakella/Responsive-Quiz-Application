


const quizzes = {
  "JavaScript Basics": {
    "Easy": [
      {
        "question": "Which type of variable is visible only within a function?",
        "options": ["Global Variable", "Local Variable", "Both", "None"],
        "answer": "Local Variable"
      },
      {
        "question": "Which function is used to parse a string to an integer?",
        "options": ["int()", "parseInt()", "Number()", "None"],
        "answer": "parseInt()"
      },
      {
        "question": "Which method is used to remove the last element from an array in JavaScript?",
        "options": ["pop()", "remove()", "shift()", "splice()"],
        "answer": "pop()"
      },
      {
        "question": "How do you create a function in JavaScript?",
        "options": ["function = myFunction()", "function myFunction()", "create myFunction()", "function:myFunction()"],
        "answer": "function myFunction()"
      },
      {
        "question": "Which event occurs when the user clicks on an HTML element?",
        "options": ["onmouseclick", "onchange", "onclick", "onmouseover"],
        "answer": "onclick"
      }
    ],
    "Medium": [
      {
        "question": "What will be the output of the following code? console.log(typeof null);",
        "options": ["\"null\"", "\"object\"", "\"undefined\"", "\"string\""],
        "answer": "\"object\""
      },
      {
        "question": "Which method is used to remove the last element from an array in JavaScript?",
        "options": ["pop()", "remove()", "shift()", "splice()"],
        "answer": "pop()"
      },
      {
        "question": "How do you write a conditional statement in JavaScript for executing some code if 'i' is equal to 5?",
        "options": ["if (i == 5)", "if i == 5 then", "if i = 5 then", "if (i = 5)"],
        "answer": "if (i == 5)"
      },
      {
        "question": "What is the purpose of the 'this' keyword in JavaScript?",
        "options": ["It refers to the current object", "It refers to the previous object", "It refers to the next object", "It is a placeholder"],
        "answer": "It refers to the current object"
      },
      {
        "question": "What is the output of the following code? console.log(2 + '2' - 1);",
        "options": ["21", "22", "3", "NaN"],
        "answer": "21"
      }
    ],
    "Hard": [
      {
        "question": "What is the difference between let and var in JavaScript?",
        "options": ["var is block-scoped, let is function-scoped.", "let can be redeclared, var cannot.", "let is block-scoped, var is function-scoped.", "var is used for constants, let is not."],
        "answer": "let is block-scoped, var is function-scoped."
      },
      {
        "question": "What will be the output of the following code? let x = 1; let y = x++; console.log(y);",
        "options": ["1", "0", "2", "undefined"],
        "answer": "1"
      },
      {
        "question": "What is the purpose of the JavaScript 'strict mode'?",
        "options": ["It makes JavaScript run faster", "It allows you to write looser code", "It prevents the use of undeclared variables", "It enables async operations"],
        "answer": "It prevents the use of undeclared variables"
      },
      {
        "question": "What will be the output of the following code? let arr = [1, 2, 3]; arr.length = 0; console.log(arr[0]);",
        "options": ["undefined", "1", "0", "null"],
        "answer": "undefined"
      },
      {
        "question": "What is the output of the following code? console.log([] + []);",
        "options": ["[]", "undefined", "\"\"", "NaN"],
        "answer": "\"\""
      }
    ]
  },
  "HTML & CSS": {
      "Easy": [
          {
              question: "Which tag is used to define a hyperlink in HTML?",
              options: ["a", "link", "href", "url"],
              answer: "a"
          },
          {
              question: "Which property is used to change the background color in CSS?",
              options: ["color", "background-color", "bg-color", "back-color"],
              answer: "background-color"
          }
      ],
      "Medium": [
          // Add medium-level questions here
      ],
      "Hard": [
          // Add hard-level questions here
      ]
  }
};

let currentQuiz = "";
let currentDifficulty = "";
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let userAnswers = []; // To store user's answers in order

function selectDifficulty(quizName) {
  currentQuiz = quizName;
  document.getElementById('quiz-list').classList.add('hidden');
  document.getElementById('difficulty-level').classList.remove('hidden');
}

function startQuiz(difficulty) {
  currentDifficulty = difficulty;
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];

  document.getElementById('difficulty-level').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');

  document.getElementById('quiz-title').textContent = `${currentQuiz} - ${currentDifficulty} Level`;
  loadQuestion();
  startTimer(10); // Set timer to 10 seconds per question
}

function loadQuestion() {
  const questionObj = quizzes[currentQuiz][currentDifficulty][currentQuestionIndex];
  document.getElementById('question-container').innerHTML = `
      <p>${questionObj.question}</p>
      ${questionObj.options.map((opt, index) => `
          <label>
              <input type="radio" name="question" value="${opt}">
              ${opt}
          </label><br>
      `).join('')}
  `;
}

function submitQuiz(skipped = false) {
  clearInterval(timerInterval);
  const questionObj = quizzes[currentQuiz][currentDifficulty][currentQuestionIndex];
  const selectedAnswer = document.querySelector('input[name="question"]:checked');

  if (!skipped && selectedAnswer) {
      const answer = selectedAnswer.value;
      userAnswers.push({ question: questionObj.question, selected: answer, correct: questionObj.answer });
      if (answer === questionObj.answer) {
          score++;
      }
  } else {
      userAnswers.push({ question: questionObj.question, selected: "No Answer", correct: questionObj.answer });
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizzes[currentQuiz][currentDifficulty].length) {
      loadQuestion();
      startTimer(10); // Reset timer for the next question
  } else {
      showResults();
  }
}

function showResults() {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('result-container').classList.remove('hidden');
  document.getElementById('score').textContent = `You scored ${score} out of ${quizzes[currentQuiz][currentDifficulty].length}`;

  const answerContainer = document.getElementById('answers-container');
  answerContainer.innerHTML = "";

  userAnswers.forEach((answerObj, index) => {
      const isCorrect = answerObj.selected === answerObj.correct;
      answerContainer.innerHTML += `
          <div>
              <p>Question ${index + 1}: ${answerObj.question}</p>
              <p class="${isCorrect ? 'correct' : 'incorrect'}">Your Answer: ${answerObj.selected}</p>
              <p class="correct">Correct Answer: ${answerObj.correct}</p>
          </div>
      `;
  });
}

function resetQuiz() {
  document.getElementById('result-container').classList.add('hidden');
  document.getElementById('quiz-list').classList.remove('hidden');
}

function startTimer(seconds) {
  let timeLeft = seconds;
  document.getElementById('time').textContent = timeLeft;
  timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('time').textContent = timeLeft;
      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          submitQuiz(true); // Skip question if time is up
      }
  }, 1000);
}
