
const GAME_DURATION = 15; 
let clickCount = 0;
let timeLeft = GAME_DURATION;
let gameActive = false;
let intervalId = null;
let timeoutId = null;

// DOM элементы
const clickBtn = document.getElementById('clickBtn');
const clickCountDisplay = document.getElementById('clickCount');
const timerDisplay = document.getElementById('timer');
const gameOverDiv = document.getElementById('gameOver');
const resultMessage = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');

document.addEventListener('DOMContentLoaded', function() {
    startGame();
});


function startGame() {
    clickCount = 0;
    timeLeft = GAME_DURATION;
    gameActive = true;
    

    clickCountDisplay.textContent = clickCount;
    timerDisplay.textContent = timeLeft;
    

    clickBtn.disabled = false;
    clickBtn.textContent = 'Клик';
    

    gameOverDiv.classList.remove('show');
    resultMessage.textContent = '';
    

    intervalId = setInterval(updateTimer, 1000);
    

    timeoutId = setTimeout(endGame, GAME_DURATION * 1000);
}


function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    

    if (timeLeft <= 5) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
    

    if (timeLeft <= 0) {
        clearInterval(intervalId);
        endGame();
    }
}


function handleClick() {
    if (!gameActive) {
        return;
    }
    
    clickCount++;
    clickCountDisplay.textContent = clickCount;
    clickBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickBtn.style.transform = 'scale(1)';
    }, 100);
}


function endGame() {
    gameActive = false;
    

    clearInterval(intervalId);
    clearTimeout(timeoutId);
    

    clickBtn.disabled = true;
    clickBtn.textContent = 'Игра окончена';
    

    resultMessage.textContent = `🎉 Игра окончена! Вы набрали ${clickCount} кликов!`;
    gameOverDiv.classList.add('show');
}


function restartGame() {
    startGame();
}

clickBtn.addEventListener('click', handleClick);
restartBtn.addEventListener('click', restartGame);
