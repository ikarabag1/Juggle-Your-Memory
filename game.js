// grab game-board and all cards classes and ids
// a list of all card elements and store it under cards
const cards = document.querySelectorAll('.card');
const board = document.getElementById('game-board');
const displayDiv = document.querySelector('.display');
const reset = document.getElementById('reset-btn');
let matched = document.querySelectorAll('.matched');

let scores = 0
let count=0; //track of flipped cards

// GAME START 
window.onload= gameStartBoard();


function gameStartBoard() {
    let play = document.createElement("p");
    play.innerText = "Test your memorizing skills with flipping cards & matching most of them in a deck of cards.";
    const info = document.querySelector("#info");
    info.appendChild(play);
    reset.style.visibility = "hidden";
    //     shuffleCards();
}

// // RANDOMIZING CARDS
// function shuffleCards () {
// backCardsArrayId.sort(() => Math.random() - 0.5);
// console.log(backCardsArrayId)
// }

// add eventListener to each card
cards.forEach(card =>card.addEventListener('click', flipCard)); 
// cards.forEach((card, i) =>card.addEventListener('click', flipCard)); 

// FLIPPING CARDS FUNCTION 
function flipCard (event) {
    console.log("is this working")
// add classList flip
    this.classList.add('flip');
    // increase count by 1
    count++;
    // start timer after first flip
    // if (count === 1) {
    //     timerSet()
    // }
    // conditional to stop flipping after 2 flips
    if(count === 2) {
        // this.classList.remove('flip');
        cards.forEach(card =>card.removeEventListener('click', flipCard)); 
        isAMatch();
        count=0;
    }
} 

let scoreBoard = document.querySelector('.score');
// TESTING WHETHER A MATCH OR NOT OF 2 CARDS FLIPPED
 function isAMatch () {
    let flipped = document.querySelectorAll('.flip');
    if (flipped[0].isEqualNode(flipped[1])) {
        setTimeout(flipped.forEach(card=>card.classList.add('matched')), 50);
        setTimeout(fadeAwayCards, 50)
        cards.forEach(card =>card.addEventListener('click', flipCard)); 
        fadeAwayCards()
     scores++;
     score()
     scoreBoard.innerText = scores;  
    displayDiv.innerText = "It is a match!";
 } else {
    setTimeout(flipped.forEach(card=>card.classList.add('noMatch')), 50);
    setTimeout(flipBackCards, 50) 
    displayDiv.innerText = "Not a match, try again!"
    flipBackCards()
 } 

//  MATCHED TWO FLIPPED CARDS FADES AWAY
function fadeAwayCards() {   
    if (matched.length===2) {
        matched[0].removeEventListener('click', flipCard)
        matched[1].removeEventListener('click', flipCard)
        matched[0].classList.remove('flip');
        matched[1].classList.remove('flip');
        cardsFlipped = false
    }
}

// UNFLIP OF TWO UNMATCHED CARDS
function flipBackCards() {
flipsStopped = true
setTimeout(() => {
    flipped[0].classList.remove('flip');
    flipped[1].classList.remove('flip');
    flipped[0].classList.remove('noMatch');
    flipped[1].classList.remove('noMatch');
}, 50)
}cards.forEach(card =>card.addEventListener('click', flipCard)); 
 }

//SCORE FUNCTION -- // display score number 

function score() {
    if (scores === 8)
        reset.style.visibility = "visible";
        scoreBoard.innerText = scores;
        displayDiv.innerText = "You won!";
    }

const timer = document.querySelector('.timerBox');

// RESET FUNCTION --RESETS GAME Play Again
reset.addEventListener('click', resetGame); 
function resetGame() {
    for (let i=0; i<cards.length; i++) {
        displayDiv.innerText = " ";
        cards[i].classList.remove("flip", "match", "noMatch");
    } 
    count=0;
    scores=0;
    // timer.innerText = "0 min 0 sec";
   gameStartBoard()
window.location.reload()
}
    
 
// TIMER FUNCTION  
// let second = 0
// let minute = 0 
// function timerSet() {
// setTimeout (() => {
//     timer.innerText = 'Timer: ' + minute + "mins " + second + ' secs';
//         second++;
//         if (second == 60) {
//             minute++;
//             second = 0;
//         }
//         if (minute == 60) {
//             hour++;
//             minute = 0;
//         }
//     }, 1000);
// };
// const timeStop = (timer) => {
//     clearTimeout(timer);
// }
// cards.addEventListener('click', timerSet,  {once: true});
