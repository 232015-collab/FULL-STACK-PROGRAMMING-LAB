const products = new Map();

products.set(1, { name: "Laptop", price: 1200, icon: "💻" });
products.set(2, { name: "Phone", price: 800, icon: "📱" });
products.set(3, { name: "Tablet", price: 500, icon: "📟" });
products.set(4, { name: "Mouse", price: 50, icon: "🖱️" });
products.set(5, { name: "Keyboard", price: 70, icon: "⌨️" });

// Search Product
function searchProduct(id) {
    return products.get(id);
}

// Delete Product (Mouse)
products.delete(4);

const container = document.getElementById("productsContainer");
let output = "";

products.forEach((value, key) => {
    output += `
    <div class="product-card">
        <div class="product-icon">${value.icon}</div>
        <h3>${value.name}</h3>
        <p class="product-price">$${value.price.toLocaleString()}</p>
        <span class="product-id">ID: ${key}</span>
    </div>`;
});

container.innerHTML = output;

// Update stats
document.getElementById("totalProducts").innerText = products.size;