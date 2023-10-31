console.log("it works");

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerId;


let SavedScores = JSON.parse(localStorage.getItem("allScores")) || [];


function startTimer() {
    timerId = setInterval(() => {
        console.log("time left:", timeLeft);
        document.getElementById("time-remaining").innerText = timeLeft; timeLeft--;
        if (timeLeft < 0) {
        clearInterval(timerId);
        gameOver();}
}, 1000);
}

// document.getElementById("totalscore").style.display = 'none'; // hide the score initially
// document.getElementById("initialform").style.display = 'none'; // hide the form initially

const questions = [
{
    question: "Commonly used data types Do Not Include",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Booleans"
},
{   
    question: "The condition within an if/then statements is enclosed with",
    options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correctAnswer: "Curly Brackets" 
},
{
    question: "String Values Must be inclosed within",
    options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correctAnswer: "Quotes"},

{ 
    question: "Arrays in JavaScript can be used to store",
    options: ["numbers and other strings", "other arrays", "Booleans", "All of the above"],
    correctAnswer: "All of the above"},
{
    question: "A very useful debug tool during development is ___",
    options: ["Console.log", "terminal/bash", "JavaScript", "For loops"],
    correctAnswer: "Console.log"
}, ]

function GetQuestion() {
    console.log("fetching question, currentQuestionIndex +1");

    const questionObject = questions[currentQuestionIndex];
    
    document.getElementById("question").innerText = questionObject.question;
   
    document.getElementById("question").style.display = 'block';
        
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
        
    questionObject.options.forEach(option => {
        const optionElement = document.createElement("button");
        optionElement.innerText = option;
        optionElement.addEventListener("click", answerCheck);
        console.log("button clicked");
        optionsContainer.appendChild(optionElement);
        });
        optionsContainer.style.display = 'block';
}


document.getElementById("start-button").addEventListener("click", () => {console.log("start button click");
GetQuestion();
startTimer();


document.getElementById("quiz-layout").style.display = 'block'
document.getElementById("quiz-container").style.display = 'none'
document.getElementById("start-button").style.display = 'none';
});



function answerCheck(event) {
    

    console.log("checking answer") 
    const userAnswer = event.target.innerText;
    console.log("userAnswer:", userAnswer);

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (userAnswer == correctAnswer)  
{
            console.log("correct answer!");
            score += 10;
        } else {
            console.log("wrong asnswer. The right answer is:", correctAnswer)
            timeLeft-= 10;
        }
        document.getElementById("totalscore").innerText = score;

        console.log("updated score:", score);
        if (currentQuestionIndex  === questions.length -1) {
            gameOver();
            return; //leaves the function
    } nextQuestion();
}
        

    function nextQuestion() {
        console.log("next question populating")
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length - 1) {
            document.getElementById("question").style.display = 'none';
            document.getElementById("options").style.display = 'none';
            // document.getElementById("initialform").style.display = 'block'
            clearInterval(timerId);
                gameOver();
                return;
            }
        GetQuestion();
    }
    
// // document.querySelectorAll("option").forEach((option) => {option.addEventListener("click", answercheck); 
// });

function gameOver() {
    console.log("GameOver!Final Score:", score);
    clearInterval(timerId);

    const totalScoreDiv = document.getElementById("totalscore");
    totalScoreDiv.style.display ='block';

   
    }

    //save to local storag
  
   

    //display score
    const scoreDisplay = document.getElementById("totalscore")
    scoreDisplay.innerText = `Your Total Score is ${score}`
    scoreDisplay.style.display = 'block';



        const userInitials=document.getElementById("user-initials").value;
        const userScore = {
            initials: userInitials,
            score: score



    //show form 
    // const initialForm = document.getElementById("totalscore").querySelector("#initialform");initialForm.style.display = 'block'; 
}
  


function saveScore() {
    
    const userInitials=document.getElementById("user-initials").value;
    const userScore = {
        initials: userInitials,
        score: score
}
    // localStorage.setItem("latestScore", score);

    //  //retrieve scores
     let scores = JSON.parse(localStorage.getItem("allScores")) || [];
    
    //add new score to array
    scores.push(score);
    //save updated scores again to storage
    localStorage.setItem("allScores", JSON.stringify(scores));
    
    }

document.getElementById("submit-score").addEventListener("click", () => {
    saveScore();
    console.log("savedscore", userScore)
});

    // const saveScore = document.getElementById("save-score");
    //     // saveScore.innerText = `Your Total Score is ${score}`;
    //     // saveScore.style.display = 'block';



// console.log(saveScore.innerText);



            //todos...add correct answers for each question
            //add event that ends game after user goes through all questions
            //add high scores button

            // add correct/wrong displays for each outcome
            // formal each question
            // go back butt