let products;
const productList = document.getElementById("product-list");

function generateFilterOptions() {

}

function renderProductList(products) {
    // Clear the list
    productList.innerHTML = "";

    products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.className = "product-item";

        const title = document.createElement("h3");
        title.textContent = product.title;
        listItem.appendChild(title);

        const description = document.createElement("p");
        description.textContent = product.description;
        listItem.appendChild(description);

        const icon = document.createElement("img");
        icon.src = product.thumbnail;
        icon.alt = product.title + " thumbnail";
        listItem.appendChild(icon);

        productList.appendChild(listItem);
    });
}

// Filtrowanie danych
document.getElementById("filter-btn").addEventListener("click", () => {
    renderProductList(products.filter((product) => product.stock > 0));
});

// Sortowanie danych
document.getElementById("sort-btn").addEventListener("click", () => {
    const sortType = document.getElementById('sort-type').value;
    switch(sortType) {
        case "asc":
            {
                renderProductList([...products].sort((a, b) => a.title.localeCompare(b.title)));
                break;
            }
        case "dsc":
            {
                renderProductList([...products].sort((a, b) => b.title.localeCompare(a.title)));
                break;
            }
        case "reset":
            {
                renderProductList(products);
                break;
            }   
        }
    });
    


fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
        products = data.products;
        renderProductList(products);
    })
    .catch((error) => {
        console.log("Wystąpił błąd:", error);
    });
