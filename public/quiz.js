document.addEventListener("DOMContentLoaded", async function () {
    let currentQuestionIndex = 0;
    let score = { Science: 0, Math: 0, Social: 0, Language: 0, Random: 0 }; // Track score per subject
    let currentSubject = "Science"; // Default subject
    let questions = [];

    // Fetch questions
    async function loadQuestions(subject) {
        try {
            const response = await fetch("/quizData.json");
            const data = await response.json();
            questions = data[subject] || [];
            currentQuestionIndex = 0;
            currentSubject = subject;
            score[subject] = 0; // Reset score for new subject
            showQuestion();
        } catch (error) {
            console.error("Error loading quiz data:", error);
        }
    }

    // Show a single question
    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            document.getElementById("quiz-container").innerHTML = `<h2>Quiz Completed!</h2>
                <p>Your Score for ${currentSubject}: ${score[currentSubject]}</p>`;
            return;
        }

        let question = questions[currentQuestionIndex];
        let quizContainer = document.getElementById("quiz-container");
        
        // Create question HTML
        quizContainer.innerHTML = `
            <h3>${question.question}</h3>
            <div id="options">
                ${question.options.map(option => `<button class="option-btn">${option}</button>`).join("")}
            </div>
        `;

        // Add click event for answers
        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                if (this.innerText === question.correct) {
                    score[currentSubject]++; // Increase score if correct
                }
                currentQuestionIndex++;
                showQuestion(); // Load next question
            });
        });
    }

    // Category buttons event listener
    document.querySelectorAll(".subject-btn").forEach(button => {
        button.addEventListener("click", function () {
            loadQuestions(this.innerText); // Load selected subject
        });
    });

    // Load default subject (Science)
    loadQuestions("Science");
});
