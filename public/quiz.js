document.addEventListener("DOMContentLoaded", function () {
    const quizTabs = document.getElementById("quizTabs");
    const quizContent = document.getElementById("quizContent");

    fetch("quizData.json")
    .then(response => response.json())
    .then(quizzes => {
        console.log("Quiz Data Loaded:", quizzes); // ✅ Check if data is loading

        Object.keys(quizzes).forEach(category => {
            console.log("Creating button for:", category); // ✅ Check if buttons are being created

            const tabButton = document.createElement("button");
            tabButton.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            tabButton.classList.add("tab-button");
            tabButton.dataset.category = category;

            tabButton.addEventListener("click", function () {
                loadQuiz(category, quizzes);
            });

            quizTabs.appendChild(tabButton);
        });

        // Load first category
        const firstCategory = Object.keys(quizzes)[0];
        if (firstCategory) {
            loadQuiz(firstCategory, quizzes);
        }
    })
    .catch(error => console.error("Error loading quiz data:", error));

    // Function to Load Quiz Questions
    function loadQuiz(category, quizzes) {
        quizContent.innerHTML = ""; // Clear previous questions

        if (!quizzes[category]) {
            console.error("Category not found:", category);
            return;
        }

        quizzes[category].forEach((quiz, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.innerHTML = `<p><strong>${index + 1}. ${quiz.question}</strong></p>`;

            const optionsContainer = document.createElement("div");
            optionsContainer.classList.add("options");

            quiz.options.forEach(option => {
                const button = document.createElement("button");
                button.textContent = option;
                button.classList.add("option-btn");

                button.addEventListener("click", function () {
                    alert(option === quiz.answer ? "✅ Correct!" : `❌ Wrong! Correct: ${quiz.answer}`);
                });

                optionsContainer.appendChild(button);
            });

            questionDiv.appendChild(optionsContainer);
            quizContent.appendChild(questionDiv);
        });
    }
});
