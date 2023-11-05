const view = document.querySelector("#view")
const test_bt = document.querySelector("#test")
const on_bt = document.querySelector("#on-bt")
const off_bt = document.querySelector("#off-bt")

on_bt.addEventListener('click', counterOn)
off_bt.addEventListener('click', counterOff)

let counter = 0

function counterOn() {
    test_bt.addEventListener('click', counterIncrease)
    view.innerHTML = "Licznik włączony"
    on_bt.removeEventListener('click', counterOn)
}

function counterOff() {
    test_bt.removeEventListener('click', counterIncrease)
    on_bt.addEventListener('click', counterOn)
    view.innerHTML = "Licznik wyłączony"
    counter = 0
}

function counterIncrease() {
    view.innerHTML = counter + 1
    counter += 1
}