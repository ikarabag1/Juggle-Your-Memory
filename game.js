// grab game-board and all cards classes and ids
// a list of all card elements and store it under cards
const cards = document.querySelectorAll('.card');
const board = document.getElementById('game-board');
const displayDiv = document.querySelector('.display');
let matched = document.querySelectorAll('.matched');
let scoreBoard = document.querySelector('.score');

let count=0; //track of flipped cards

// generate data by appending img
const backCardsArrayId = ['cork', 'book', 'mug', 'wallet', 'key', 'fedora', 'remote', ' book', 'key', 'bottleopener', 'cork', 'book', 'mug', 'wallet']


// GAME START 
window.onload= gameStartBoard();


function gameStartBoard() {
    let play = document.createElement("p");
    play.innerText = "Test your memorizing skills with flipping cards & matching most of them in a deck of cards.";
    const info = document.querySelector("#info");
    info.appendChild(play);
    

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
    if (count === 1) {
        second = 0;
        minute = 0;
        timerSet()
    }
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
        setTimeout(flipped.forEach(card=>card.classList.add('matched')), 800);
        setTimeout(fadeAwayCards, 800)
        cards.forEach(card =>card.addEventListener('click', flipCard)); 
     //if true, score increases by 1 
     score()
    displayDiv.innerText = "It is a match!";
 } else {
    setTimeout(flipped.forEach(card=>card.classList.add('noMatch')), 800);
    setTimeout(fadeAwayCards, 800) 
    cards.forEach(card =>card.addEventListener('click', flipCard)); 
    displayDiv.innerText = "Not a match, try again!"
    flipBackCards()
 } 

//  MATCHED TWO FLIPPED CARDS FADES AWAY
function fadeAwayCards() {   
    if (matched.length) {
        matched[0].removeEventListener('click', flipCard)
        matched[1].removeEventListener('click', flipCard)
        matched[0].classList.remove('flip');
        matched[1].classList.remove('flip');
        cardsFlipped = false
    }else {
        console.log('fadeaway cards false')
    }
}

// UNFLIP OF TWO UNMATCHED CARDS
function flipBackCards() {
flipsStopped = true
setTimeout(() => {
    flipped[0].classList.remove('flip');
    flipped[1].classList.remove('flip');
}, 800)
}
}

//SCORE FUNCTION -- // display score number 
function score() {
    scoreBoard = 0;
        scoreBoard ++;
    }

const timer = document.querySelector('.timerBox');

// RESET FUNCTION --RESETS GAME Play Again
const reset = document.getElementById('reset-btn');
reset.addEventListener('click', resetGame); 

function resetGame() {
    console.log('resetgame in both')
    for (let i=0; i<cards.length; i++) {
        displayDiv.innerText = " ";
        cards[i].classList.remove("flip", "match", "noMatch");
    } console.log('after')
    count=0;
    
    timer.innerText = "0 min 0 sec";
//    gameStartBoard()
window.location.reload()
}
    // reset cards randomly
   
// TIMER FUNCTION   
function timerSet() {
setTimeout (() => {
       
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
        timer.innerText = 'Timer: ' + minute + "mins " + second + ' secs';
    }, 1000);
};
const timeStop = (timer) => {
    clearTimeout(timer);
};
// cards.addEventListener('click', timerSet,git  {once: true});
