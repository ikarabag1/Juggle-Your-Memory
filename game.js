// grab game-board and all cards classes and ids
// a list of all card elements and store it under cards
const cards = document.querySelectorAll('.card');
const board = document.getElementById('game-board');
const back = document.querySelectorAll('.back');
const front = document.querySelectorAll('.front');
const reset = document.querySelector('reset-btn');
console.log(cards)

let count=0; //track of flipped cards

// generate data
const backCardsArrayId = ['cork', 'book', 'mug', 'wallet', 'key', 'fedora', 'remote', ' book', 'key', 'bottleopener', 'cork', 'book', 'mug', 'wallet']


// score array
let score = [];

// LANDING PAGE - INFO


// GAME START 
function gameStartBoard() {
    shuffleCards();
}
// gameStartBoard()

// // RANDOMIZING CARDS
function shuffleCards () {
backCardsArrayId.sort(() => Math.random() - 0.5);
console.log(backCardsArrayId)
}

   // add eventListener to each card
   cards.forEach(card =>card.addEventListener('click', flipCard)); 

   // FLIPPING CARDS FUNCTION 
function flipCard (event) {
 console.log('card flipped');
 console.log(event);
// add classList flip
    this.classList.add('flip');
    // increase count by 1
    count++;
    // conditional to stop flipping after 2 selections
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
    console.log(flipped[0])
    console.log(flipped[1])
    
    if (flipped[0].isEqualNode(flipped[1])) {
        console.log("matched");
        setTimeout(flipped.forEach(card=>card.classList.add('matched')), 4000);
        setTimeout(fadeAwayCards, 4000)
        cards.forEach(card =>card.addEventListener('click', flipCard)); 
     //if true, score increases by 1 
    //  score += 1;
    //  announcement();
    // remove classlist
   
    // resetGame()
   // if false, not a match
 } else { 
 
    flipBackCards()
    console.log("try again!");
    cards.forEach(card =>card.addEventListener('click', flipCard)); 
    // resetGame() 
    // announcement() 

 } 

//  MATCHED TWO FLIPPED CARDS FADES AWAY
function fadeAwayCards() {
    let matched = document.querySelectorAll('.matched');
    matched[0].removeEventListener('click', flipCard)
    matched[1].removeEventListener('click', flipCard)
    matched[0].classList.remove('flip');
    matched[1].classList.remove('flip');
    
    cardsFlipped = false
    // resetGame()
}

// UNFLIP OF TWO UNMATCHED CARDS
function flipBackCards() {
flipsStopped = true
setTimeout(() => {
    flipped[0].classList.remove('flip');
    flipped[1].classList.remove('flip');
    // resetGame()
}, 1000)
}
}
// ANNOUNCEMENT FUNCTION -- results displays

// function announcement() {
    
// foreach turn display matched or not
    // create and grap annoucement display
// }
   

//SCORE FUNCTION -- // display score number 


// RESET FUNCTION --RESETS GAME

    // clear board
    // clear score
    // clear announcement
    // reset cards randomly



