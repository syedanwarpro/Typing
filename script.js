const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const mistakesEl = document.getElementById("mistakes");
const restartBtn = document.getElementById("restart-btn");

const sampleText =
  "Typing is an important skill for students and professionals. Practice daily to improve your speed and accuracy.";

let timer = 60;
let interval = null;
let mistakes = 0;
let started = false;

function loadText() {
  textDisplay.innerHTML = "";
  sampleText.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
}

function startTimer() {
  interval = setInterval(() => {
    timer--;
    timeEl.innerText = timer;

    if (timer <= 0) {
      clearInterval(interval);
      textInput.disabled = true;
    }
  }, 1000);
}

function calculateResults() {
  const enteredText = textInput.value;
  const correctChars = enteredText.length - mistakes;

  const accuracy =
    enteredText.length > 0
      ? Math.max(0, ((correctChars / enteredText.length) * 100).toFixed(0))
      : 100;

  const timeUsed = (60 - timer) / 60;
  const wpm =
    timeUsed > 0
      ? Math.round((enteredText.length / 5) / timeUsed)
      : 0;

  accuracyEl.innerText = accuracy;
  wpmEl.innerText = wpm;
  mistakesEl.innerText = mistakes;
}

textInput.addEventListener("input", () => {
  const enteredText = textInput.value;
  const spans = textDisplay.querySelectorAll("span");

  if (!started) {
    started = true;
    startTimer();
  }

  mistakes = 0;

  spans.forEach((span, index) => {
    const typedChar = enteredText[index];

    span.classList.remove("correct", "incorrect", "current");

    if (typedChar == null) {
      if (index === enteredText.length) {
        span.classList.add("current");
      }
    } else if (typedChar === span.innerText) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
      mistakes++;
    }
  });

  calculateResults();
});

restartBtn.addEventListener("click", () => {
  clearInterval(interval);
  timer = 60;
  mistakes = 0;
  started = false;

  timeEl.innerText = timer;
  wpmEl.innerText = 0;
  accuracyEl.innerText = 100;
  mistakesEl.innerText = 0;

  textInput.value = "";
  textInput.disabled = false;

  loadText();
});

loadText();