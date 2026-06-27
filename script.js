// ===== VARIABLES =====
let selectedCourse = [];
let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 1800;
let timer;

// ===== START QUIZ =====
function startQuiz() {
  const name = document.getElementById("studentName").value.trim();
  const course = document.getElementById("course").value;

  if (name === "" || course === "") {
    alert("Please enter your name and select a course.");
    return;
  }

  document.getElementById("displayName").textContent = name;
  document.getElementById("displayCourse").textContent = course;

  selectedCourse = getCourse(course);

  if (!selectedCourse || selectedCourse.length === 0) {
    alert("No questions available for this course.");
    return;
  }

  currentQuestion = 0;
  userAnswers = new Array(selectedCourse.length).fill(null);
  timeLeft = 1800;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  startTimer();
  showQuestion();
}

// ===== TIMER =====
function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
      `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft === 120) {
      alert("⚠️ Hurry! Only 2 minutes remaining.");
    }

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

// ===== SHOW QUESTION =====
function showQuestion() {
  const q = selectedCourse[currentQuestion];

  document.getElementById("question-number").textContent =
    `Question ${currentQuestion + 1} of ${selectedCourse.length}`;

  document.getElementById("question").textContent = q.question;

  let progress =
    ((currentQuestion + 1) / selectedCourse.length) * 100;

  document.getElementById("progress-bar").style.width =
    progress + "%";

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.classList.add("option");

    if (userAnswers[currentQuestion] === index) {
      div.classList.add("selected");
    }

    div.textContent =
      String.fromCharCode(65 + index) + ". " + option;

    div.onclick = function () {
      userAnswers[currentQuestion] = index;
      showQuestion();
    };

    optionsDiv.appendChild(div);
  });
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  if (currentQuestion < selectedCourse.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

// ===== PREVIOUS QUESTION =====
function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// ===== SUBMIT QUIZ =====
function submitQuiz() {
  clearInterval(timer);

  let score = 0;

  selectedCourse.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  let percentage =
    Math.round((score / selectedCourse.length) * 100);

  let message = "";

  if (percentage >= 90) {
    message = "🎉 Excellent!";
  } else if (percentage >= 70) {
    message = "👍 Very Good!";
  } else if (percentage >= 50) {
    message = "📚 Good, Keep Practicing!";
  } else {
    message = "💪 More Practice Needed!";
  }

  localStorage.setItem(
    "lastResult",
    JSON.stringify({
      name: document.getElementById("studentName").value,
      course: document.getElementById("course").value,
      score,
      percentage
    })
  );

  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("resultName").textContent =
    "Candidate: " +
    document.getElementById("studentName").value;

  document.getElementById("resultCourse").textContent =
    "Course: " +
    document.getElementById("course").value;

  document.getElementById("score").innerHTML =
    `Score: ${score}/${selectedCourse.length}
     <br>
     Percentage: ${percentage}%
     <br><br>
     ${message}`;
}

// ===== REVIEW ANSWERS =====
function reviewAnswers() {
  const review = document.getElementById("reviewBox");
  review.innerHTML = "";

  selectedCourse.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("review-item");

    const user =
      userAnswers[i] !== null
        ? q.options[userAnswers[i]]
        : "No Answer";

    const correct = q.options[q.answer];

    div.innerHTML = `
      <h4>Question ${i + 1}</h4>
      <p>${q.question}</p>
      <p>Your Answer: ${user}</p>
      <p class="correct">
        Correct Answer: ${correct}
      </p>
    `;

    review.appendChild(div);
  });
}

// ===== GET COURSE =====
function getCourse(course) {
  return {
    GST112,
    MTH132,
    PHY102,
    CSC104,
    CSC122,
    COS102
  }[course];
}

// ===== SHOW PREVIOUS RESULT =====
window.onload = function () {
  let result = JSON.parse(
    localStorage.getItem("lastResult")
  );

  if (result) {
    document.getElementById("previousResult").innerHTML = `
      <h3>Previous Result</h3>
      <p>Name: ${result.name}</p>
      <p>Course: ${result.course}</p>
      <p>Score: ${result.score}/50</p>
      <p>Percentage: ${result.percentage}%</p>
    `;
  }
};
const GST112 = [
  {
    question: "Nigeria is located on the ______ coast of West Africa.",
    options: ["Eastern", "Southern", "Western", "Northern"],
    answer: 2
  },
  {
    question: "The three major ethnic groups in Nigeria are:",
    options: [
      "Tiv, Nupe and Kanuri",
      "Hausa-Fulani, Yoruba and Igbo",
      "Igala, Edo and Ibibio",
      "Fulani, Tiv and Efik"
    ],
    answer: 1
  },
  {
    question: "Culture can best be defined as:",
    options: [
      "A country's economy",
      "People's inherited wealth",
      "The total way of life of a people",
      "Political activities of a nation"
    ],
    answer: 2
  },
  {
    question: "The official language of Nigeria is:",
    options: ["Hausa", "Yoruba", "Igbo", "English"],
    answer: 3
  },
  {
    question: "The process of teaching and learning is known as:",
    options: [
      "Communication",
      "Education",
      "Socialization",
      "Civilization"
    ],
    answer: 1
  },
  {
    question: "The Hausa-Fulani people predominantly occupied the ______ region of Nigeria during the pre-colonial era.",
    options: ["Southern", "Eastern", "Northern", "Western"],
    answer: 2
  },
  {
    question: "The Yoruba traditional political system was mainly headed by:",
    options: ["Emir", "Oba", "Obi", "Attah"],
    answer: 1
  },
  {
    question: "One major importance of studying Nigerian cultures is to:",
    options: [
      "Promote tribalism",
      "Encourage religious conflict",
      "Foster national unity",
      "Encourage colonialism"
    ],
    answer: 2
  },
  {
    question: "The culture area that consists mainly of Igbo-speaking communities is the:",
    options: [
      "Northern Culture Area",
      "Western Culture Area",
      "Middle Belt Culture Area",
      "South-Eastern Culture Area"
    ],
    answer: 3
  },
  {
    question: "Which of the following religions existed in Nigeria before colonial rule?",
    options: [
      "Christianity only",
      "Islam only",
      "African Traditional Religion only",
      "African Traditional Religion and Islam"
    ],
    answer: 3
  },
  {
    question: "One major contribution of education to national development is:",
    options: [
      "Increased illiteracy",
      "Human capital development",
      "Ethnic conflicts",
      "Cultural backwardness"
    ],
    answer: 1
  },
  {
    question: "Social justice refers to:",
    options: [
      "Unequal treatment of citizens",
      "Political dominance by one ethnic group",
      "Fairness and equal opportunities for all citizens",
      "Religious superiority"
    ],
    answer: 2
  },
  {
    question: "Which of the following best describes pre-colonial Nigerian societies?",
    options: [
      "They had no systems of government",
      "They lacked economic activities",
      "They possessed organized political and socio-economic institutions",
      "They were entirely dependent on Europe"
    ],
    answer: 2
  },
  {
    question: "The concept of culture areas in Nigeria is mainly based on:",
    options: [
      "Geological formations",
      "Similar cultural traits and patterns",
      "Political parties",
      "Climatic conditions alone"
    ],
    answer: 1
  },
  {
    question: "Which of the following is a major obstacle to national development in Nigeria?",
    options: [
      "Patriotism",
      "Quality education",
      "Ethnic and religious intolerance",
      "Technological advancement"
    ],
    answer: 2
  },
  {
    question: "The moral rights of Nigerian citizens include the right to:",
    options: [
      "Oppress others",
      "Participate responsibly in society",
      "Deny others their rights",
      "Encourage corruption"
    ],
    answer: 1
  },
  {
    question: "Which of the following constitutional rights is classified as a socio-political right?",
    options: [
      "Right to private revenge",
      "Right to participate in governance",
      "Right to discriminate",
      "Right to ethnic supremacy"
    ],
    answer: 1
  },
  {
    question: "Religion contributes to national development primarily through:",
    options: [
      "Promoting moral values and social cohesion",
      "Encouraging political instability",
      "Supporting corruption",
      "Discouraging education"
    ],
    answer: 0
  },
  {
    question: "The Nigerian economy in pre-colonial times was largely characterized by:",
    options: [
      "Oil exploration only",
      "Manufacturing industries only",
      "Agriculture, trade and crafts",
      "Banking activities only"
    ],
    answer: 2
  },
  {
    question: "Historical analysis of social justice in Nigeria reveals that national development is best achieved when:",
    options: [
      "Resources are controlled by one group",
      "Citizens are denied opportunities",
      "Justice, equity and inclusiveness are promoted",
      "Political rights are restricted"
    ],
    answer: 2
  },
{
  question: "Nigeria gained independence in:",
  options: ["1957", "1960", "1963", "1979"],
  answer: 1
  },
{
  question: "The capital city of Nigeria is:",
  options: ["Lagos", "Abuja", "Kaduna", "Ibadan"],
  answer: 1
  },
{
  question: "Nigeria operates a ______ system of government.",
  options: ["Unitary", "Confederal", "Federal", "Monarchical"],
  answer: 2
},
{
  question: "The highest law in Nigeria is the:",
  options: ["National Anthem", "Constitution", "Electoral Act", "Penal Code"],
  answer: 1
},
{
  question: "Citizenship by birth is acquired through:",
  options: ["Marriage", "Naturalization", "Being born to Nigerian parents", "Registration"],
  answer: 2
},
{
  question: "Democracy simply means:",
  options: ["Rule by soldiers", "Rule by the people", "Rule by kings", "Rule by judges"],
  answer: 1
},
{
  question: "The green colour in the Nigerian flag represents:",
  options: ["Peace", "Agriculture", "Unity", "Religion"],
  answer: 1
},
{
  question: "The white colour in the Nigerian flag symbolizes:",
  options: ["Peace", "Strength", "Justice", "Unity"],
  answer: 0
},
{
  question: "The legislative arm of government is responsible for:",
  options: ["Making laws", "Executing laws", "Interpreting laws", "Conducting elections"],
  answer: 0
},
{
  question: "The executive arm of government is headed by the:",
  options: ["Chief Justice", "President", "Speaker", "Senate President"],
  answer: 1
},
{
  question: "The judiciary is responsible for:",
  options: ["Making laws", "Executing laws", "Interpreting laws", "Collecting taxes"],
  answer: 2
},
{
  question: "The Nigerian National Anthem encourages citizens to:",
  options: ["Promote violence", "Serve the nation", "Travel abroad", "Ignore authority"],
  answer: 1
},
{
  question: "One duty of every Nigerian citizen is to:",
  options: ["Evade taxes", "Obey the law", "Destroy public property", "Promote corruption"],
  answer: 1
},
{
  question: "The Independent National Electoral Commission (INEC) is responsible for:",
  options: ["Printing money", "Conducting elections", "Making laws", "Collecting taxes"],
  answer: 1
},
{
  question: "The first military coup in Nigeria took place in:",
  options: ["1960", "1963", "1966", "1975"],
  answer: 2
},
{
  question: "Which of these is a fundamental human right?",
  options: ["Right to life", "Right to steal", "Right to corruption", "Right to discrimination"],
  answer: 0
},
{
  question: "One objective of national integration is to:",
  options: ["Promote tribalism", "Promote national unity", "Encourage discrimination", "Create conflicts"],
  answer: 1
},
{
  question: "The Nigerian Coat of Arms contains:",
  options: ["One horse", "Two horses", "Three lions", "Four stars"],
  answer: 1
},
{
  question: "The black shield on the Nigerian Coat of Arms represents:",
  options: ["Strength", "Fertile soil", "Peace", "Justice"],
  answer: 1
},
{
  question: "One major factor that promotes national development is:",
  options: ["Corruption", "Good leadership", "Ethnic conflict", "Religious intolerance"],
  answer: 1
},
{
  question: "The slogan 'Unity and Faith, Peace and Progress' is Nigeria's:",
  options: ["National Anthem", "National Motto", "National Pledge", "Constitution"],
  answer: 1
},
{
  question: "Which of the following promotes peaceful coexistence?",
  options: ["Religious intolerance", "Respect for diversity", "Ethnic rivalry", "Violence"],
  answer: 1
},
{
  question: "The Nigerian Constitution guarantees freedom of:",
  options: ["Oppression", "Expression", "Corruption", "Violence"],
  answer: 1
},
{
  question: "The voting age in Nigeria is:",
  options: ["16 years", "18 years", "20 years", "21 years"],
  answer: 1
},
{
  question: "National values include:",
  options: ["Dishonesty", "Patriotism", "Tribalism", "Corruption"],
  answer: 1
},
{
  question: "One importance of civic education is to:",
  options: ["Encourage lawlessness", "Develop responsible citizens", "Promote corruption", "Discourage education"],
  answer: 1
},
{
  question: "A responsible citizen should protect:",
  options: ["Public property", "Only personal property", "Foreign property", "No property"],
  answer: 0
},
{
  question: "One consequence of corruption is:",
  options: ["National development", "Economic decline", "Political stability", "Increased productivity"],
  answer: 1
},
{
  question: "The primary aim of government is to:",
  options: ["Oppress citizens", "Provide security and welfare", "Promote tribalism", "Encourage injustice"],
  answer: 1
},
{
  question: "Respect for the rule of law means:",
  options: ["Everyone is above the law", "Everyone is equal before the law", "Only leaders obey the law", "Only judges obey the law"],
  answer: 1
},
];
const MTH132 = [
  {
    question: "A function from set A to set B assigns:",
    options: [
      "More than one element of B to each element of A",
      "Exactly one element of B to each element of A",
      "No element of B to some elements of A",
      "All elements of B to one element of A"
    ],
    answer: 1
  },
  {
    question: "The domain of the function f(x) = 1/(x - 2) is:",
    options: [
      "All real numbers",
      "x ≠ 0",
      "x ≠ 2",
      "x = 2"
    ],
    answer: 2
  },
  {
    question: "Evaluate lim(x→2)(x + 3).",
    options: ["2", "3", "5", "6"],
    answer: 2
  },
  {
    question: "Find the derivative of y = x³.",
    options: ["x²", "2x", "3x²", "3x"],
    answer: 2
  },
  {
    question: "Evaluate ∫4x dx.",
    options: [
      "2x² + C",
      "4x + C",
      "x² + C",
      "8x + C"
    ],
    answer: 0
  },
  {
    question: "The function f(x) = 2x + 1 is:",
    options: [
      "Constant",
      "Quadratic",
      "Linear",
      "Exponential"
    ],
    answer: 2
  },
  {
    question: "Evaluate lim(x→3)(x² + 1).",
    options: ["8", "9", "10", "12"],
    answer: 2
  },
  {
    question: "A function is continuous at x = a if:",
    options: [
      "f(a) does not exist",
      "The limit does not exist",
      "lim(x→a)f(x) = f(a)",
      "f(a) = 0"
    ],
    answer: 2
  },
  {
    question: "Find the derivative of f(x) = 5x⁴.",
    options: [
      "20x³",
      "5x³",
      "4x⁵",
      "20x⁴"
    ],
    answer: 0
  },
  {
    question: "The slope of a curve at a point is obtained by:",
    options: [
      "Integration",
      "Differentiation",
      "Factorization",
      "Approximation"
    ],
    answer: 1
  },
  {
    question: "Evaluate ∫(3x² + 2) dx.",
    options: [
      "x³ + 2x + C",
      "3x³ + 2x + C",
      "x³ + x + C",
      "6x + 2 + C"
    ],
    answer: 0
  },
  {
    question: "Evaluate ∫₀² x dx.",
    options: ["1", "2", "3", "4"],
    answer: 1
  },
  {
    question: "Find the derivative of y = (2x + 1)⁵.",
    options: [
      "10(2x + 1)⁴",
      "5(2x + 1)⁴",
      "2(2x + 1)⁵",
      "20(2x + 1)⁵"
    ],
    answer: 0
  },
  {
    question: "Evaluate lim(x→1)[(x² − 1)/(x − 1)].",
    options: ["0", "1", "2", "3"],
    answer: 2
  },
  {
    question: "If y = 3x² − 4x + 7, find dy/dx.",
    options: [
      "6x − 4",
      "6x + 4",
      "3x − 4",
      "6x² − 4"
    ],
    answer: 0
  },
  {
    question: "The stationary points of a curve occur where:",
    options: [
      "dy/dx = 1",
      "dy/dx = 0",
      "y = 0",
      "x = 0"
    ],
    answer: 1
  },
  {
    question: "Evaluate ∫(2x + 5)² dx.",
    options: [
      "((2x + 5)³)/6 + C",
      "(2x + 5)³ + C",
      "((2x + 5)²)/2 + C",
      "2(2x + 5)³ + C"
    ],
    answer: 0
  },
  {
    question: "Find the distance between the points (1,2) and (4,6).",
    options: ["3", "4", "5", "6"],
    answer: 2
  },
  {
    question: "The equation of a circle with centre at the origin and radius 3 is:",
    options: [
      "x² + y² = 3",
      "x² + y² = 6",
      "x² + y² = 9",
      "x + y = 3"
    ],
    answer: 2
  },
  {
    question: "Find the area under y = x² from x = 0 to x = 2.",
    options: [
      "4/3",
      "8/3",
      "4",
      "8"
    ],
    answer: 1
  },
{
  question: "Differentiate y = x⁵.",
  options: ["5x⁴", "4x⁵", "5x⁵", "x⁴"],
  answer: 0
},
{
  question: "Evaluate ∫6x dx.",
  options: ["3x² + C", "6x + C", "x² + C", "12x + C"],
  answer: 0
},
{
  question: "The derivative of a constant is:",
  options: ["0", "1", "The constant", "Undefined"],
  answer: 0
},
{
  question: "The integral of 5 is:",
  options: ["5", "5x + C", "x + C", "25x"],
  answer: 1
},
{
  question: "Evaluate lim(x→0) x².",
  options: ["0", "1", "2", "Undefined"],
  answer: 0
},
{
  question: "Differentiate y = 7x.",
  options: ["1", "7", "7x", "0"],
  answer: 1
},
{
  question: "The graph of y = mx + c is a:",
  options: ["Circle", "Straight line", "Parabola", "Ellipse"],
  answer: 1
},
{
  question: "The slope of y = 4x + 2 is:",
  options: ["2", "4", "6", "1"],
  answer: 1
},
{
  question: "Find the derivative of sin x.",
  options: ["cos x", "-cos x", "tan x", "-sin x"],
  answer: 0
},
{
  question: "Find the derivative of cos x.",
  options: ["sin x", "-sin x", "cos x", "-cos x"],
  answer: 1
},
{
  question: "The derivative of eˣ is:",
  options: ["x", "1", "eˣ", "ln x"],
  answer: 2
},
{
  question: "Evaluate ∫2 dx.",
  options: ["2x + C", "x² + C", "2", "4x"],
  answer: 0
},
{
  question: "The gradient of a horizontal line is:",
  options: ["0", "1", "Undefined", "-1"],
  answer: 0
},
{
  question: "The gradient of a vertical line is:",
  options: ["0", "1", "Undefined", "-1"],
  answer: 2
},
{
  question: "Evaluate lim(x→1)(2x + 3).",
  options: ["4", "5", "6", "3"],
  answer: 1
},
{
  question: "Differentiate y = √x.",
  options: ["1/(2√x)", "√x", "2√x", "1/x"],
  answer: 0
},
{
  question: "The area under a curve is found using:",
  options: ["Differentiation", "Integration", "Matr
