document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quizContainer");
    const quizTabs = document.getElementById("quizTabs");
    const quizContent = document.getElementById("quizContent");

    const quizzes = {
        science: [
            { question: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "HO"], answer: "H2O" },
            { question: "What planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
            { question: "What gas do plants absorb from the air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
            { question: "How many bones are in the human body?", options: ["206", "305", "150", "412"], answer: "206" },
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"], answer: "Mitochondria" },
            { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "500,000 km/s"], answer: "300,000 km/s" },
            { question: "Which element has the atomic number 1?", options: ["Oxygen", "Hydrogen", "Helium", "Carbon"], answer: "Hydrogen" },
            { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Brain"], answer: "Skin" },
            { question: "Which gas makes up the majority of Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: "Nitrogen" },
            { question: "What is the process of converting water into vapor called?", options: ["Condensation", "Evaporation", "Sublimation", "Precipitation"], answer: "Evaporation" }
        ],
        math: [
            { question: "What is 7 x 8?", options: ["54", "56", "64", "72"], answer: "56" },
            { question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9" },
            { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], answer: "30" },
            { question: "What is 12 squared?", options: ["124", "144", "134", "154"], answer: "144" },
            { question: "What is the value of pi rounded to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" },
            { question: "What is the next prime number after 7?", options: ["9", "10", "11", "13"], answer: "11" },
            { question: "What is 100 divided by 4?", options: ["20", "25", "30", "40"], answer: "25" },
            { question: "How many degrees are in a right angle?", options: ["45", "60", "90", "120"], answer: "90" },
            { question: "If a triangle has sides of 3 cm, 4 cm, and 5 cm, what type of triangle is it?", options: ["Scalene", "Isosceles", "Right", "Equilateral"], answer: "Right" },
            { question: "What is the result of 25 x 4?", options: ["50", "75", "100", "125"], answer: "100" }
        ],
        "social": [
            {"question": "Who was the first president of the United States?", "options": ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], "answer": "George Washington"},
            {"question": "What year did World War II end?", "options": ["1942", "1945", "1950", "1939"], "answer": "1945"},
            {"question": "What is the capital of France?", "options": ["Berlin", "Madrid", "Rome", "Paris"], "answer": "Paris"},
            {"question": "Which country is known as the Land of the Rising Sun?", "options": ["China", "Japan", "South Korea", "Thailand"], "answer": "Japan"},
            {"question": "What year did the American Civil War end?", "options": ["1860", "1865", "1870", "1880"], "answer": "1865"},
            {"question": "Who wrote the Declaration of Independence?", "options": ["James Madison", "Thomas Jefferson", "Alexander Hamilton", "Benjamin Franklin"], "answer": "Thomas Jefferson"},
            {"question": "What is the longest river in the world?", "options": ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], "answer": "Nile River"},
            {"question": "Which ancient civilization built the pyramids?", "options": ["Romans", "Greeks", "Egyptians", "Mayans"], "answer": "Egyptians"},
            {"question": "What is the largest continent on Earth?", "options": ["North America", "Asia", "Africa", "Europe"], "answer": "Asia"},
            {"question": "Who was the leader of the Soviet Union during World War II?", "options": ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Mikhail Gorbachev"], "answer": "Joseph Stalin"}
        ],
        "language": [
            {"question": "What is the plural of 'mouse'?", "options": ["Mouses", "Mice", "Mices", "Mouse"], "answer": "Mice"},
            {"question": "Which language is spoken in Brazil?", "options": ["Spanish", "French", "Portuguese", "Italian"], "answer": "Portuguese"},
            {"question": "What does 'bonjour' mean in French?", "options": ["Hello", "Goodbye", "Thank you", "Please"], "answer": "Hello"},
            {"question": "Which language is primarily spoken in Egypt?", "options": ["Arabic", "French", "Hebrew", "Persian"], "answer": "Arabic"},
            {"question": "What is the official language of Russia?", "options": ["Polish", "Ukrainian", "Russian", "Kazakh"], "answer": "Russian"},
            {"question": "Which of these languages is NOT written from right to left?", "options": ["Arabic", "Hebrew", "Japanese", "Persian"], "answer": "Japanese"},
            {"question": "What does 'gracias' mean in Spanish?", "options": ["Sorry", "Please", "Thank you", "Hello"], "answer": "Thank you"},
            {"question": "Which language uses Kanji characters?", "options": ["Korean", "Japanese", "Thai", "Vietnamese"], "answer": "Japanese"},
            {"question": "What language is spoken in most of South America?", "options": ["Portuguese", "English", "Spanish", "French"], "answer": "Spanish"},
            {"question": "Which language is known as the 'language of love'?", "options": ["Italian", "Spanish", "French", "Portuguese"], "answer": "French"}
        ],
        "random": [
            {"question": "What year did the first iPhone release?", "options": ["2005", "2007", "2010", "2012"], "answer": "2007"},
            {"question": "Which planet has the most moons?", "options": ["Jupiter", "Saturn", "Neptune", "Mars"], "answer": "Jupiter"},
            {"question": "What is the rarest blood type?", "options": ["O-", "AB-", "A-", "B+"], "answer": "AB-"},
            {"question": "Who painted the famous artwork 'The Starry Night'?", "options": ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet"], "answer": "Vincent van Gogh"},
            {"question": "What is the smallest country in the world?", "options": ["Monaco", "Vatican City", "Liechtenstein", "San Marino"], "answer": "Vatican City"},
            {"question": "What does 'HTTP' stand for in a website address?", "options": ["Hyperlink Transfer Text Protocol", "High-Tech Transfer Protocol", "Hyper Text Transfer Protocol", "Hyper Transfer Text Program"], "answer": "Hyper Text Transfer Protocol"},
            {"question": "What is the main ingredient in traditional Japanese miso soup?", "options": ["Seaweed", "Tofu", "Miso paste", "Soy sauce"], "answer": "Miso paste"},
            {"question": "In which sport would you perform a 'slam dunk'?", "options": ["Soccer", "Basketball", "Tennis", "Volleyball"], "answer": "Basketball"},
            {"question": "Which animal is known for having the longest lifespan?", "options": ["African Elephant", "Bowhead Whale", "Giant Tortoise", "Greenland Shark"], "answer": "Greenland Shark"},
            {"question": "What is the name of the world's largest ocean?", "options": ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"], "answer": "Pacific Ocean"}
        ]
    }
    

    function loadQuiz(category) {
        quizContent.innerHTML = "";
        if (!quizzes[category]) return;
        quizzes[category].forEach((quiz, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.innerHTML = `<p>${quiz.question}</p>`;

            quiz.options.forEach(option => {
                const button = document.createElement("button");
                button.textContent = option;
                button.onclick = function () {
                    if (option === quiz.answer) {
                        alert("Correct!");
                    } else {
                        alert("Wrong! The correct answer is: " + quiz.answer);
                    }
                };
                questionDiv.appendChild(button);
            });
            quizContent.appendChild(questionDiv);
        });
    }

    for (let category in quizzes) {
        const tabButton = document.createElement("button");
        tabButton.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        tabButton.classList.add("tab");
        tabButton.onclick = function () {
            loadQuiz(category);
        };
        quizTabs.appendChild(tabButton);
    }

    const firstCategory = Object.keys(quizzes)[0];
    if (firstCategory) {
        loadQuiz(firstCategory);
    }
});
