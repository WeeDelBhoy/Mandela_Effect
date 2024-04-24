//Store correct answers
var correctAnswers = {
    "q1": "Answer2",
    "q2": "Answer1",
    "q3": "Answer1",
    "q4": "Answer2",
    "q5": "Answer4",
    "q6": "Answer2",
    "q7": "Answer4",
    "q8": "Answer3",
    "q9": "Answer3",
    "q10": "Answer1"
};

//Function to calculate the score
function calculateScore() {
    var totalScore = 0;
    var answeredQuestions = 0;

    //Loop through each question and retrieve answers
    for (var i = 1; i <= 10; i++) {
        var userAnswer = localStorage.getItem("q" + i);

        //Check if question was answered
        if (userAnswer) {
            answeredQuestions++; //Increment answered questions

            //Check if the users answer matches the correct answer
            if (userAnswer === correctAnswers["q" + i]) {
                totalScore++; //Increment total score if correct
            }
        }
    }

    return { totalScore: totalScore, answeredQuestions: answeredQuestions };
}

//Function to display the final score
function displayFinalScore(score) {
    var finalScoreElement = document.getElementById("final-score");
    if (finalScoreElement) {
        finalScoreElement.textContent = "Your final score: " + score.totalScore + " out of 10";
    }
}

//Function to save the selected answer to localStorage
function saveAnswer(questionId, answer) {
    localStorage.setItem(questionId, answer);
}

//Function to check if any radio button for a specific question is checked
function isAnyRadioButtonChecked(questionId) {
    var radioButtons = document.querySelectorAll('input[name="' + questionId + '"]');
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return true;
        }
    }
    return false;
}

document.addEventListener("DOMContentLoaded", function() {
    //Added onchange event listener to all radio buttons to save the selected answers as it wasnt doing it without it
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener("change", function() {
            var questionId = this.name;
            var answer = this.value;
            saveAnswer(questionId, answer);
        });
    });

    //Add event listeners to next question links to make sure user gives answer
    var nextQuestionLinks = document.querySelectorAll(".next-question");
    nextQuestionLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            var currentQuestion = this.getAttribute("data-question");
            if (!isAnyRadioButtonChecked(currentQuestion)) {
                event.preventDefault(); //Prevent following the link
                alert("Please select an answer before proceeding to the next question.");
            }
        });
    });

    //Add event listener for the submit button (different for the last question)
    var submitButton = document.getElementById("submit-btn");
    if (submitButton) {
        submitButton.addEventListener("click", function() {
            if (!isAnyRadioButtonChecked("q10")) {
                alert("Please select an answer before submitting.");
            } else {
                //Calculate the score
                var finalScore = calculateScore();
                //Display the final score
                displayFinalScore(finalScore);
                //Redirect to the final score page
                window.location.href = "Final_Score.html";
            }
        });
    }
});