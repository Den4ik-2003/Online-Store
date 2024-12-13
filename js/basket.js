let cart = JSON.parse(localStorage.getItem("cart")) || [];  

function displayCart() {
    let cartTable = document.getElementById("cartTable"); 

    if (cart.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='4'>Your cart is empty</td></tr>";
        return;
    }

    cartTable.innerHTML = 
        `<tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>`;

    cart.forEach(item => {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = item.name;
        row.appendChild(nameCell);

        let quantityCell = document.createElement("td");
        quantityCell.innerText = item.quantity;
        row.appendChild(quantityCell);

        let priceCell = document.createElement("td");
        priceCell.innerText = `$${item.price}`;
        row.appendChild(priceCell);

        let totalCell = document.createElement("td");
        totalCell.innerText = `$${(item.quantity * item.price).toFixed(2)}`;
        row.appendChild(totalCell);

        cartTable.appendChild(row);
    });

    let totalAmount = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    let totalRow = document.createElement("tr");

    let totalLabel = document.createElement("td");
    totalLabel.colSpan = 3;
    totalLabel.innerText = "Total:";
    totalRow.appendChild(totalLabel);

    let totalValue = document.createElement("td");
    totalValue.innerText = `$${totalAmount.toFixed(2)}`;
    totalRow.appendChild(totalValue);

    cartTable.appendChild(totalRow);

    let btnClear = document.createElement("button");
    btnClear.style.width = "100%";
    btnClear.style.padding = "20px";
    btnClear.style.marginTop = "20px";
    btnClear.style.cursor = "pointer";
    btnClear.style.fontSize = "24px";
    btnClear.innerText = "Clear Cart";

    btnClear.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        displayCart();
        alert("Cart has been cleared.");
    });

    document.body.appendChild(btnClear);
}

displayCart();
