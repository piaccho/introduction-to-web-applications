// TODO
// 1. change health bar to lives
// 2. change points to score

const cursor = document.querySelector('#cursor');
const ammoAmount = document.querySelector('#ammo-amount');
const healthBar = document.querySelector('#health-bar');
const pointsCounter = document.querySelector('#points-counter');
const mainMenu = document.querySelector('#main-menu');
const startButton = document.querySelector('#start-btn');
const gameContainer = document.querySelector('#game-container');

const CURSOR_IMG_SIZE = window.innerWidth * 0.2;
const BULLET_HOLE_IMG_SIZE = window.innerWidth*0.05;
const BULLET_HOLE_DURATION = 6000;
const BULLET_HOLE_DISAPPEAR_START = 3000;
const FADE_DELAY = 100;
const RELOAD_DELAY = 500;
const MAX_AMMO_AMOUNT = 7;
const MAX_HEALTH = 3;
const START_POINTS = 30;

let shotingAvailable = false;
let gameRunning = false;
const stats = {
    ammo: MAX_AMMO_AMOUNT, 
    health: MAX_HEALTH,
    points: START_POINTS,
}

const moveCursor = (e) => {
    body.style.cursor = 'none';
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
    for (let i = 0; i < MAX_HEALTH; i++) {
        const health = document.createElement('div');
        health.classList.add('health');
        healthBar.appendChild(health);
    }
    ammoAmount.innerHTML = stats.ammo;
    pointsCounter.innerHTML = String(START_POINTS).padStart(5, '0');
};


const spawnZombie = () => {
    if (gameRunning && stats.score >= 0) {
        const zombie = document.createElement('div');
        const randomZombieSize = Math.floor(Math.random() * 0.6) + 0.7;
        zombie.className = 'zombie';
        console.log(zombie.style.width, zombie.style.height);
        // zombie.style.height = `${Math.floor(Math.random() * 50) + 30}px`;
        zombie.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 50))}px`;
        zombie.style.left = `${gameContainer.clientWidth}px`;
        gameContainer.appendChild(zombie);
    }
}

const moveZombies = () => {
    if (gameRunning) {
        const zombies = document.querySelectorAll('.zombie');
        zombies.forEach(zombie => {
            const zombieSpeed = Math.floor(Math.random() * 5) + 1;
            const currentLeft = parseFloat(zombie.style.left);
            zombie.style.left = `${currentLeft - zombieSpeed}px`;

            // Check for collision with left edge of the game container
            if (currentLeft - zombieSpeed < 0) {
                zombie.remove();
                lives--;
            }
        });

        // Check if the game should end
        if (score < 0 || lives === 0) {
            endGame();
        }
    }
}

const clearZombies = () => {
    const zombies = document.querySelectorAll('.zombie');
    zombies.forEach(zombie => zombie.remove());
}

const endGame = () => {
    gameRunning = false;
    clearZombies();
    window.removeEventListener('mousemove', moveCursor);
    window.removeEventListener('click', shot);
    mainMenu.style.display = 'flex';
}


startButton.addEventListener('click', () => {
    if(!gameRunning) {
        gameRunning = true;
        mainMenu.style.display = 'none';

        loadInterface();
        window.addEventListener('mousemove', moveCursor)
        shotingAvailable = true;
        window.addEventListener('click', shot);

        setInterval(spawnZombie, 1000);
        setInterval(moveZombies, 100);
    };
});

