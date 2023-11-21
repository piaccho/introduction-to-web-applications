// TODO
//  FIX RANDOM VALUES OF zombie move speed and size
//  add zombie death animation
//  config
//  instructions in main menu


const cursor = document.querySelector('#cursor');
const totalScoreEndGame = document.querySelector('#total-score-value');
const ammoAmount = document.querySelector('#ammo-amount');
const livesBar = document.querySelector('#lives-bar');
const score = document.querySelector('#score');
const mainMenu = document.querySelector('#main-menu');
const gameOverScreen = document.querySelector('#game-over');
const gameButtons = document.querySelectorAll('.game-btn');
const gameContainer = document.querySelector('#game-container');
const plane = document.querySelector('#plane');


// CONFIG
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
let spawnZombieInterval;
let moveZombieInterval;

const stats = {
    ammo: MAX_AMMO_AMOUNT, 
    lives: MAX_LIVES,
    score: START_SCORE,
}

const randomScaler = (value) => {
    // console.log(`[Random scaler] value: ${value}`);
    return Math.floor(Math.random() * value);
} 

const updateScoreCounter = (value) => {
    stats.score += value;
    score.innerHTML = String(Math.max(0, stats.score)).padStart(5, '0');
    totalScoreEndGame.innerHTML = String(Math.max(0, stats.score)).padStart(5, '0');

}

const moveCursor = (e) => {
    document.querySelector("body").classList.add('aim-mode');
    cursor.style.display = 'block';
    cursor.style.transform = `translate3d(${e.clientX - CURSOR_IMG_SIZE / 2}px, ${e.clientY - CURSOR_IMG_SIZE / 2}px, 0)`;
}

const reload = () => {
    shotingAvailable = false;
    const reloadInterval = setInterval(() => {
        if(gameRunning) {
            stats.ammo++;
            ammoAmount.innerHTML = stats.ammo;
            new Audio('assets/sounds/reload.mp3').play();
        }
    }, RELOAD_DELAY);
    setTimeout(() => {
        clearInterval(reloadInterval);
        shotingAvailable = true;
    }, RELOAD_DELAY * (MAX_AMMO_AMOUNT + 1));
}

const createBulletHole = (e) => {
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
};

const isColliding = (x, y, target) => {
    const rect = target.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

const shot = (e) => {
    if(shotingAvailable && stats.score >= 0) {
        // shotingAvailable = false;
        new Audio('assets/sounds/shot.mp3').play();
        stats.ammo--;
        ammoAmount.innerHTML = stats.ammo;
        if(stats.ammo <= 0) {
            reload();
        } 
        // else {
        //     setTimeout(() => {
        //         shotingAvailable = true;
        //     }, 500);
        // }
        
        let targetHit = false;
        document.querySelectorAll('.zombie').forEach(zombie => {
            if (isColliding(e.clientX, e.clientY, zombie) && !targetHit) {
                targetHit = true;
                updateScoreCounter(10);
                zombie.remove();
            } 
        });

        if(!targetHit) {
            updateScoreCounter(-3);
            createBulletHole(e);
        };

        
    }

};

const loadConfig = () => {
    stats.lives = MAX_LIVES;
    stats.score = START_SCORE;
    stats.ammo = MAX_AMMO_AMOUNT;
};

const loadInterface = () => {
    ammoAmount.innerHTML = stats.ammo;
    score.innerHTML = String(stats.score).padStart(5, '0');
    // reset livesbar
    livesBar.innerHTML = '';
    for (let i = 0; i < stats.lives; i++) {
        const liveHeart = document.createElement('div');
        liveHeart.classList.add('full-heart');
        livesBar.appendChild(liveHeart);
    }
};

const spawnZombie = () => {
    if (gameRunning) {
        const zombie = document.createElement('div');
        // FIX THIS
        const randomZombieSizeRatio = randomScaler(0.6) + 0.7;
        // console.log(randomZombieSizeRatio);  
        zombie.className = 'zombie';
        // zombie.style.height = `${(31.2 * randomZombieSizeRatio)}vw`;
        // zombie.style.width = `${(20 * randomZombieSizeRatio)}vw`;
        zombie.style.bottom = `${Math.floor((gameContainer.clientHeight + randomScaler(150)))}px`;
        // zombie.style.bottom = `${gameContainer.clientHeight}px`;
        zombie.style.left = `${gameContainer.clientWidth}px`;
        plane.appendChild(zombie);

        // zombie.addEventListener('click', () => {
        //     if (gameRunning && shotingAvailable) {
        //         console.log(stats.score);
        //         stats.score += 10;
        //         zombie.remove();
        //     }
        //   });
    }
}

const moveZombies = () => {
    if (gameRunning) {
        const zombies = document.querySelectorAll('.zombie');
        zombies.forEach(zombie => {
            // const randomZombieSpeed = randomScaler(0.3);
            const zombieSpeed = Math.floor(1);
            const currentLeft = parseFloat(zombie.style.left);
            // console.log(`Move zombie with speed: ${currentLeft - randomZombieSpeed}`);
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

const clearBulletHolles = () => {
    const bulletHoles = document.querySelectorAll('.bullet-hole');
    bulletHoles.forEach(bulletHole => bulletHole.remove());
}

const gameOverLivesAnimation = () => {
    const animationInterval = setInterval(() => {
        livesBar.style.opacity = 0;
        setTimeout(() => {
            livesBar.style.opacity = 1;
        }, 250);
     }, 500);
    setTimeout(() => {
        clearInterval(animationInterval);
    }, 3000);
}

const endGame = () => {
    gameRunning = false;
    window.removeEventListener('click', shot);
    gameOverLivesAnimation();
    setTimeout(() => {
        clearInterval(spawnZombieInterval);
        clearInterval(moveZombieInterval);
        clearZombies();
        clearBulletHolles();
        window.removeEventListener('mousemove', moveCursor);
        cursor.style.display = 'block';
        document.querySelector("body").classList.remove('aim-mode');
        
        gameContainer.style.display = 'none';
        gameOverScreen.style.display = 'flex';
    }, 3000);
}


const initGame = (e) => {
    e.stopPropagation();
    
    if (!gameRunning) {
        gameRunning = true;

        mainMenu.style.display = 'none';
        gameOverScreen.style.display = 'none'; 
        gameContainer.style.display = 'block';
        
        loadConfig();
        loadInterface();

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('click', shot);
        shotingAvailable = true;

        
        spawnZombieInterval = setInterval(spawnZombie, 1000);
        moveZombieInterval = setInterval(moveZombies, 10);
    };
}

gameButtons.forEach(buttom => buttom.addEventListener('click', initGame));

