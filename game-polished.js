/**
 * Polished Memory Card Game
 * Advanced animations, transitions, and modern audio controls
 */

// Game configuration
const CONFIG = {
    cards: ['cork', 'book', 'mug', 'wallet', 'key', 'fedora', 'remote', 'bottleopener'],
    pointsPerMatch: 4,
    flipDelay: 600,
    matchDelay: 400,
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
    score: document.querySelector('[data-score] .stat-value'),
    timer: document.querySelector('[data-timer] .stat-value'),
    message: document.querySelector('[data-message]'),
    reset: document.querySelector('[data-reset]'),
    audio: document.getElementById('game-audio'),
    audioToggle: document.querySelector('[data-audio-toggle]'),
    volumeSlider: document.querySelector('[data-volume-slider]')
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
    setupAudio();
}

/**
 * Generate card elements dynamically
 */
function generateCards() {
    const cardPairs = [...CONFIG.cards, ...CONFIG.cards];
    
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
    el.reset.addEventListener('click', resetGame);
    el.audioToggle.addEventListener('click', toggleAudio);
    el.volumeSlider.addEventListener('input', handleVolumeChange);
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
 * Flip a card with animation
 */
function flipCard(card) {
    card.classList.add('flip');
    playSound('flip');
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
 * Handle matched cards with celebration animation
 */
function handleMatch(card1, card2) {
    setMessage("It's a match! 🎉");
    playSound('match');
    
    setTimeout(() => {
        [card1, card2].forEach(card => {
            card.classList.add('matched');
            state.matched.add(card);
        });
        
        state.score += CONFIG.pointsPerMatch;
        updateUI();
        animateScore();
        resetFlipped();
        checkWin();
    }, CONFIG.matchDelay);
}

/**
 * Handle mismatched cards with shake animation
 */
function handleMismatch(card1, card2) {
    setMessage("Not a match, try again! 🤔");
    playSound('mismatch');
    
    // Add shake animation
    card1.classList.add('shake');
    card2.classList.add('shake');
    
    setTimeout(() => {
        card1.classList.remove('shake');
        card2.classList.remove('shake');
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
        setMessage("🎊 YOU WON! 🎊");
        stopTimer();
        playSound('win');
        celebrateWin();
    }
}

/**
 * Celebrate win with confetti-like animation
 */
function celebrateWin() {
    el.board.style.animation = 'pulse 0.5s ease 3';
    setTimeout(() => {
        el.board.style.animation = '';
    }, 1500);
}

/**
 * Animate score increase
 */
function animateScore() {
    const scoreElement = el.score.parentElement.parentElement;
    scoreElement.style.animation = 'none';
    setTimeout(() => {
        scoreElement.style.animation = 'pulse 0.5s ease';
    }, 10);
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
    
    el.timer.textContent = parts.join(' ');
}

/**
 * Update UI elements
 */
function updateUI() {
    el.score.textContent = state.score;
}

/**
 * Set message display with animation
 */
function setMessage(text) {
    el.message.textContent = text;
    el.message.style.animation = 'none';
    setTimeout(() => {
        el.message.style.animation = 'messageGlow 1.5s ease-in-out infinite';
    }, 10);
}

/**
 * Audio setup and controls
 */
function setupAudio() {
    // Set initial volume
    el.audio.volume = 0.3;
    
    // Try to auto-play immediately
    el.audio.play().then(() => {
        el.audioToggle.classList.add('playing');
    }).catch(() => {
        // Auto-play blocked by browser, will play on first click
        el.audioToggle.classList.remove('playing');
        document.addEventListener('click', function playOnce() {
            el.audio.play().then(() => {
                el.audioToggle.classList.add('playing');
            }).catch(() => {});
        }, { once: true });
    });
}

/**
 * Toggle audio playback
 */
function toggleAudio() {
    if (el.audio.paused) {
        el.audio.play();
        el.audioToggle.classList.add('playing');
    } else {
        el.audio.pause();
        el.audioToggle.classList.remove('playing');
    }
}

/**
 * Handle volume slider change
 */
function handleVolumeChange(e) {
    const volume = e.target.value / 100;
    el.audio.volume = volume;
}

/**
 * Play sound effects (placeholder - can be expanded)
 */
function playSound(type) {
    // Sound effects can be added here
    // For now, we'll use the main audio as background music
    switch(type) {
        case 'flip':
            // Card flip sound
            break;
        case 'match':
            // Match success sound
            break;
        case 'mismatch':
            // Mismatch sound
            break;
        case 'win':
            // Win celebration sound
            break;
    }
}

/**
 * Reset game with smooth transition
 */
function reset() {
    // Fade out animation
    el.board.style.opacity = '0.5';
    el.board.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Stop timer
        stopTimer();
        
        // Reset all cards
        document.querySelectorAll('[data-card]').forEach(card => {
            card.classList.remove('flip', 'matched', 'shake');
        });
        
        // Reset game state
        state.flipped = [];
        state.matched = new Set();
        state.locked = false;
        state.score = 0;
        state.timer.seconds = 0;
        
        // Reset displays
        setMessage("");
        updateUI();
        el.timer.textContent = "0m 0s";
        
        // Shuffle and restart
        shuffle();
        startTimer();
        
        // Fade in animation
        el.board.style.opacity = '1';
        el.board.style.transform = 'scale(1)';
        
        // Regenerate cards with entrance animation
        generateCards();
        shuffle();
    }, 300);
}

// Initialize game when DOM is loaded
init();
