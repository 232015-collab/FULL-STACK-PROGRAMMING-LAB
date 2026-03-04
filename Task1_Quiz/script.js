// ─── Quiz Data ───────────────────────────────────────────────────────────────
const questions = [
  {
    text: "Which keyword is used to declare a block-scoped variable in JavaScript?",
    options: ["var", "let", "const", "define"],
    correct: 1
  },
  {
    text: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Management", "Dynamic Object Module", "Document Oriented Map"],
    correct: 0
  },
  {
    text: "Which method selects an element by its ID?",
    options: ["querySelector()", "getElement()", "getElementById()", "selectId()"],
    correct: 2
  },
  {
    text: "What is the output of: typeof 42?",
    options: ["\"int\"", "\"float\"", "\"number\"", "\"integer\""],
    correct: 2
  },
  {
    text: "Which loop always executes at least once?",
    options: ["for", "while", "do-while", "forEach"],
    correct: 2
  }
];

// ─── Check individual answer ──────────────────────────────────────────────────
function checkAnswer(qIndex, selectedOption) {
  return selectedOption === questions[qIndex].correct;
}

// ─── Calculate total score ────────────────────────────────────────────────────
function calculateScore(answers) {
  let score = 0;
  answers.forEach((ans, i) => {
    if (checkAnswer(i, ans)) score++;
  });
  return score;
}

// ─── Get score message based on score ────────────────────────────────────────
function getScoreMessage(score, total) {
  const pct = (score / total) * 100;
  if (pct === 100) return { msg: "🏆 Perfect Score! Outstanding!", cls: "result-excellent" };
  if (pct >= 60)   return { msg: "👍 Good Job! Keep it up!",       cls: "result-good"      };
  return               { msg: "😕 Needs Improvement. Try again!",  cls: "result-poor"       };
}

// ─── Update progress bar ──────────────────────────────────────────────────────
function updateProgress() {
  const answered = questions.filter((_, i) => {
    const radios = document.getElementsByName(`q${i}`);
    return [...radios].some(r => r.checked);
  }).length;
  const pct = (answered / questions.length) * 100;
  document.getElementById("progress-fill").style.width = pct + "%";
}

// ─── Submit quiz ──────────────────────────────────────────────────────────────
function submitQuiz() {
  const answers = questions.map((_, i) => {
    const radios = document.getElementsByName(`q${i}`);
    for (let r of radios) {
      if (r.checked) return parseInt(r.value);
    }
    return -1; // unanswered
  });

  // Check for unanswered
  const unanswered = answers.indexOf(-1);
  if (unanswered !== -1) {
    alert(`⚠️ Please answer Question ${unanswered + 1} before submitting!`);
    return;
  }

  const score    = calculateScore(answers);
  const { msg, cls } = getScoreMessage(score, questions.length);

  // Build per-answer feedback
  let feedbackHTML = '<div class="answer-feedback">';
  questions.forEach((q, i) => {
    const correct = checkAnswer(i, answers[i]);
    const icon    = correct ? "✅" : "❌";
    const cls2    = correct ? "correct" : "incorrect";
    const correctOpt = q.options[q.correct];
    feedbackHTML += `
      <div class="feedback-item ${cls2}">
        <span class="feedback-icon">${icon}</span>
        Q${i + 1}: ${correct ? "Correct!" : `Wrong — Correct answer: <strong>${correctOpt}</strong>`}
      </div>`;
  });
  feedbackHTML += "</div>";

  // Show result box
  const resultBox = document.getElementById("result-box");
  resultBox.className = cls;
  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <div class="result-score">${score} / ${questions.length}</div>
    <div class="result-msg">${msg}</div>
    <div class="result-detail">You answered ${score} out of ${questions.length} questions correctly.</div>
    ${feedbackHTML}
  `;
  resultBox.scrollIntoView({ behavior: "smooth" });
}

// ─── Reset quiz ───────────────────────────────────────────────────────────────
function resetQuiz() {
  questions.forEach((_, i) => {
    const radios = document.getElementsByName(`q${i}`);
    radios.forEach(r => r.checked = false);
  });
  const resultBox = document.getElementById("result-box");
  resultBox.style.display = "none";
  resultBox.innerHTML = "";
  document.getElementById("progress-fill").style.width = "0%";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── Render quiz on load ──────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const quizArea = document.getElementById("quiz-area");
  quizArea.innerHTML = "";

  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question-card";

    const optionsHTML = q.options.map((opt, j) => `
      <label class="option-label">
        <input type="radio" name="q${i}" value="${j}" onchange="updateProgress()">
        ${opt}
      </label>
    `).join("");

    card.innerHTML = `
      <div class="question-label">Question ${i + 1} of ${questions.length}</div>
      <div class="question-text">${q.text}</div>
      <div class="options">${optionsHTML}</div>
    `;
    quizArea.appendChild(card);
  });
});
