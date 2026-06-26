// ===== GST QUESTIONS =====
const questions = [
  {
    question: "The study of the way of life of a people is known as:",
    options: ["Government", "Culture", "Economy", "Politics"],
    answer: 1
  },

  {
    question: "Which of the following is NOT an element of culture?",
    options: ["Language", "Religion", "Technology", "Rainfall"],
    answer: 3
  },

  {
    question: "Nigeria became independent on:",
    options: [
      "October 1, 1958",
      "October 1, 1960",
      "October 1, 1963",
      "January 15, 1966"
    ],
    answer: 1
  },

  {
    question: "The amalgamation of Northern and Southern Protectorates took place in:",
    options: ["1910", "1914", "1922", "1960"],
    answer: 1
  },

  {
    question: "Who carried out the amalgamation of Nigeria in 1914?",
    options: [
      "Nnamdi Azikiwe",
      "Obafemi Awolowo",
      "Lord Lugard",
      "Tafawa Balewa"
    ],
    answer: 2
  },

  {
    question: "The three major ethnic groups in Nigeria are:",
    options: [
      "Igbo, Ibibio and Tiv",
      "Hausa, Yoruba and Fulani",
      "Hausa-Fulani, Yoruba and Igbo",
      "Fulani, Tiv and Nupe"
    ],
    answer: 2
  },

  {
    question: "National integration means:",
    options: [
      "Division among citizens",
      "Unity among different groups in a nation",
      "Political competition",
      "Economic dependency"
    ],
    answer: 1
  },

  {
    question: "The agency responsible for youth service and national unity in Nigeria is:",
    options: ["EFCC", "NAFDAC", "NYSC", "INEC"],
    answer: 2
  },

  {
    question: "The official language of Nigeria is:",
    options: ["Hausa", "Igbo", "Yoruba", "English"],
    answer: 3
  },

  {
    question: "Social justice promotes:",
    options: [
      "Discrimination",
      "Equal treatment and fairness",
      "Tribalism",
      "Corruption"
    ],
    answer: 1
  },

  {
    question: "Which of these is an example of tangible culture?",
    options: [
      "Beliefs",
      "Customs",
      "Traditional attire",
      "Values"
    ],
    answer: 2
  },

  {
    question: "The process by which people learn their culture is called:",
    options: [
      "Civilization",
      "Socialization",
      "Industrialization",
      "Globalization"
    ],
    answer: 1
  },

  {
    question: "Which factor contributed to the evolution of Nigeria as a political unit?",
    options: [
      "Colonial administration",
      "Climate change",
      "Sports activities",
      "Tourism"
    ],
    answer: 0
  },

  {
    question: "The first Prime Minister of Nigeria was:",
    options: [
      "Obafemi Awolowo",
      "Nnamdi Azikiwe",
      "Tafawa Balewa",
      "Yakubu Gowon"
    ],
    answer: 2
  },

  {
    question: "Nigeria became a republic in:",
    options: ["1960", "1963", "1966", "1979"],
    answer: 1
  },

  {
    question: "Which of these encourages national development?",
    options: [
      "Corruption",
      "Ethnic conflict",
      "Unity and patriotism",
      "Religious intolerance"
    ],
    answer: 2
  },

  {
    question: "A society is best defined as:",
    options: [
      "A group of animals",
      "A collection of buildings",
      "People living together and sharing common values",
      "A political party"
    ],
    answer: 2
  },

  {
    question: "Which of the following is a challenge to national integration in Nigeria?",
    options: [
      "Patriotism",
      "Education",
      "Ethnic prejudice",
      "Sports"
    ],
    answer: 2
  },

  {
    question: "The National Youth Service Corps (NYSC) scheme was established in:",
    options: ["1960", "1966", "1973", "1999"],
    answer: 2
  },

  {
    question: "One major importance of studying Nigerian Peoples and Culture is to:",
    options: [
      "Encourage tribalism",
      "Promote national unity and understanding",
      "Increase political crises",
      "Discourage cultural diversity"
    ],
    answer: 1
  }
];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const quizBox = document.querySelector(".quiz-box");
const timer = document.getElementById("timer");

// ===== TIMER =====
let timeLeft = 600; // 10 minutes

const countdown = setInterval(() => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  timer.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(countdown);
    showResult();
  }
}, 1000);

// ===== LOAD QUESTION =====
function loadQuestion() {
  const q = questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = q.question;

  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");

    btn.classList.add("option");
    btn.textContent =
      String.fromCharCode(65 + index) + ". " + option;

    btn.onclick = function () {
      document
        .querySelectorAll(".option")
        .forEach(btn =>
          btn.classList.remove("selected")
        );

      btn.classList.add("selected");
      userAnswers[currentQuestion] = index;
    };

    optionsDiv.appendChild(btn);
  });

  if (currentQuestion === questions.length - 1) {
    nextBtn.textContent = "Submit Quiz";
  } else {
    nextBtn.textContent = "Next ➜";
  }
}

// ===== NEXT BUTTON =====
nextBtn.addEventListener("click", () => {

  if (userAnswers[currentQuestion] === undefined) {
    alert("Please select an answer.");
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ===== SHOW RESULT =====
function showResult() {

  clearInterval(countdown);

  quizBox.style.display = "none";
  resultDiv.classList.remove("hidden");

  let review = "";
  score = 0;

  questions.forEach((q, index) => {

    const user = userAnswers[index];
    const correct = q.answer;

    if (user === correct) {
      score++;
    }

    review += `
      <div class="review">
        <p><strong>Question ${index + 1}</strong></p>
        <p>${q.question}</p>

        <p>
          Your Answer:
          ${user !== undefined
            ? q.options[user]
            : "No Answer"}
        </p>

        <p>
          Correct Answer:
          ${q.options[correct]}
        </p>
      </div>
    `;
  });

  resultDiv.innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>

    <p>
      ${
        score >= 16
          ? "Excellent Performance! 🎉"
          : score >= 10
          ? "Very Good! Keep Practising. 👍"
          : "Needs Improvement. Keep Studying. 📚"
      }
    </p>

    ${review}

    <br>

    <button class="retry-btn"
      onclick="location.reload()">
      Retake Quiz
    </button>
  `;
}

// START QUIZ
loadQuestion();