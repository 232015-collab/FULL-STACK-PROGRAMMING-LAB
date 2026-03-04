$(document).ready(function () {

  const questions = [
    {
      q: "What does jQuery's `$` sign represent?",
      options: ["A CSS variable", "The jQuery function / alias", "A PHP variable", "A server-side command"],
      answer: 1
    },
    {
      q: "Which method is used to hide an element in jQuery?",
      options: [".disappear()", ".hide()", ".remove()", ".invisible()"],
      answer: 1
    },
    {
      q: "What does `.fadeIn()` do in jQuery?",
      options: ["Removes an element", "Changes font color", "Gradually makes an element visible", "Loads an image"],
      answer: 2
    },
    {
      q: "How do you select an element with id='demo' using jQuery?",
      options: [".demo", "#demo", "$('demo')", "$('#demo')"],
      answer: 3
    },
    {
      q: "Which jQuery method attaches an event handler?",
      options: [".bind()", ".on()", ".listen()", ".attach()"],
      answer: 1
    },
    {
      q: "What does Ajax stand for?",
      options: [
        "Asynchronous JavaScript And XML",
        "Advanced Java Application Executor",
        "Active JavaScript Ajax Extension",
        "Automated Java And XML"
      ],
      answer: 0
    },
    {
      q: "Which jQuery method changes the text content of an element?",
      options: [".html()", ".val()", ".text()", ".content()"],
      answer: 2
    },
    {
      q: "What does jQuery's `.css()` method do?",
      options: [
        "Links an external CSS file",
        "Gets or sets CSS properties",
        "Removes all styles",
        "Validates CSS"
      ],
      answer: 1
    }
  ];

  let current = 0, score = 0, answered = false;

  function loadQuestion() {
    answered = false;
    const q = questions[current];
    const pct = (current / questions.length) * 100;

    $("#progressBar").css("width", pct + "%");
    $("#qNum").text("Question " + (current + 1) + " of " + questions.length);
    $("#qScore").text("Score: " + score);
    $("#questionText").hide().text(q.q).fadeIn(300);
    $("#feedbackMsg").text("").css("color", "");
    $("#nextBtn").hide();

    const $opts = $(".options");
    $opts.empty();

    q.options.forEach(function (opt, i) {
      const $btn = $("<button>").addClass("option-btn").text(opt);
      $btn.on("click", function () {
        if (answered) return;
        answered = true;
        $(".option-btn").prop("disabled", true);

        if (i === q.answer) {
          $(this).addClass("correct");
          score++;
          $("#feedbackMsg").text("✅ Correct!").css("color", "#10b981");
        } else {
          $(this).addClass("wrong");
          $(".option-btn").eq(q.answer).addClass("correct");
          $("#feedbackMsg").text("❌ Wrong! Correct answer highlighted.").css("color", "#ef4444");
        }
        $("#qScore").text("Score: " + score);
        $("#nextBtn").fadeIn(200);
      });
      $opts.append($btn);
    });
  }

  function showScore() {
    const pct = Math.round((score / questions.length) * 100);
    let emoji = pct >= 80 ? "🏆" : pct >= 60 ? "😊" : pct >= 40 ? "😐" : "😔";
    let msg = pct >= 80 ? "Excellent work!" : pct >= 60 ? "Good job!" : pct >= 40 ? "Keep practicing!" : "Better luck next time!";

    $("#quizScreen").hide();
    $("#scoreScreen").fadeIn(400);
    $(".emoji").text(emoji);
    $("#scoreCircle").text(score + "/" + questions.length);
    $("#scoreMsg").text(pct + "% – " + msg);
  }

  $("#nextBtn").on("click", function () {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });

  $("#retryBtn").on("click", function () {
    current = 0; score = 0;
    $("#scoreScreen").hide();
    $("#quizScreen").fadeIn(300);
    loadQuestion();
  });

  loadQuestion();
});
