// grab elements and store
const cards = document.querySelectorAll('.card');
const displayDiv = document.querySelector('.display');
let matched = document.querySelectorAll('.matched');

let scores = 0
let count = 0; //track of flipped cards

// add eventListener to each card
cards.forEach(card => card.addEventListener('click', flipCard));

// FLIPPING CARDS FUNCTION 
function flipCard(e) {
    // passing event parameter to flipcard , condition : if the event target doesnt have the class list of flip add 1 to the count
    if (e.target.offsetParent.className !== 'card flip') {
        this.classList.add('flip');
        count++
    }
    // conditional to stop flipping after 2 flips
    if (count === 2) {
        // this.classList.add('flip');
        cards.forEach(card => card.removeEventListener('click', flipCard));
        isAMatch();
        count = 0;
    }
}

let scoreBoard = document.querySelector('.score');

// TESTING WHETHER A MATCH OR NOT OF 2 CARDS FLIPPED
function isAMatch() {
    //  grab all 2 cards flipped class
    let flipped = document.querySelectorAll('.flip');
    // compare if 2 flipped class cards are a match
    if (flipped[0].dataset.framework === flipped[1].dataset.framework) {
        setTimeout(() => {
            // if it is a match, add match class for animation and style and remove flip class
            flipped[0].classList.add('matched');
            flipped[1].classList.add('matched');
            flipped[0].classList.remove('flip');
            flipped[1].classList.remove('flip');
            flipped[0].removeEventListener('click', flipCard);
            flipped[1].removeEventListener('click', flipCard);
        }, 900);
        // add to score 
        scores += 4;
        // display on scoreboard
        scoreBoard.innerText = scores;
        //  announce whether is a match or not
        displayDiv.innerText = "It is a match!";
        //  run winner function
        winner()
    } else {
        // if not a match
        setTimeout(() => {
            flipped[0].classList.remove('flip');
            flipped[1].classList.remove('flip');
            displayDiv.innerText = "Not a match, try again!"
        }, 700);
    } cards.forEach(card => card.addEventListener('click', flipCard));
}

//SCORE FUNCTION -- // display score number 
function winner() {
    if (scores === 32) {
        scoreBoard.innerText = scores;
        displayDiv.innerText = "YOU WON!";
        // clear interval
        clearInterval(clock)
    }
}

const reset = document.getElementById('reset-btn');
const timer = document.querySelector('.timerBox');

// RESET FUNCTION --Play Again
reset.addEventListener('click', resetGame);

function resetGame() {
    for (let i = 0; i < cards.length; i++) {
        displayDiv.innerText = " ";
        cards[i].classList.remove("flip", "matched");
    }
    count = 0;
    scores = 0;
    scoreBoard.innerText = scores;
    timer.innerText = "Time: 0 min 0 sec";
    shuffleCards()
    const clock = setInterval(setTimer, 1000);
    clearInterval(clock)
    minute = 0
    second = 0
    hour = 0
    
}

// RANDOMIZING CARDS
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
    timer.innerText = 'Timer: ' + minute + "mins " + second + ' secs';
    second++;
    if (second == 60) {
        minute++;
        second = 0;
    }
    if (minute == 60) {
        hour++;
        minute = 0;
    }
}
    const clock = setInterval(setTimer, 1000);