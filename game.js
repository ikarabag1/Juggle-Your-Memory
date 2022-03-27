// grab elements and store
const cards = document.querySelectorAll('.card');
const displayDiv = document.querySelector('.display');
let matched = document.querySelectorAll('.matched');

let scores = 0 //track of matched cards
let count = 0 //track of flipped cards

// add eventListener to each card to flip over
cards.forEach(card => card.addEventListener('click', flipCard));

// FLIPPING CARDS FUNCTION 
function flipCard(e) {
    // passing event parameter to flipcard function
    if (e.target.offsetParent.className !== 'card flip') {
        // condition : if the event target doesnt have the class list of flip, add it 
        this.classList.add('flip');
        // add 1 to the flipped card count
        count++
    }
    // conditional to stop flipping after 2 flips
    if (count === 2) {
        // removing event listener
        cards.forEach(card => card.removeEventListener('click', flipCard));
        // invoke function tests if the two flipped card is a pair
        isAMatch();
        count = 0;
    }
}

// grab the score element
let scoreBoard = document.querySelector('.score');

// TESTING WHETHER A MATCH OR NOT OF 2 CARDS FLIPPED
function isAMatch() {
    //  grab all 2 cards flipped class
    let flipped = document.querySelectorAll('.flip');
    // compare if 2 flipped class cards are a match
    if (flipped[0].dataset.framework === flipped[1].dataset.framework) {
        setTimeout(() => {
            // if it is a match, add matched class for animation and style 
            flipped[0].classList.add('matched');
            flipped[1].classList.add('matched');
            // remove flip class
            flipped[0].classList.remove('flip');
            flipped[1].classList.remove('flip');
            // remove eventlistener for click and flip
            flipped[0].removeEventListener('click', flipCard);
            flipped[1].removeEventListener('click', flipCard);
        }, 900);
        // add to score 
        scores += 4;
        // display on scoreboard
        scoreBoard.innerText = scores;
        //  announce it is a match 
        displayDiv.innerText = "It is a match!";
        //  run winner function when all pairs matched board cleared
        winner()
    } else {
        // if not a pair
        setTimeout(() => {
            // then remove flip class and 
            flipped[0].classList.remove('flip');
            flipped[1].classList.remove('flip');
            // announce it is not a pair
            displayDiv.innerText = "Not a match, try again!"
        }, 700);
    } // keep the eventlistener as it is for next turns until finds its pair
    cards.forEach(card => card.addEventListener('click', flipCard));
}

//SCORE FUNCTION -- display winner score number when all pairs matched
function winner() {
    // when reached to highest score and background board exposed
    if (scores === 32) {
        // display score count
        scoreBoard.innerText = scores;
        // announce them as a winner
        displayDiv.innerText = "YOU WON!";
        // run clear interval function
        clearInterval(clock)
    }
}

// GENERATING RANDOMIZED CARDS FUNCTION
function shuffleCards() {
    cards.forEach(card => {
        let randomCards = Math.floor(Math.random() * 16);
        card.style.order = randomCards;
    })
};
shuffleCards()

// TIMER FUNCTION  
let second = 0
let minute = 0
let hour = 0

// setInterval with incrementing
const setTimer = () => {
    // displaying timer board
    timer.innerText = 'Timer: ' + minute + "mins " + second + ' secs';
    // add to seconds
    second++;
    // conditions when seconds reach to 60
    if (second == 60) {
        // increment minutes by 1
        minute++;
        // then set minutes to 0
        second = 0;
    }
        // if minute reach to 60
    if (minute == 60) {
        // then increment hour by 1
        hour++;
        // and set minute to 0
        minute = 0;
    }
} // set clock
const clock = setInterval(setTimer, 1000);

//  grab reset element and timer
const reset = document.getElementById('reset-btn');
const timer = document.querySelector('.timerBox');

// AUDIO CONTROL FUNCTION
//  grab audio elements
let audio = document.getElementById('strboi')

// add eventlistener by click
audio.addEventListener('click', () => {
    // conditional whether pressed paused or not
    if (audio.paused === true) {
        audio.volume = 0.1
        audio.play()
    } else {
        audio.pause()
    }
})

// RESET FUNCTION -- Play Again
// add the event listener for reset
reset.addEventListener('click', resetGame);

function resetGame() {
    // for loop itirating through all cards 
    for (let i = 0; i < cards.length; i++) {
        // clear display board
        displayDiv.innerText = " ";
        // to remove all classes
        cards[i].classList.remove("flip", "matched");
    } //clear count, score and timer board
    count = 0;
    scores = 0;
    scoreBoard.innerText = scores;
    timer.innerText = "Time: 0 min 0 sec";
    shuffleCards()
    // set clock 
    const clock = setInterval(setTimer, 1000);
    // clear interval
    clearInterval(clock)
    minute = 0
    second = 0
    hour = 0
}