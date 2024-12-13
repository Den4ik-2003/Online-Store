let products = [
    { name: "Apple", img: "../images/apple.png", country: "Ukraine", price: 1, count: 20 },
    { name: "Orange", img: "../images/orange.webp", country: "Azerbijan", price: 2, count: 50 },
    { name: "Pineapple", img: "../images/pineapple.png", country: "India", price: 1.5, count: 20 },
    { name: "Pear", img: "../images/pear.png", country: "Ukraine", price: 1.5, count: 25 },
    { name: "Banana", img: "../images/banana.png", country: "India", price: 1.8, count: 50 },
    { name: "Cherry", img: "../images/cherry.webp", country: "Ukraine", price: 2.3, count: 200 },
    { name: "Pomegranate", img: "../images/pomegranate.webp", country: "Azerbijan", price: 2, count: 10 },
    { name: "Mango", img: "../images/mango.webp", country: "India", price: 6.5, count: 100 }
];

if(localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
} else {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
    let table = document.getElementById("productTable");

    table.innerHTML = 
        `<tr>
            <th>#</th>
            <th>Name</th>
            <th>Country</th>
            <th>Price</th>
            <th>Count</th>
            <th>Actions</th>
        </tr>`;

    products = JSON.parse(localStorage.getItem("products"));

    products.forEach((product, index) => {
        let row = document.createElement("tr");

        row.innerHTML = 
            `<td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.country}</td>
            <td>${product.price} $</td>
            <td>${product.count}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="removeProduct(${index})">Remove</button>
            </td>`;

        table.appendChild(row);
    });
}

function editProduct(index) {
    let product = products[index];

    document.getElementById("editName").value = product.name;
    document.getElementById("editCountry").value = product.country;
    document.getElementById("editPrice").value = product.price;
    document.getElementById("editCount").value = product.count;

    let modal = document.getElementById("editModal");
    modal.style.display = "block";

    document.getElementById("editForm").onsubmit = (e) => {
        e.preventDefault();

        products[index].name = document.getElementById("editName").value;
        products[index].country = document.getElementById("editCountry").value;
        products[index].price = parseFloat(document.getElementById("editPrice").value);
        products[index].count = parseInt(document.getElementById("editCount").value);

        localStorage.setItem("products", JSON.stringify(products));

        modal.style.display = "none";

        displayProducts();
    };
}

function removeProduct(index) {
    if (confirm("Are you sure you want to remove this product?")) {

        products.splice(index, 1);

        localStorage.setItem("products", JSON.stringify(products));

        displayProducts();
    }
}

document.querySelector(".close").onclick = () => {
    document.getElementById("editModal").style.display = "none";
};

window.onclick = (event) => {
    if (event.target === document.getElementById("editModal")) {
        document.getElementById("editModal").style.display = "none";
    }
};

displayProducts();

