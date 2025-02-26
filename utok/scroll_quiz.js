document.addEventListener("DOMContentLoaded", () => {
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-question");

    // AI GEN QUESTION WILL REPLACE THIS AND IDK HOW - jess
    const quizData = [
        {
            question: "who is the best player in league of legends",
            options: ["Caps", "Chovy", "Faker", "TheShy"],
            answer: "Faker"
        },
        {
            question: "Which Player is not in Los Ratones Starting Roster",
            options: ["TheBausffs", "Caedrel", "Crownie", "Nemesis"],
            answer: "Caedrel"
        }
    ];

    let currentQuestionIndex = 0;
    let selectedAnswer = null;

    function loadQuestion(index) {
        if (index >= quizData.length) {
            redirectAfterQuiz();
            return;
        }

        const question = quizData[index];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = "";
        selectedAnswer = null; // Reset selected answer

        question.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-button");
            button.addEventListener("click", () => selectAnswer(option, button));
            optionsContainer.appendChild(button);
        });

        nextButton.disabled = true; 
    }

    function selectAnswer(answer, button) {
        selectedAnswer = answer;
        nextButton.disabled = false; 
        document.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    }

    nextButton.addEventListener("click", () => {
        if (selectedAnswer === null) return; // Prevent clicking "Next" without selecting an answer skems

        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            redirectAfterQuiz();
        }
    });

    function redirectAfterQuiz() {
        alert("Quiz completed! Redirecting...");
        window.location.href = "index.html";  
    }

    loadQuestion(currentQuestionIndex);
});