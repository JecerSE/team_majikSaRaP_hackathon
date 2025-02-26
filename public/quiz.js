document.addEventListener("DOMContentLoaded", function () {
    const quizTabs = document.getElementById("quizTabs");
    const quizContent = document.getElementById("quizContent");
    const resultDisplay = document.createElement("div");
    resultDisplay.id = "resultDisplay";
    quizContent.appendChild(resultDisplay);

    if (!quizTabs || !quizContent) {
        console.error("Missing required elements.");
        return;
    }

    // Fetch quiz data from JSON file
    fetch("quizData.json")
        .then(response => response.json())
        .then(quizzes => {
            function loadQuiz(category) {
                quizContent.innerHTML = "";
                
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
                            resultDisplay.innerHTML = option === quiz.answer 
                                ? `<p class="correct">✅ Correct!</p>` 
                                : `<p class="incorrect">❌ Wrong! The correct answer is: <strong>${quiz.answer}</strong></p>`;
                        });

                        optionsContainer.appendChild(button);
                    });

                    questionDiv.appendChild(optionsContainer);
                    quizContent.appendChild(questionDiv);
                });

                quizContent.appendChild(resultDisplay);
            }

            for (let category in quizzes) {
                const tabButton = document.createElement("button");
                tabButton.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                tabButton.classList.add("tab");

                tabButton.addEventListener("click", function () {
                    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
                    this.classList.add("active");
                    loadQuiz(category);
                });

                quizTabs.appendChild(tabButton);
            }

            const firstCategory = Object.keys(quizzes)[0];
            if (firstCategory) {
                loadQuiz(firstCategory);
            }
        })
        .catch(error => console.error("Error loading quiz data:", error));
});
