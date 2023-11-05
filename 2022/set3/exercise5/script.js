let counter = 0;

const statusElement = document.querySelector("#status");

const counterElement = document.querySelector("#counter");

function updateCounter(val) {
    console.log(counter)
    counter += val;
    counterElement.innerHTML = counter;
}

document.querySelector("#first").addEventListener('onclick', updateCounter(1))
document.querySelector("#second").addEventListener('onclick', updateCounter(2))
document.querySelector("#third").addEventListener('onclick', updateCounter(5))