/**
 * Advanced Memory Card Game
 * Data-driven, concise, and maintainable implementation
 */

// Game configuration
const CONFIG = {
    cards: ['cork', 'book', 'mug', 'wallet', 'key', 'fedora', 'remote', 'bottleopener'],
    pointsPerMatch: 4,
    flipDelay: 700,
    matchDelay: 900,
    cardFrontImage: 'wireframe/strboi.png',
    cardBackPath: 'wireframe/cards/'
};

// Game state
const state = {
    flipped: [],
    matched: new Set(),
    locked: false,
    score: 0,
    timer: { interval: null, seconds: 0 }
};

// DOM elements (cached)
const el = {
    board: document.querySelector('[data-game-board]'),
    score: document.querySelector('[data-score]'),
    timer: document.querySelector('[data-timer]'),
    message: document.querySelector('[data-message]'),
    reset: document.querySelector('[data-reset]'),
    audio: document.getElementById('strboi')
};

/**
 * Initialize game
 */
function init() {
    generateCards();
    shuffle();
    setupEventListeners();
    startTimer();
    updateUI();
}

/**
 * Generate card elements dynamically
 */
function generateCards() {
    const cardPairs = [...CONFIG.cards, ...CONFIG.cards]; // Duplicate for pairs
    
    el.board.innerHTML = cardPairs.map((type, index) => `
        <div class="card" data-card data-type="${type}" data-id="${index}">
            <img class="front" src="${CONFIG.cardFrontImage}" alt="card front">
            <img class="back" src="${CONFIG.cardBackPath}${type}-img.jpg" alt="${type}">
        </div>
    `).join('');
}

/**
 * Shuffle cards using CSS order
 */
function shuffle() {
    document.querySelectorAll('[data-card]').forEach(card => {
        card.style.order = Math.floor(Math.random() * 100);
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    el.board.addEventListener('click', handleCardClick);
    el.reset.addEventListener('click', reset);
    el.audio.addEventListener('click', toggleAudio);
}

/**
 * Handle card click with event delegation
 */
function handleCardClick(e) {
    const card = e.target.closest('[data-card]');
    if (!card || !canFlip(card)) return;
    
    flipCard(card);
    state.flipped.push(card);
    
    if (state.flipped.length === 2) {
        state.locked = true;
        checkMatch();
    }
}

/**
 * Check if card can be flipped
 */
function canFlip(card) {
    return !state.locked && 
           !card.classList.contains('flip') && 
           !state.matched.has(card);
}

/**
 * Flip a card
 */
function flipCard(card) {
    card.classList.add('flip');
}

/**
 * Unflip a card
 */
function unflipCard(card) {
    card.classList.remove('flip');
}

/**
 * Check if flipped cards match
 */
function checkMatch() {
    const [card1, card2] = state.flipped;
    const isMatch = card1.dataset.type === card2.dataset.type && 
                    card1.dataset.id !== card2.dataset.id;
    
    if (isMatch) {
        handleMatch(card1, card2);
    } else {
        handleMismatch(card1, card2);
    }
}

/**
 * Handle matched cards
 */
function handleMatch(card1, card2) {
    setMessage("It's a match!");
    
    setTimeout(() => {
        [card1, card2].forEach(card => {
            card.classList.add('matched');
            unflipCard(card);
            state.matched.add(card);
        });
        
        state.score += CONFIG.pointsPerMatch;
        updateUI();
        resetFlipped();
        checkWin();
    }, CONFIG.matchDelay);
}

/**
 * Handle mismatched cards
 */
function handleMismatch(card1, card2) {
    setMessage("Not a match, try again!");
    
    setTimeout(() => {
        unflipCard(card1);
        unflipCard(card2);
        resetFlipped();
    }, CONFIG.flipDelay);
}

/**
 * Reset flipped state
 */
function resetFlipped() {
    state.flipped = [];
    state.locked = false;
}

/**
 * Check for win condition
 */
function checkWin() {
    const totalCards = CONFIG.cards.length * 2;
    if (state.matched.size === totalCards) {
        setMessage("YOU WON!");
        stopTimer();
    }
}

/**
 * Timer functions
 */
function startTimer() {
    stopTimer();
    state.timer.seconds = 0;
    state.timer.interval = setInterval(() => {
        state.timer.seconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (state.timer.interval) {
        clearInterval(state.timer.interval);
        state.timer.interval = null;
    }
}

function updateTimerDisplay() {
    const hours = Math.floor(state.timer.seconds / 3600);
    const minutes = Math.floor((state.timer.seconds % 3600) / 60);
    const seconds = state.timer.seconds % 60;
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
    
    el.timer.textContent = `Timer: ${parts.join(' ')}`;
}

/**
 * Update UI elements
 */
function updateUI() {
    el.score.textContent = `Score: ${state.score}`;
}

/**
 * Set message display
 */
function setMessage(text) {
    el.message.textContent = text;
}

/**
 * Toggle audio playback
 */
function toggleAudio() {
    if (el.audio.paused) {
        el.audio.volume = 0.1;
        el.audio.play();
    } else {
        el.audio.pause();
    }
}

/**
 * Reset game
 */
function reset() {
    // Reset state
    state.flipped = [];
    state.matched = new Set();
    state.locked = false;
    state.score = 0;
    
    // Reset UI
    setMessage("");
    updateUI();
    
    // Reset cards
    document.querySelectorAll('[data-card]').forEach(card => {
        card.classList.remove('flip', 'matched');
    });
    
    // Reset and restart timer
    stopTimer();
    startTimer();
    
    // Reshuffle
    shuffle();
}

// Initialize game on load
init();
