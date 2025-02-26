document.addEventListener("DOMContentLoaded", async function () {
    let currentQuestionIndex = 0;
    let score = { Science: 0, Math: 0, Social: 0, Language: 0, Random: 0 }; 
    let currentSubject = "Science"; 
    let questions = [];

    const quizContainer = document.getElementById("quiz-container"); // Corrected ID
    const subjectButtons = document.querySelectorAll(".subject-btn");

    async function loadQuestions(subject) {
        try {
            const response = await fetch("quizData.json"); // Ensure the path is correct
            const data = await response.json();

            console.log("Loaded Data:", data); // Fixed variable name
            console.log("Subject:", subject, "Questions:", data[subject]); // Debugging

            questions = data[subject] || []; // Get only the selected subject
            currentQuestionIndex = 0;
            currentSubject = subject;

            if (questions.length === 0) {
                quizContainer.innerHTML = `<p>No questions available for ${subject}.</p>`;
                return;
            }

            showQuestion();
        } catch (error) {
            console.error("Error loading quiz data:", error);
            quizContainer.innerHTML = `<p>Failed to load quiz data. Please try again later.</p>`;
        }
    }
    console.log("Science Questions:", quizData.science);
    console.log("Loaded Data:", quizData);
    console.log("Science Questions:", quizData?.science);

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
                const selectedAnswer = parseInt(this.dataset.index); // Ensure it's a number
                if (questionData.correctIndex === selectedAnswer) {
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
