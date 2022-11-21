const hideButtons = document.querySelectorAll(".hide-bt")
const validRules = [
    /.{8,}/,        // 8 characters
    /.*[!@#$%^&*]/, // 1 special char
    /.*[A-Z]/,      // 1 uppercase char
    /.*[0-9]/       // 1 digit
]

const validationIndicators = document.querySelector("ul").children


function validatePassword() {
    let flag = true;
    const inputPassword = document.querySelector("#newPass");
    const password = inputPassword.value;

    validRules.forEach((rule, idx) => {
        if (rule.test(password)) {
            validationIndicators[idx].firstChild.setAttribute("src", "img/valid.svg");
            validationIndicators[idx].firstChild.style.filter = "invert(54%) sepia(18%) saturate(1294%) hue-rotate(128deg) brightness(94%) contrast(95%)"
        } else {
            validationIndicators[idx].firstChild.setAttribute("src", "img/non-valid.svg");
            validationIndicators[idx].firstChild.style.filter = "invert(78%) sepia(0%) saturate(31%) hue-rotate(229deg) brightness(88%) contrast(89%)"
            flag = false
        };
        
    })
    if (flag) {
        inputPassword.style.border = "3px solid #2fa09a"
    } else {
        inputPassword.style.border = "1px solid grey"
    }
}

function comparePasswords() {
    const inputPassword = document.querySelector("#repPass");
    const password = inputPassword.value;
    const comparePass = document.querySelector("#newPass").value;
    if (password === comparePass) {
        document.querySelector(".diff").style.visibility = "hidden";
        inputPassword.style.border = "3px solid #2fa09a"
    } else {
        document.querySelector(".diff").style.visibility = "visible";
        inputPassword.style.border = "1px solid grey"
    }
}



hideButtons.forEach((btn) => {btn.addEventListener('click', (e) => {
    const input = e.currentTarget.parentNode.children[0];
    if (input.type === "password") {
        input.type = "text";
        e.currentTarget.style.background = "url(img/eye-crossed.svg) no-repeat";
    } else {
        input.type = "password";
        e.currentTarget.style.background = "url(img/eye.svg) no-repeat";
    }
    e.currentTarget.style.backgroundSize = "100%"
})})

document.querySelector("#newPass").addEventListener("input", validatePassword)
document.querySelector("#repPass").addEventListener("input", comparePasswords)