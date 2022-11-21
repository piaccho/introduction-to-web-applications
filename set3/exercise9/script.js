const CARD_SHIFT = 200;
const wrapper = document.querySelector(".wrapper");
const cards = document.querySelectorAll(".card");
const cardsArray = Array.from(cards)

// shifting cards
function shiftCards(currIdx) {
    cardsArray.forEach((card, i) => {
        card.style.transform = `translateX(${(i - currIdx) * CARD_SHIFT}%)`;
    });
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - 1 - min + 1)) + min;

// starting from center
let currCardIdx = Math.floor(cardsArray.length/2);

// left button
document.querySelector(".left.btn").addEventListener('click', (event)=>{
    if (currCardIdx == 1) {
        currCardIdx++;
        const elementToMove = cardsArray[cardsArray.length - 1];
        elementToMove.style.transform = `translateX(${-CARD_SHIFT*2}%)`;

        wrapper.removeChild(wrapper.lastChild);
        wrapper.prepend(elementToMove);
        
        cardsArray.pop();
        cardsArray.unshift(elementToMove);

    } 
    currCardIdx--;
    shiftCards(currCardIdx);
});

// right button
document.querySelector(".right.btn").addEventListener('click', (event)=>{
    if (currCardIdx == cardsArray.length - 2) {
        currCardIdx--;
        const elementToMove = cardsArray[0];
        elementToMove.style.transform = `translateX(${2*CARD_SHIFT}%)`;

        wrapper.removeChild(wrapper.firstChild);
        wrapper.appendChild(elementToMove);
        
        cardsArray.shift();
        cardsArray.push(elementToMove);

    } 
    currCardIdx++;
    shiftCards(currCardIdx);  
});

// random button
document.querySelector(".random-btn").addEventListener('click', (event)=>{
    let newIdx = currCardIdx;
    while (newIdx == currCardIdx) {newIdx = getRandomInt(0, cardsArray.length);}    
    shiftCards(newIdx);
    currCardIdx = newIdx;
});