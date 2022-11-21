document.querySelector("#change").addEventListener('click', change)
var flag = 0

function change_dla_sierot(){
    var img = document.getElementById("image");
    if(img.classList.contains("first")) {
        img.src="https://i.domyseniora.pl/d10/37/17-g-ry-dla-seniora-jak-si.jpg";
        img.style.border = "10px solid red"
        img.classList.remove("first")
        img.classList.add("second")
        
    } else if (img.classList.contains("second")){
        img.src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sea_morze_fale_waves_Baltic.jpg/1200px-Sea_morze_fale_waves_Baltic.jpg";
        img.style.border = "10px solid blue"
        img.classList.remove("second")
        img.classList.add("third")

    } else {
        img.src="https://www.kawiarniany.pl/wp-content/uploads/2020/05/do-lasu.jpg";
        img.style.border = "10px solid green"
        img.classList.remove("third")
        img.classList.add("first")
    }
    
}

function change() {
    flag += 1
    images = [
        [
            "https://i.domyseniora.pl/d10/37/17-g-ry-dla-seniora-jak-si.jpg",
            "10px solid red"
    ],
        [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sea_morze_fale_waves_Baltic.jpg/1200px-Sea_morze_fale_waves_Baltic.jpg",
            "10px solid blue"
    ],
        [
            "https://www.kawiarniany.pl/wp-content/uploads/2020/05/do-lasu.jpg",
            "10px solid green"
        ]


    ]

    let img = document.querySelector("#image")
    img.setAttribute("src", images[(flag + 1) % 3][0])
    img.className = "image" + flag
    img.style.border=images[(flag + 1) % 3][1]
}