const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startButton = document.querySelector('.start');
const gameOverScreen = document.querySelector('.game-over');
const deathCounterElement = document.querySelector('.death-counter');
const restartButton = document.querySelector('.restart-button'); // Adicionado o seletor para o botão de reinício

let deaths = 0;
let loopInterval;

audioStart = new Audio('./src/audio/audio_theme.mp3');
audioGameOver = new Audio('./src/audio/audio_gameover.mp3');

const startGame = () => {
    pipe.classList.add('pipe-animation');
    startButton.style.display = 'none';
    audioStart.play();
    loopInterval = setInterval(loop, 10);
};

const restartGame = () => {
    gameOverScreen.style.display = 'none';
    pipe.style.left = '';
    pipe.style.right = '0';
    mario.src = './src/img/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.play();
    audioStart.currentTime = 0;

    deaths = 0;
    deathCounterElement.textContent = `Mortes: ${deaths}`;

    loopInterval = setInterval(loop, 10);
};

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
};

const loop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.classList.remove('pipe-animation');
        pipe.style.left = `${pipePosition}px`;

        mario.classList.remove('jump');
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './src/img/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '50px';

        audioStart.pause();
        audioGameOver.play();

        gameOverScreen.style.display = 'flex';
        deaths++;
        deathCounterElement.textContent = `Mortes: ${deaths}`;

        clearInterval(loopInterval);
    }
};

// Eventos de teclado e toque
document.addEventListener('keypress', e => {
    if (e.key === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump();
    }
});

document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        startGame();
    }
});

// Adicionando um event listener para o botão de reinício
restartButton.addEventListener('click', restartGame);
startButton.addEventListener('click', startGame);

// Inicia o loop quando a página carrega, mas sem animação
loopInterval = setInterval(loop, 10);
