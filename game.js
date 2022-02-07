// grab game-board and all cards classes and ids
// a list of all card elements and store it under cards
const cards = document.querySelectorAll('.card');
const board = document.getElementById('game-board');
let backCards = document.querySelectorAll('.back');
const frontCards = document.querySelectorAll('.front');

const backCardsArray = ['cork', 'book', 'mug', 'wallet', 'key', 'fedora', 'remote', ' book', 'key', 'bottleopener', 'cork', 'book', 'mug', 'wallet']

// compare values of flipped cards first and second click
let flippedCards = [];

// matched ones
let matched = [];

// score array
let score = [];


// GAME START 
function gameStartBoard() {
    cardsFlipped = 0;
    flippedCards = [];
    for (let i = backCardsArray.length - 1; i < 0; i++) {

    } 
}

// FLIIPED CARD FUNCTION clicked and flipped and loop thrugh cards 
function flipCard () {
    this.classList.add('flip');

cards.forEach(card =>card.addEventListener('click', flipCard));

// conditionals cghecked for matched pairs 
if (flippedCards.length == 0) {
    flippedCards.push(backCards.id)
    
} else {
   
} 
    
}

// whether match or not
// pushed in let flippedCards
flippedCards.push
//         // if matched fade away and goes into matched
matched += 1;
//         // if not try again alert with red border

   // announcement function run
        // score function run

// Announcement Function -- results
function announcement() {

}
    // foreach turn display matched or not
    // create and grap annoucement display

// score function
    // display score number with while loop


// reset function
    // clear board
    // clear score
    // clear announcement
    // reset cards randomly






