// Game state management
const gameState = {
    scores: 0,
    flippedCards: [],
    isProcessing: false,
    timerInterval: null,
    second: 0,
    minute: 0,
    hour: 0
};

// Grab DOM elements
const cards = document.querySelectorAll('.card');
const displayDiv = document.querySelector('.display');
const scoreBoard = document.querySelector('.score');
const timer = document.querySelector('.timerBox');
const reset = document.getElementById('reset-btn');
const audio = document.getElementById('strboi');

// Initialize the game
function initGame() {
    // Set initial score display
    scoreBoard.innerText = `Score: ${gameState.scores}`;
    
    // Add event listeners to cards
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
    
    // Shuffle cards
    shuffleCards();
    
    // Start timer
    startTimer();
    
    // Setup audio control
    setupAudioControl();
    
    // Setup reset button
    reset.addEventListener('click', resetGame);
}

// Handle card click with improved logic
function handleCardClick(e) {
    const clickedCard = e.currentTarget;
    
    // Prevent actions during processing or if card is already flipped/matched
    if (gameState.isProcessing || 
        clickedCard.classList.contains('flip') || 
        clickedCard.classList.contains('matched')) {
        return;
    }
    
    // Flip the card
    clickedCard.classList.add('flip');
    gameState.flippedCards.push(clickedCard);
    
    // Check for match when 2 cards are flipped
    if (gameState.flippedCards.length === 2) {
        gameState.isProcessing = true;
        checkForMatch();
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = gameState.flippedCards;
    
    // Prevent clicking the same card twice
    if (card1 === card2) {
        card1.classList.remove('flip');
        gameState.flippedCards = [];
        gameState.isProcessing = false;
        return;
    }
    
    const isMatch = card1.dataset.framework === card2.dataset.framework;
    
    if (isMatch) {
        handleMatch(card1, card2);
    } else {
        handleMismatch(card1, card2);
    }
}

// Handle matched cards
function handleMatch(card1, card2) {
    displayDiv.innerText = "It's a match!";
    
    setTimeout(() => {
        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        
        // Update score
        gameState.scores += 4;
        scoreBoard.innerText = `Score: ${gameState.scores}`;
        
        // Reset flipped cards
        gameState.flippedCards = [];
        gameState.isProcessing = false;
        
        // Check for win
        checkWinner();
    }, 900);
}

// Handle mismatched cards
function handleMismatch(card1, card2) {
    displayDiv.innerText = "Not a match, try again!";
    
    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        
        // Reset flipped cards
        gameState.flippedCards = [];
        gameState.isProcessing = false;
    }, 700);
}

// Check if player has won
function checkWinner() {
    const totalPairs = cards.length / 2;
    const maxScore = totalPairs * 4;
    
    if (gameState.scores === maxScore) {
        displayDiv.innerText = "YOU WON!";
        stopTimer();
    }
}

// Shuffle cards randomly
function shuffleCards() {
    cards.forEach(card => {
        const randomPosition = Math.floor(Math.random() * cards.length);
        card.style.order = randomPosition;
    });
}

// Timer functions
function startTimer() {
    stopTimer(); // Clear any existing timer
    gameState.second = 0;
    gameState.minute = 0;
    gameState.hour = 0;
    
    gameState.timerInterval = setInterval(() => {
        gameState.second++;
        
        if (gameState.second === 60) {
            gameState.minute++;
            gameState.second = 0;
        }
        
        if (gameState.minute === 60) {
            gameState.hour++;
            gameState.minute = 0;
        }
        
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

function updateTimerDisplay() {
    const hourText = gameState.hour > 0 ? `${gameState.hour}h ` : '';
    timer.innerText = `Timer: ${hourText}${gameState.minute}m ${gameState.second}s`;
}

// Audio control
function setupAudioControl() {
    audio.addEventListener('click', () => {
        if (audio.paused) {
            audio.volume = 0.1;
            audio.play();
        } else {
            audio.pause();
        }
    });
}

// Reset game
function resetGame() {
    // Stop timer
    stopTimer();
    
    // Reset all cards
    cards.forEach(card => {
        card.classList.remove('flip', 'matched');
    });
    
    // Reset game state
    gameState.scores = 0;
    gameState.flippedCards = [];
    gameState.isProcessing = false;
    gameState.second = 0;
    gameState.minute = 0;
    gameState.hour = 0;
    
    // Reset displays
    displayDiv.innerText = "";
    scoreBoard.innerText = `Score: ${gameState.scores}`;
    timer.innerText = "Timer: 0m 0s";
    
    // Shuffle and restart
    shuffleCards();
    startTimer();
}

// Initialize game when DOM is loaded
initGame();
