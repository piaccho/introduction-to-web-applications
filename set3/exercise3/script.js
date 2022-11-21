var listElementsNumber = document.querySelector("#list").childElementCount

document.querySelector("#add").addEventListener("click", add)

document.querySelector("#del").addEventListener("click", del)

function add(){
    let elementList = document.createElement('li')
    elementList.innerHTML = "Item" + (listElementsNumber + 1)
    document.getElementById("list").appendChild(elementList)
    listElementsNumber += 1
}

function del(){
    var list = document.getElementById("list")
    list.removeChild(list.childNodes[0])
}