// grab game-board and all cards classes and ids
// a list of all card elements and store it under cards
const cards = document.querySelectorAll('.card');
const board = document.getElementById('game-board');
const displayDiv = document.querySelector('.display');

let count=0; //track of flipped cards

// generate data by appending img
const backCardsArrayId = ['cork', 'book', 'mug', 'wallet', 'key', 'fedora', 'remote', ' book', 'key', 'bottleopener', 'cork', 'book', 'mug', 'wallet']

// score array
let score = [];

// GAME START 
// function gameStartBoard() {
//     const infoBoard = document.createElement("div");
//     infoBoard.classList.add("info-board");
//     board.appendChild(infoBoard);

//     shuffleCards();
// }

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
    //     second = 0;
    //     minute = 0;
    //     hour = 0;
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
// TESTING WHETHER A MATCH OR NOT OF 2 CARDS FLIPPED
 function isAMatch () {
    let flipped = document.querySelectorAll('.flip');
    if (flipped[0].isEqualNode(flipped[1])) {
        setTimeout(flipped.forEach(card=>card.classList.add('matched')), 2000);
        setTimeout(fadeAwayCards, 2000)
        cards.forEach(card =>card.addEventListener('click', flipCard)); 
     //if true, score increases by 1 
    //  scoreBoard()
    // fadeAwayCards()
    displayDiv.innerText = "It is a match!";
    //  announcement()
    // // remove classlist
   // if false, not a match
 } else { 
    flipBackCards()
    cards.forEach(card =>card.addEventListener('click', flipCard)); 
    // announcement() 
    displayDiv.innerText = "Not a match, try again!"
 } 

//  MATCHED TWO FLIPPED CARDS FADES AWAY
function fadeAwayCards() {
    let matched = document.querySelectorAll('.matched');
    matched[0].removeEventListener('click', flipCard)
    matched[1].removeEventListener('click', flipCard)
    matched[0].classList.remove('flip');
    matched[1].classList.remove('flip');
    // announcement()
    cardsFlipped = false
}

// UNFLIP OF TWO UNMATCHED CARDS
function flipBackCards() {
flipsStopped = true
setTimeout(() => {
    flipped[0].classList.remove('flip');
    flipped[1].classList.remove('flip');
}, 1000)
}
}

// ANNOUNCEMENT FUNCTION -- results displays
// function announcement() {
//     // when a match happend
//     let matched = document.querySelectorAll('.matched');
   

//     if (flipped[0].isEqualNode(flipped[1])) {
//         displayDiv.innerText = "It is a match!";
        
//     }// when it is not a match
//     else if {
//     displayDiv.innerText = "Not a match, try again!"
//     }
//     else (score === 8) {
//         displayDiv.innerText = "Congrats!";

//     }
// }

// TIMER FUNCTION   

// const timer = document.querySelectorAll('.timer');
// let second = 0,
// minute = 0,
// hour = 0,

// function timerSet() {
// setTimeout (() => {
//         timer.innerText = minute = "mins " + second + "secs";
//         second++;
//         if (second === 60) {
//             minute++;
//             second = 0;
//         }
//         if (minute === 60) {
//             hour++;
//             minute = 0;
//         }
//     }, 1000);
// }

//SCORE FUNCTION -- // display score number 
// function scoreBoard() {
//     let flipped = document.querySelectorAll('.flip');
//     if (flipped[0].isEqualNode(flipped[1])) {
//         score ++;
//     }
// } 

// RESET FUNCTION --RESETS GAME Play Again
// const reset = document.querySelector('reset-btn');
// function resetGame() {
    
// }
    // clear board
    // clear time
    // clear score
    // clear announcement
    // reset cards randomly