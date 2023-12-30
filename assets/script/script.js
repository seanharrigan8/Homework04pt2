console.log("it works");

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerId;

let SavedScores = JSON.parse(localStorage.getItem("allScores")) || [];

function startTimer() {
  timerId = setInterval(() => {
    console.log("time left:", timeLeft);
    document.getElementById("time-remaining").innerText = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerId);
      gameOver();
    }
  }, 1000);
}

const questions = [
  {
    question: "Commonly used data types Do Not Include",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Booleans",
  },
  {
    question: "The condition within an if/then statements is enclosed with",
    options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correctAnswer: "Curly Brackets",
  },
  {
    question: "String Values Must be inclosed within",
    options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correctAnswer: "Quotes",
  },

  {
    question: "Arrays in JavaScript can be used to store",
    options: [
      "numbers and other strings",
      "other arrays",
      "Booleans",
      "All of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    question: "A very useful debug tool during development is ___",
    options: ["Console.log", "terminal/bash", "JavaScript", "For loops"],
    correctAnswer: "Console.log",
  },
];

function GetQuestion() {
  console.log("fetching question, currentQuestionIndex +1");

  const questionObject = questions[currentQuestionIndex];

  document.getElementById("question").innerText = questionObject.question;

  document.getElementById("question").style.display = "block";

  const optionsContainer = document.getElementById("options");
  optionsContainer.style.display = "flex";
  optionsContainer.innerHTML = "";

  questionObject.options.forEach((option) => {
    const optionElement = document.createElement("button");
    optionElement.classList.add("option-button");
    optionElement.innerText = option;
    optionElement.addEventListener("click", answerCheck);

    console.log("button clicked");
    optionsContainer.appendChild(optionElement);
  });
}

document.getElementById("start-button").addEventListener("click", () => {
  console.log("start button click");
  document.getElementById("initialform").style.display = "none";
  GetQuestion();
  startTimer();
  document.getElementById("start-container").style.display = "none";
  document.getElementById("totalscore").style.display = "block";
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("quiz-container").style.display = "flex";
  document.getElementById("start-button").style.display = "none";
});

function answerCheck(event) {
  console.log("checking answer");
  const userAnswer = event.target.innerText;
  console.log("userAnswer:", userAnswer);

  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (userAnswer == correctAnswer) {
    console.log("correct answer!");
    score += 10;
  } else {
    console.log("wrong asnswer. The right answer is:", correctAnswer);
    timeLeft -= 10;
  }
  document.getElementById(
    "totalscore"
  ).innerText = `Your Total Score is ${score}`;

  console.log("updated score:", score);
  if (currentQuestionIndex === questions.length - 1) {
    gameOver();
    return;
  }
  nextQuestion();
}

function nextQuestion() {
  console.log("next question populating");
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length - 1) {
    clearInterval(timerId);
    gameOver();
    return;
  }
  GetQuestion();
}

function gameOver() {
  console.log("GameOver!Final Score:", score);
  clearInterval(timerId);

  document.getElementById(
    "question"
  ).innerText = `Your Total Score is ${score}`;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  const initialForm = document.getElementById("initialform");
  initialForm.style.display = "block";
  console.log("initial form displayed");
}

const userInitials = document.getElementById("user-initials").value;
const userScore = {
  initials: userInitials,
  score: score,
};

function saveScore() {
  const userInitials = document.getElementById("user-initials").value;
  const userScore = {
    initials: userInitials,
    score: score,
  };

  //  //retrieve scores
  let scores = JSON.parse(localStorage.getItem("allScores")) || [];

  //add new score to array
  scores.push(userScore);
  //save updated scores again to storage
  localStorage.setItem("allScores", JSON.stringify(scores));
}

document.getElementById("submit-score").addEventListener("click", () => {
  event.preventDefault();
  saveScore();
  console.log("savedscore", userScore);
  displayScores();
});

function displayScores() {
  // Retrieve scores from local storage
  let scores = JSON.parse(localStorage.getItem("allScores")) || [];

  // Get the element where you want to display the scores
  let scoreContainer = document.getElementById("score-container");

  // Clear any existing scores
  scoreContainer.innerHTML = "";

  // Loop through the scores and add them to the score container
  for (let i = 0; i < scores.length; i++) {
    let scoreElement = document.createElement("p");
    scoreElement.textContent = scores[i].initials + ": " + scores[i].score;
    scoreContainer.appendChild(scoreElement);
  }
}

// Call the function to display the scores
