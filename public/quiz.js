document.addEventListener("DOMContentLoaded", async function () {
    let currentQuestionIndex = 0;
    let score = { Science: 0, Math: 0, Social: 0, Language: 0, Random: 0 }; 
    let currentSubject = "Science";
    let questions = [];

    // Get elements
    const quizContainer = document.getElementById("quiz-container");
    const subjectButtons = document.querySelectorAll(".subject-btn");

    // Load questions from JSON
    async function loadQuestions(subject) {
        try {
            const response = await fetch("/quizData.json"); // Adjust if needed refer tme
            const data = await response.json();
            questions = data[subject] || []; // Load only the selected subject
            currentQuestionIndex = 0;
            currentSubject = subject;
            showQuestion();
        } catch (error) {
            console.error("Error loading quiz data:", error);
        }
    }

    // Show a single question at a time
    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            quizContainer.innerHTML = `<h2>Quiz Finished!</h2>
                <p>Your Score for ${currentSubject}: ${score[currentSubject]}</p>`;
            return;
        }

        const questionData = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <h2>${questionData.question}</h2>
            <div id="answers">
                ${questionData.options.map((option, index) => 
                    `<button class="answer-btn" data-index="${index}">${option}</button>`
                ).join("")}
            </div>
        `;

        document.querySelectorAll(".answer-btn").forEach(button => {
            button.addEventListener("click", function () {
                const selectedAnswer = this.dataset.index;
                if (questionData.correctIndex == selectedAnswer) {
                    score[currentSubject]++;
                }
                currentQuestionIndex++;
                showQuestion();
            });
        });
    }

    subjectButtons.forEach(button => {
        button.addEventListener("click", function () {
            loadQuestions(this.dataset.subject);
        });
    });

    loadQuestions(currentSubject);
});
