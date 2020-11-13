const quizData = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Vehicles",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which Italian city is home of the car manufacturer &#039;Fiat&#039;?",
    correct_answer: "Turin",
    incorrect_answers: ["Maranello", "Modena", "Rome"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "Red Vines is a brand of what type of candy?",
    correct_answer: "Licorice",
    incorrect_answers: ["Lollipop", "Chocolate", "Bubblegum"],
  },
  {
    category: "Entertainment: Cartoon & Animations",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the Pixar film, &quot;Toy Story&quot; what was the name of the child who owned the toys?",
    correct_answer: "Andy",
    incorrect_answers: ["Edward", "Danny", "Matt"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "What was Frank West&#039;s job in &quot;Dead Rising&quot;?",
    correct_answer: "Photojournalist",
    incorrect_answers: ["Janitor", "Chef", "Taxi Driver"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "Who is the main protagonist of Dead Space?",
    correct_answer: "Isaac Clarke",
    incorrect_answers: ["Commander Shepard", "Gordon Freeman", "Master Chief"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "What game was used to advertise Steam?",
    correct_answer: "Counter-Strike 1.6",
    incorrect_answers: ["Half-Life", "Half-Life 2", "Team Fortress"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "What are Sans and Papyrus named after in &quot;Undertale&quot;?",
    correct_answer: "Fonts",
    incorrect_answers: ["Plants", "Companies", "Ancient writing paper"],
  },
  {
    category: "Entertainment: Comics",
    type: "multiple",
    difficulty: "easy",
    question: "In &quot;Homestuck&quot; what is Dave Strider&#039;s guardian?",
    correct_answer: "Bro",
    incorrect_answers: ["Becquerel", "Doc Scratch", "Halley"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does the computer software acronym JVM stand for?",
    correct_answer: "Java Virtual Machine",
    incorrect_answers: [
      "Java Vendor Machine",
      "Java Visual Machine",
      "Just Virtual Machine",
    ],
  },
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const selectionEls = document.querySelectorAll(".selection");
const answerText_1 = document.getElementById("answerText_1");
const answerText_2 = document.getElementById("answerText_2");
const answerText_3 = document.getElementById("answerText_3");
const answerText_4 = document.getElementById("answerText_4");
const submit = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

// Remove selection on next question
const deselectAnswers = () => {
  selectionEls.forEach((selectionEl) => {
    selectionEl.checked = false;
  });
};

const loadQuestion = () => {
  deselectAnswers();

  const currentQuestionData = quizData[currentQuiz];

  // Insert question
  questionEl.innerHTML = `<div class="category"><span>${
    currentQuestionData.category
  }</span><span>${currentQuestionData.difficulty}</span></div> ${
    currentQuiz + 1
  }) ${currentQuestionData.question}`;

  // Create answer array
  answers = currentQuestionData.incorrect_answers;
  answers.push(currentQuestionData.correct_answer);

  // Shuffle array
  shuffleArray = (answers) => {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
  };
  shuffleArray(answers);

  // Insert answers
  answerText_1.innerHTML = answers[0];
  answerText_2.innerHTML = answers[1];
  answerText_3.innerHTML = answers[2];
  answerText_4.innerHTML = answers[3];
};

//Initialize App
loadQuestion();

// Record selection
const getSelected = () => {
  let selection = undefined;

  selectionEls.forEach((selectionEl) => {
    if (selectionEl.checked) {
      selection = selectionEl.nextSibling.textContent;
    }
  });
  return selection;
};

//Submit handler
submit.addEventListener("click", () => {
  const selection = getSelected();

  if (selection) {
    if (selection === quizData[currentQuiz].correct_answer) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuestion();
    } else if (score < 6) {
      quiz.innerHTML = `<div class="answers">
      <h2>You Failed! 😝 You got ${score}/${quizData.length} questions correct.</h2>
      <button onclick="location.reload()">Try Again ⟳</button>
      </div>`;
    } else {
      quiz.innerHTML = `<div class="answers">
      <h2>You Passed! 👏 You got ${score}/${quizData.length} questions correct.</h2>
      <button onclick="location.reload()">Play Again ⟳</button>
      </div>`;
    }
  }
});
