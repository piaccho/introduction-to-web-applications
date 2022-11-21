let formData = new FormData(document.querySelector('#form'))

const validRules = {
    name: /[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+/,   // name and last name
    number: /(?<!\w)((\+|00)?48)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/ // number
    // number: /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/ // number
    }

function isValid(formName, formPhone){
    return validRules.name.test(formName) && validRules.number.test(formPhone)
}

function addingDelBtn(element) {
    element.addEventListener('click', (event) => {
    const cardToRemove = event.currentTarget.parentNode
    document.querySelector("#card-list").removeChild(cardToRemove);
})
}

let delBtns = document.querySelectorAll(".del-btn")


document.querySelector("#add").addEventListener('click', () => {
    formData = new FormData(document.querySelector('#form'))
    const name = formData.get("name");
    const phone = formData.get("phone");
    if(!isValid(name, phone)) {
        document.querySelector("#invalid").visibility = "visible"
        return
    }
    document.querySelector("#invalid").visibility = "hidden"
    
    // SPOSÓB 1 -   createElement i appendowanie

    // const newCard = document.createElement("div")
    // newCard.className = "card"
    // const newCard_details = document.createElement("div")
    // newCard_details.className = "details"
    // newCard.appendChild(newCard_details)
    // const newCard_details_name = document.createElement("span")
    // newCard_details_name.textContent = name
    // const newCard_details_phone = document.createElement("span")
    // newCard_details_phone.textContent = phone
    // newCard_details.appendChild(newCard_details_name)
    // newCard_details.appendChild(newCard_details_phone)
    // const newCard_del_btn = document.createElement("div")
    // newCard_del_btn.className = "del-btn"
    // addingDelBtn(newCard_del_btn)
    // newCard.appendChild(newCard_del_btn)
    // const newCard_del_btn_img = document.createElement("img")
    // newCard_del_btn_img.setAttribute("src", "img/trash.svg")
    // newCard_del_btn_img.setAttribute("alt", "delete")
    // newCard_del_btn.appendChild(newCard_del_btn_img)
    // document.querySelector("#card-list").appendChild(newCard);


    // SPOSÓB 2 -   template literal

    // const newCard = 
        //    `<div class="card">
        //         <div class="details">
        //             <span class="name">${name}</span>
        //             <span class="phone">${phone}</span>
        //         </div>
        //         <div class="del-btn"><img src="img/trash.svg" alt="delete"></div>
        //     </div>`
    // addingDelBtn(newCard.childNodes[1])
    // document.querySelector("#card-list").innerHTML += newCard;



    // SPOSÓB 3 -   HTML + JS

    const cardToAdd = document.createElement('div');
    cardToAdd.className = "card";
    cardToAdd.innerHTML = document.getElementById('card-to-add').innerHTML;

    cardToAdd.innerHTML = cardToAdd.innerHTML
        .replace(/{NAME}/, name)
        .replace(/{PHONE}/, phone);

    addingDelBtn(cardToAdd.childNodes[1])
    document.querySelector("#card-list").appendChild(cardToAdd);
})

delBtns.forEach((btn) => {addingDelBtn(btn)})  

    
