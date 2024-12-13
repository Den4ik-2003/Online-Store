let products = JSON.parse(localStorage.getItem("products")) || []; 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cards = document.getElementById("cards");

function addCards(name, img, country, price, count) {
    let div = document.createElement("div");
    div.classList.add("card");
    cards.appendChild(div);

    let h1 = document.createElement("h1");
    h1.innerText = name;
    div.appendChild(h1);

    let image = document.createElement("img");
    image.src = img;
    image.classList.add("cardImg");
    div.appendChild(image);

    let p1 = document.createElement("p");
    p1.innerText = country;
    p1.classList.add("text");
    p1.classList.add("country");
    div.appendChild(p1);

    let div2 = document.createElement("div");
    div2.classList.add("flex");
    div2.classList.add("center");
    div.appendChild(div2);

    let p2 = document.createElement("p");
    p2.innerText = `${price} $`;
    p2.classList.add("text");
    div2.appendChild(p2);

    let input1 = document.createElement("input");
    input1.type = "number";
    input1.min = 1;
    input1.max = count;
    input1.classList.add("cardNumber");
    div2.appendChild(input1);

    let input2 = document.createElement("input");
    input2.type = "button";
    input2.value = "Buy";
    input2.classList.add("btn");
    div2.appendChild(input2);
   
    input2.addEventListener("click", () => {
        let quantity = parseInt(input1.value);
        if (quantity < 1 || quantity > count) {
            alert("Please enter a valid quantity.");
            return;
        }

        let existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity = quantity; 
        } else {
            cart.push({ name: name, quantity: quantity, country: country, price: price }); 
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${quantity} ${name} added to the cart.`);
    });
}

if (products.length > 0) {
    products.forEach(product => {
        addCards(product.name, product.img, product.country, product.price, product.count);
    });
} else {
    alert("No products found.");
}
