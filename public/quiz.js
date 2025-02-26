document.addEventListener("DOMContentLoaded", async function () {
    let currentQuestionIndex = 0;
    let score = { Science: 0, Math: 0, Social: 0, Language: 0, Random: 0 };
    let currentSubject = "Science"; // Default subject
    let questions = [];

    const quizContainer = document.getElementById("quiz-container");
    const subjectButtons = document.querySelectorAll(".subject-btn");

    // Load questions from JSON
    async function loadQuestions(subject) {
        try {
            const response = await fetch("/quizData.json"); // Ensure correct path
            if (!response.ok) throw new Error("Failed to load quiz data");

            const data = await response.json();
            questions = data[subject]; // Load only the selected subject
            currentQuestionIndex = 0;
            currentSubject = subject;
            score[currentSubject] = 0;
            showQuestion();
        } catch (error) {
            console.error("Error loading quiz data:", error);
        }
    }

    // Show one question at a time
    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            quizContainer.innerHTML = `<h3>Quiz Completed! Score: ${score[currentSubject]}</h3>`;
            return;
        }

        const question = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <h2>${question.question}</h2>
            <div id="answers">
                ${question.answers.map((answer, index) => 
                    `<button class="answer-btn" data-index="${index}">${answer}</button>`
                ).join("")}
            </div>
        `;

        // Attach event listeners to answers
        document.querySelectorAll(".answer-btn").forEach(button => {
            button.addEventListener("click", checkAnswer);
        });
    }

    // Check answer and proceed
    function checkAnswer(event) {
        const selectedAnswerIndex = event.target.dataset.index;
        const correctAnswerIndex = questions[currentQuestionIndex].correctIndex;

        if (parseInt(selectedAnswerIndex) === correctAnswerIndex) {
            score[currentSubject]++;
        }

        currentQuestionIndex++;
        showQuestion();
    }

    // Attach event listeners to subject buttons
    subjectButtons.forEach(button => {
        button.addEventListener("click", () => {
            loadQuestions(button.dataset.subject);
        });
    });

    // Initial load (default subject)
    loadQuestions(currentSubject);
});
