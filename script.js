"use strict";

const store = {
  questions: [
    {
      question: "Who is the lead singer of the band Led Zeppelin?",
      answers: ["Jimmy Page", "Ozzy Osbourne", "Robert Plant", "Dave Grohl"],
      correctAnswer: 2,
    },
    {
      question: "Which musician is a member of the band The Beatles?",
      answers: [
        "Paul McCartney",
        "Robert Randolph",
        "Shirley Temple",
        "David Bowie",
      ],
      correctAnswer: 0,
    },
    {
      question: "Who wrote the song 'All Along the Watchtower'?",
      answers: [
        "Bob Dylan",
        "Jimi Hendrix",
        "Stevie Ray Vaughan",
        "The Hanson Brothers",
      ],
      correctAnswer: 0,
    },
    {
      question: "Who is the lead guitarist for Metallica?",
      answers: ["James Hetfield", "Kirk Hammett", "Joe Perry", "Zakk Wylde"],
      correctAnswer: 1,
    },
    {
      question: "Which musician is a member of the band Pink Floyd?",
      answers: ["John Lennon", "Gene Simmons", "Jerry Garcia", "Dave Gilmour"],
      correctAnswer: 3,
    },
    {
      question: "Who is the guitarist for the band Queen?",
      answers: ["Brian May", "Pete Townshend", "Keith Richards", "The Edge"],
      correctAnswer: 0,
    },
    {
      question: "Who is the lead singer for the band Tool?",
      answers: [
        "Justin Bieber",
        "Roger Waters",
        "Maynard James Keenan",
        "Layne Staley",
      ],
      correctAnswer: 2,
    },
    {
      question: "Who founded the band Nirvana?",
      answers: ["Miley Cyrus", "Kurt Cobain", "Alice Cooper", "Dr. Dre"],
      correctAnswer: 1,
    },
  ],
  questionNumber: 0,
  score: 0,
  quizStarted: false,
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/
function generateMainPage() {
  return $("main").html(`<div class="mainPage">
  <h2>Let's test your head-banging knowledge</h2>
  <p class="enjoy">Enjoy</p>
  <button id="startQuiz" class="btn btn-success btn-lg">Start Quiz</button>
  </div>`);
}

function generateWrongPage() {
  return `<div id="wrongPage">
  <h1>Bummer!</h1>
  <p>The right answer was 
  ${
    store.questions[store.questionNumber - 1].answers[
      store.questions[store.questionNumber - 1].correctAnswer
    ]
  }</p>
  <div><iframe src="https://giphy.com/embed/33iqmp5ATXT5m" width="480" height="205" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
  <button class="rockOn btn btn-danger btn-lg mt-2">Rock On</button>
  </div>`;
}

function generateRightPage() {
  return `<div id="continue">
  <h1>NICE!</h1>
  <div><iframe src="https://giphy.com/embed/gui67fZ3xIneM" width="480" height="273" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
  <button class="rockOn btn btn-primary btn-lg mt-2">ROCK ON</button>
  
  </div>`;
}

function generateQuestion() {
  let question = store.questions[store.questionNumber];
  console.log(question);
  let answers = question.answers.map((answer, idx) => {
    console.log(answer, idx);
    return `<label class="btn-outline-success" for="answer${idx}">
    <input type="radio" class="btn-check" id="answer${idx}" name="answer" value = "${idx}" required>
    ${answer}</label><br>`;
  });
  console.log(answers);
  return `
    <div class="container">
      <div class="row status">
        <div class="col-md-6 my-2">Current Question: ${
          store.questionNumber + 1
        } out of 8
        </div>
        <div class="col-md-6 my-2">Current Score: ${store.score} out of 160
        </div>
    </div>
  </div>
   <form id="question">
    <h2>${question.question}</h2>
    <div class="container">
      <div class="row">
        <div class="col answers">${answers.join(" ")}
        </div>
      </div>
    <button type="submit" class="btn btn-success btn-lg">Submit Answer</button>
    </form>
    </div>
    `;
}

function generateFinalPage() {
  if (store.score >= 160) {
    return `
        <div class="finalPage">
        <h2>We are not worthy, you got a perfect score!</h2>
        <p>Final Score: ${store.score} out of 160</p>
        <div>
        <iframe src="https://giphy.com/embed/iiS84hOJXh1Pq" width="480" height="267" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        
        </div>
        <button id="startOver" class="btn btn-success btn-lg m-t-1">Start Over</button>
        `;
  } else if (store.score >= 80) {
    return `
  <div class="finalPage">
  <h2>Congrats, you ARE worthy</h2>
  <p>Final Score: ${store.score} out of 160</p>
  <div>
  </div>

  <iframe src="https://giphy.com/embed/U7MTEZXKkCtSxIbyMe" width="300" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
  </div>
  <button id="startOver" class="btn btm-lg btn-success m-t-1">Start Over</button>
  </div>
  `;
  } else {
    return `
    <div class="finalPage">
    <h2>Guess rock isn't your thing</h2>
    <p>Final Score: ${store.score} out of 160</p>
    <div>
    <iframe src="https://giphy.com/embed/J27aVYwDuPpWHKZ06S" width="300" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
    <button id="startOver" class="btn btn-lg btn-success m-t-1">Start Over</button>
    </div>
    `;
  }
}

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/
function render(pagetype) {
  let html = "";

  switch (pagetype) {
    case "mainPage":
      html = generateMainPage();
      break;
    case "endPage":
      html = generateFinalPage();
      break;
    case "wrongPage":
      html = generateWrongPage();
      break;
    case "rightPage":
      html = generateRightPage();
      break;
    default:
      html = generateQuestion();
  }

  $("main").html(html);
}
// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/
function handleStartQuiz() {
  $("main").on("click", "#startQuiz", function (evt) {
    store.quizStarted = true;
    render();
  });
}

function handleAnswerSubmit() {
  $("main").on("submit", "#question", function (event) {
    event.preventDefault();
    let chosenAnswer = $("input[name='answer']:checked").val();
    store.questionNumber++;
    if (
      Number(chosenAnswer) ===
      store.questions[store.questionNumber - 1].correctAnswer
    ) {
      store.score += 20;
      render("rightPage");
    } else {
      render("wrongPage");
    }
  });
}

function handleRightPage() {
  $("main").on("click", ".rockOn", function (event) {
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      render();
    }
  });
}

function handleWrongPage() {
  $("main").on("click", ".rockOn", function (event) {
    event.preventDefault();
    if (store.questionNumber > store.questions.length - 1) {
      render("endPage");
    } else {
      render();
    }
  });
}

function handleFinalAnswer() {
  $("main").on("click", "#startOver", function (event) {
    store.questionNumber = 0;
    store.score = 0;
    generateMainPage();
  });
}
// These functions handle events (submit, click, etc)

function main() {
  render();
  handleStartQuiz();
  generateMainPage();
  generateQuestion();
  handleWrongPage();
  handleRightPage();
  generateFinalPage();
  handleAnswerSubmit();
  handleFinalAnswer();
  generateFeedback();
}

$(main);
