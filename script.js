"use strict";

//Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
// document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const newButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const finalScoer = document.querySelector(".score");
const closeButton = document.querySelector(".close-modal");
const overlayButton = document.querySelector(".overlay");
const rulesButton = document.querySelector(".btn--rules");
const displayBox = document.querySelector(".display-box");

//Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

// let currentScoreVlaue = 0;
// let score = [0, 0];
// let activePlayer = 0;
// let playing = true;

let playing, score, currentScoreVlaue, activePlayer;
//Reassigning the values in JS
function init() {
  playing = true;
  score = [0, 0];
  currentScoreVlaue = 0;
  activePlayer = 0;

  //Reassigning the elements that has to be displayed
  diceEl.classList.add("hidden");
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  player0El.classList.add("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player1El.classList.remove("player--winner");
  displayBox.classList.add("hidden");
}

init();

function switchingPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScoreVlaue = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

rollButton.addEventListener("click", function () {
  if (playing) {
    //Generating dice value
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    //Displaying the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceValue}.png`;

    diceEl.classList.remove(`animation-dice`);

    setTimeout(function () {
      diceEl.classList.add("animation-dice");
    }, 5);
    displayBox.classList.remove("hidden");

    // diceEl.classList.remove(`animation`);
    if (diceValue != 1) {
      //Add it to the current score
      currentScoreVlaue = currentScoreVlaue + diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScoreVlaue;
      displayBox.textContent = `+${diceValue} points for Player ${
        activePlayer + 1
      }`;
    } else {
      //Switch Player
      switchingPlayer();
      displayBox.textContent = `Don't roll 1, Switching player`;
    }
  }
});

holdButton.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScoreVlaue;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // switchingPlayer();
    diceEl.classList.add("hidden");
    displayBox.classList.remove("hidden");
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      displayBox.textContent = `Player ${activePlayer + 1} won`;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchingPlayer();
    }
    // document
    //   .querySelector(`score--${activePlayer}`)
    //   .classList.add("score-animation");
    // setTimeout(function () {
    //   document
    //     .querySelector(`score--${activePlayer}`)
    //     .remove("score-animation");
    // }, 5);
    displayBox.textContent = `Switching player`;
  }
});

newButton.addEventListener("click", init);

closeButton.addEventListener("click", function () {
  document.querySelector(".model").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

overlayButton.addEventListener("click", function () {
  document.querySelector(".model").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

rulesButton.addEventListener("click", function () {
  document.querySelector(".model").classList.toggle("hidden");
  document.querySelector(".overlay").classList.toggle("hidden");
});