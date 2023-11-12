let apiData;
let currentDataView;
const productList = document.getElementById("product-list");


/*
Double slider implementation:
https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816
*/
function doubleSlider(slider) {
    const sliderActiveColor = '#0085ea';

    function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, '#C6C6C6', sliderActiveColor, controlSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromSlider.value = from;
        }
    }

    function controlToInput(toSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, '#C6C6C6', sliderActiveColor, controlSlider);
        setToggleAccessible(toInput);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
        }
    }

    function controlFromSlider(fromSlider, toSlider, fromInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#C6C6C6', sliderActiveColor, toSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromInput.value = from;
        }
    }

    function controlToSlider(fromSlider, toSlider, toInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#C6C6C6', sliderActiveColor, toSlider);
        setToggleAccessible(toSlider);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
            toSlider.value = from;
        }
    }

    function getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max - to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget) {
        const toSlider = slider.querySelector('.toSlider');
        if (Number(currentTarget.value) <= 0) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }

    const fromSlider = slider.querySelector('.fromSlider');
    const toSlider = slider.querySelector('.toSlider');
    const fromInput = slider.querySelector('.fromInput');
    const toInput = slider.querySelector('.toInput');

    fillSlider(fromSlider, toSlider, '#C6C6C6', sliderActiveColor, toSlider);
    setToggleAccessible(toSlider);

    fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
    fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
    toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
}

function generateFilterOptions() {
    // Populate category checkboxes
    const categories = [...new Set(apiData.map(product => product.category))];
    const categoryCheckboxes = document.getElementById('categoryCheckboxes');
    categories.forEach(category => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = category;
        checkbox.value = category;
        const label = document.createElement('label');
        label.htmlFor = category;
        label.appendChild(document.createTextNode(category));
        categoryCheckboxes.appendChild(checkbox);
        categoryCheckboxes.appendChild(label);
        categoryCheckboxes.appendChild(document.createElement('br'));
    });

    function updateSliders(type) {
        const minValue = apiData.reduce((min, product) => (product[type] < min ? product[type] : min), Infinity);
        const maxValue = apiData.reduce((max, product) => (product[type] > max ? product[type] : max), 0);
        
        const FromSlider = document.getElementById(`${type}FromSlider`);
        const ToSlider = document.getElementById(`${type}ToSlider`);
        const FromInput = document.getElementById(`${type}FromInput`);
        const ToInput = document.getElementById(`${type}ToInput`);

        FromSlider.setAttribute('min', minValue);
        FromSlider.setAttribute('max', maxValue);
        FromSlider.setAttribute('value', minValue);
        ToSlider.setAttribute('min', minValue);
        ToSlider.setAttribute('max', maxValue);
        ToSlider.setAttribute('value', maxValue);
        FromInput.setAttribute('min', minValue);
        FromInput.setAttribute('max', maxValue);
        FromInput.setAttribute('value', minValue);
        FromInput.setAttribute('step', maxValue);
        ToInput.setAttribute('min', minValue);
        ToInput.setAttribute('max', maxValue);
        ToInput.setAttribute('value', maxValue);
        ToInput.setAttribute('step', maxValue);
    }

    // Update price and stock range labels
    updateSliders('price');
    updateSliders('stock');
}

function renderProductList(products) {
    currentDataView = products;
    document.getElementById('product-count').textContent = `Products number: ${products.length}`;
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

async function fetchData() {
    await fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
            apiData = data.products;
            renderProductList(apiData);
            generateFilterOptions();
        })
        .catch((error) => {
            console.log("Wystąpił błąd:", error);
        });
}

function applyFillters(event) {
    event.preventDefault();
    const categories = [...document.querySelectorAll('#categoryCheckboxes input:checked')].map(checkbox => checkbox.value);
    const minPrice = document.getElementById('priceFromInput').value;
    const maxPrice = document.getElementById('priceToInput').value;
    const minStock = document.getElementById('stockFromInput').value;
    const maxStock = document.getElementById('stockToInput').value;
    const searchText = document.getElementById('searchInput').value;

    const filteredProducts = apiData.filter(product => {
        if (categories.length > 0 && !categories.includes(product.category)) 
            return false;
        if (product.price < minPrice || product.price > maxPrice) 
            return false;
        if (product.stock < minStock || product.stock > maxStock) 
            return false;
        if (searchText !== "" && !product.title.toLowerCase().includes(searchText.toLowerCase())) 
            return false;
        return true;
    });
    console.log(filteredProducts);
    renderProductList(filteredProducts);

}

function applySort() {
    const sortBy = document.getElementById('sort-by').value;
    const sortType = document.getElementById('sort-type').value;

    if (sortBy === 'title') {
        renderProductList([...currentDataView].sort((a, b) => {
            if (sortType === "asc")
                return a[sortBy].localeCompare(b[sortBy])
            else
                return b[sortBy].localeCompare(a[sortBy])
        }));
    }
    else {
        renderProductList([...currentDataView].sort((a, b) => {
            if (sortType === "asc")
                return a[sortBy] - b[sortBy]
            else
                return b[sortBy] - a[sortBy]
        }));
    }
}

// Double slider logic
document.querySelectorAll('.range_container').forEach((slider) => {
    doubleSlider(slider);
});

// Fetching data from API
fetchData();

// Sorting products
document.getElementById("sort-btn").addEventListener("click", applySort);

// Filter products
document.getElementById("filter-btn").addEventListener("click", applyFillters);
