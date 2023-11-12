// TODO
// 2. change score to score
// 3. add zombie move speed
// 4. add zombie spawn interval
// 5. add zombie hit animation
// 6. add zombie death animation
// 8. fix click button shot
// 9. fix blinking lives bar animation
// 10. add score of shooting and killing zombies

const cursor = document.querySelector('#cursor');
const totalScoreEndGame = document.querySelector('#total-score-value');
const ammoAmount = document.querySelector('#ammo-amount');
const livesBar = document.querySelector('#lives-bar');
const score = document.querySelector('#score');
const mainMenu = document.querySelector('#main-menu');
const gameOverScreen = document.querySelector('#game-over');
const gameButtons = document.querySelectorAll('.game-btn');
const gameContainer = document.querySelector('#game-container');

const CURSOR_IMG_SIZE = window.innerWidth * 0.2;
const BULLET_HOLE_IMG_SIZE = window.innerWidth*0.05;
const BULLET_HOLE_DURATION = 6000;
const BULLET_HOLE_DISAPPEAR_START = 3000;
const FADE_DELAY = 100;
const RELOAD_DELAY = 500;
const MAX_AMMO_AMOUNT = 7;
const MAX_LIVES = 3;
const START_SCORE = 30;
// const ZOMBIE_MOVE_SPEED = 5;
// const ZOMBIE_SPAWN_INTERVAL = 1000;

let shotingAvailable = false;
let gameRunning = false;
const stats = {
    ammo: MAX_AMMO_AMOUNT, 
    lives: MAX_LIVES,
    score: START_SCORE,
    printScore: () => {
        return String(START_SCORE).padStart(5, '0');
    }
}


const moveCursor = (e) => {
    document.querySelector("body").classList.add('aim-mode');
    cursor.style.display = 'block';
    cursor.style.transform = `translate3d(${e.clientX - CURSOR_IMG_SIZE / 2}px, ${e.clientY - CURSOR_IMG_SIZE / 2}px, 0)`;
}

const reload = () => {
    shotingAvailable = false;
    const reloadInterval = setInterval(() => {
        stats.ammo++;
        ammoAmount.innerHTML = stats.ammo;
        new Audio('assets/sounds/reload.mp3').play();
    }, RELOAD_DELAY);
    setTimeout(() => {
        clearInterval(reloadInterval);
        shotingAvailable = true;
    }, RELOAD_DELAY * (MAX_AMMO_AMOUNT + 1));
}

const shot = (e) => {
    if(!shotingAvailable) return;

    new Audio('assets/sounds/shot.mp3').play();
    stats.ammo--;
    ammoAmount.innerHTML = stats.ammo;
    if(stats.ammo <= 0) {
        reload();
    }
    

    const bulletHole = document.createElement('div');
    bulletHole.classList.add('bullet-hole');
    bulletHole.style.transform = `translate3d(${e.clientX - BULLET_HOLE_IMG_SIZE / 2}px, ${e.clientY - BULLET_HOLE_IMG_SIZE / 2}px, 0)`;
    document.body.appendChild(bulletHole);

    let bulletHoleFadeInterval;
    setTimeout(() => {
        bulletHoleFadeInterval = setInterval(() => {
            const fadeValue = (1 / ((BULLET_HOLE_DURATION - BULLET_HOLE_DISAPPEAR_START) / FADE_DELAY)).toFixed(2); 
            bulletHole.style.opacity -= fadeValue;
        }, FADE_DELAY);
    }, BULLET_HOLE_DISAPPEAR_START); 
    setTimeout(() => {
        clearInterval(bulletHoleFadeInterval);
        bulletHole.remove();
    }, BULLET_HOLE_DURATION);
}

const loadInterface = () => {
    for (let i = 0; i < MAX_LIVES; i++) {
        const liveHeart = document.createElement('div');
        liveHeart.classList.add('full-heart');
        livesBar.appendChild(liveHeart);
    }
    ammoAmount.innerHTML = stats.ammo;
    score.innerHTML = stats.printScore();
};


const spawnZombie = () => {
    if (gameRunning && stats.score >= 0) {
        const zombie = document.createElement('div');
        const randomZombieSize = Math.floor(Math.random() * 0.6) + 0.7;
        zombie.className = 'zombie';
        // zombie.style.height = `${Math.floor(Math.random() * 50) + 30}px`;
        // zombie.style.bottom = `${Math.floor(Math.random() * (gameContainer.clientHeight - 50))}px`;
        zombie.style.bottom = `${gameContainer.clientHeight}px`;
        zombie.style.left = `${gameContainer.clientWidth}px`;
        gameContainer.appendChild(zombie);
    }
}

const moveZombies = () => {
    if (gameRunning) {
        const zombies = document.querySelectorAll('.zombie');
        zombies.forEach(zombie => {
            const zombieSpeed = Math.floor(Math.random() * 50) + 1;
            const currentLeft = parseFloat(zombie.style.left);
            zombie.style.left = `${currentLeft - zombieSpeed}px`;

            // Check for collision with left edge of the game container
            if (currentLeft - zombieSpeed < 0) {
                zombie.remove();
                decreaseLives();
            }
        });
    }
}

const decreaseLives = () => { 
    stats.lives--;
    const liveHearts = document.querySelectorAll('.full-heart');

    if (liveHearts.length > 0) {
        lastHeart = liveHearts[liveHearts.length - 1];
        lastHeart.classList.remove('full-heart');
        lastHeart.classList.add('empty-heart');
    }
    if (stats.lives <= 0) {
        endGame();
    }
}

const clearZombies = () => {
    const zombies = document.querySelectorAll('.zombie');
    zombies.forEach(zombie => zombie.remove());
}

const gameOverLivesAnimation = () => {
    livesBar.style.animation = 'blink 3s linear infinite';
    setTimeout(() => {
        livesBar.style.animation = 'none';
    }, 3000);
}

const endGame = () => {
    gameRunning = false;
    window.removeEventListener('click', shot);
    gameOverLivesAnimation();
    setTimeout(() => {
        totalScoreEndGame.innerHTML = stats.printScore();
        window.removeEventListener('mousemove', moveCursor);
        document.querySelector("body").classList.remove('aim-mode');
        cursor.style.display = 'block';
        gameContainer.style.display = 'none';
        gameOverScreen.style.display = 'flex';
        clearZombies();
    }, 3000);
}

const initGame = (e) => {
    e.stopPropagation();
    if (!gameRunning) {
        gameRunning = true;
        gameContainer.style.display = 'block';
        mainMenu.style.display = 'none';

        loadInterface();
        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('click', shot);
        shotingAvailable = true;

        setInterval(spawnZombie, 1000);
        setInterval(moveZombies, 100);
    };
}

gameButtons.forEach(buttom => buttom.addEventListener('click', initGame));

