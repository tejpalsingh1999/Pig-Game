'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score = document.querySelectorAll('.score');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



//Starting conditions......
//initializing the score to 0
for (let i = 0; i < score.length; i++)
    score[i].innerText = '0';

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Hiding dice for initial stage of the game
diceEl.classList.add('hidden');


//Implementing roll dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. Generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. check for rolled 1: if true, 
        if (dice !== 1) {
            //add dice to current player score
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //switch player
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;

            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');

        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }
    }
});

//Reseting the game

btnNew.addEventListener('click', function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    for (let i = 0; i < score.length; i++)
        score[i].innerText = '0';

    current0El.textContent = currentScore;
    current1El.textContent = currentScore;

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    diceEl.classList.add('hidden');


});