function answer1(json) {
    let print = ""
    json
    .filter((entry) => entry.province === "małopolskie")
    .forEach((element) => {
        print += element.name + ", "
    })
    // slice(0, -2) usuwa ostatnie 2 znaki (dla nas ", ")
    document.getElementById("ans1").innerHTML += print.slice(0, -2) + "."
}

function answer2(json) {
    json
    .filter((entry) => entry.name.toLowerCase().length - entry.name.toLowerCase().replaceAll("a","").length === 2)
    .forEach((entry) => {document.getElementById("ans2").innerHTML += entry.name + ", "})
    // slice(0, -2) usuwa ostatnie 2 znaki (dla nas ", ")
    document.getElementById("ans2").innerHTML = document.getElementById("ans2").innerHTML.slice(0, -2) + "."
}

function answer3(json) {
    document.getElementById("ans3").innerHTML += json.sort((a, b) => b.dentensity - a.dentensity)[4].name
}

function answer4(json) {
    json
    .filter((entry) => entry.people > 100000)
    .forEach((entry) => {
        entry.name += " City"
        document.getElementById("ans4").innerHTML += entry.name + ", "})
}

function answer5(json) {
    const total = json.length
    let more, less;
    let amount = json.filter((entry) => entry.people > 80000).length;
    if (amount > total/2) {
        more = "powyżej"
        less = "poniżej"
    } else {
        more = "poniżej"
        less = "powyżej"
        amount = total - amount
    }

    document.getElementById("ans5").innerHTML += `Wiecej jest miast ${more} 80 000 mieszkańców. Miast ${more} 80 000 mieszkańców jest ${amount} a ${less} ${total - amount}`
}

function answer6(json) {
    const citiesP = json.filter((entry) => entry.township.charAt(0) === 'P').map(entry => entry.area)
    const avgArea = citiesP.reduce((prevSum, currArea) => prevSum + currArea, 0) / citiesP.length
   
    document.getElementById("ans6").innerHTML += `Średnia powierzchnia miast z powiatów zaczynających się na literę "P" wynosi: ${avgArea}`
}

function answer7(json) {
    const cities = json.filter((entry) => entry.province === "pomorskie")
    const ans = cities.every(entry => entry.people > 5000) ? "Tak" : "Nie"
    const over5k = cities.filter(entry => entry.people > 5000).length
    document.getElementById("ans7").innerHTML = `Czy wszystkie miasta z województwa pomorskiego są większe od 5000 osób? Odpowiedź: ${ans}<br>Miast z województwa pomorskiego większych od 5000 osób jest ${over5k} spośród wszystkich ${cities.length} w tym województwie.`
}

fetch("http://localhost:3000/cities")
.then((response) => response.json())
.then((data) => {
    answer1(data)
    answer2(data)
    answer3(data)
    answer4(data)
    answer5(data)
    answer6(data)
    answer7(data)
})
