import { productsData } from "./task2product.js";

/* ==========================================
   ES6 CLASSES — Task 2
   Data | Ui | Storage
========================================== */

class Data {
  static getProducts() {
    return productsData;
  }
}

class Storage {
  static saveCart(cart) {
    localStorage.setItem("es6_cart", JSON.stringify(cart));
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("es6_cart")) || [];
  }
}

class Ui {
  constructor() {
    // DOM refs
    this.grid = document.getElementById("productsGrid");
    this.cartOverlay = document.getElementById("cartOverlay");
    this.cartItems = document.getElementById("cartItems");
    this.cartEmpty = document.getElementById("cartEmpty");
    this.cartBadge = document.getElementById("cartBadge");
    this.cartTotal = document.getElementById("cartTotal");
    this.productCount = document.getElementById("productCount");

    // State
    this.cart = Storage.getCart();

    // Bind events
    document.getElementById("cartBtn").addEventListener("click", () => this.openCart());
    document.getElementById("closeCart").addEventListener("click", () => this.closeCart());
    document.getElementById("cartOverlay").addEventListener("click", (e) => {
      if (e.target === this.cartOverlay) this.closeCart();
    });
    document.getElementById("clearCart").addEventListener("click", () => this.clearCart());

    this.renderProducts();
    this.renderCart();
  }

  /* ---- PRODUCTS ---- */
  renderProducts() {
    const products = Data.getProducts();
    this.productCount.textContent = `${products.length} items`;
    let html = "";
    products.forEach((p, i) => {
      const inCart = this.cart.some(c => c.id === p.id);
      html += `
            <div class="product-card" style="animation-delay:${i * 0.06}s">
                <div class="product-image-wrap">
                    <span>${p.icon}</span>
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <p class="product-title">${p.title}</p>
                    <p class="product-price">$${p.price}</p>
                    <button class="add-to-cart-btn"
                        data-id="${p.id}"
                        ${inCart ? "disabled" : ""}>
                        ${inCart ? "✓ In Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>`;
    });
    this.grid.innerHTML = html;

    // Attach add-to-cart handlers
    this.grid.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        this.addToCart(id);
      });
    });
  }

  /* ---- CART CRUD ---- */
  addToCart(id) {
    const product = Data.getProducts().find(p => p.id === id);
    if (!product) return;

    const existing = this.cart.find(c => c.id === id);
    if (existing) { existing.qty++; }
    else { this.cart.push({ ...product, qty: 1 }); }

    Storage.saveCart(this.cart);
    this.renderProducts();
    this.renderCart();
    this.openCart();
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(c => c.id !== id);
    Storage.saveCart(this.cart);
    this.renderProducts();
    this.renderCart();
  }

  changeQty(id, delta) {
    const item = this.cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { this.removeFromCart(id); return; }
    Storage.saveCart(this.cart);
    this.renderCart();
  }

  clearCart() {
    this.cart = [];
    Storage.saveCart(this.cart);
    this.renderProducts();
    this.renderCart();
  }

  /* ---- RENDER CART ---- */
  renderCart() {
    // Badge
    const totalQty = this.cart.reduce((a, c) => a + c.qty, 0);
    this.cartBadge.textContent = totalQty;

    // Total
    const totalPrice = this.cart.reduce((a, c) => a + c.price * c.qty, 0);
    this.cartTotal.textContent = `$${totalPrice}`;

    // Empty state
    if (this.cart.length === 0) {
      this.cartEmpty.style.display = "block";
      // Remove any existing items – keep empty msg
      this.cartItems.querySelectorAll(".cart-item").forEach(el => el.remove());
      return;
    }

    this.cartEmpty.style.display = "none";

    // Build items HTML
    let html = "";
    this.cart.forEach(item => {
      html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-info">
                    <p class="ci-title">${item.title}</p>
                    <p class="ci-price">$${item.price} each</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                    <span class="qty-number">${item.qty}</span>
                    <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                    <button class="remove-btn" data-id="${item.id}">✕</button>
                </div>
            </div>`;
    });

    // Replace only cart-item nodes (keep cart-empty node)
    this.cartItems.querySelectorAll(".cart-item").forEach(el => el.remove());
    this.cartEmpty.insertAdjacentHTML("afterend", html);

    // Bind controls
    this.cartItems.querySelectorAll(".qty-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.changeQty(Number(btn.dataset.id), Number(btn.dataset.delta));
      });
    });
    this.cartItems.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.removeFromCart(Number(btn.dataset.id));
      });
    });
  }

  /* ---- MODAL ---- */
  openCart() { this.cartOverlay.classList.add("open"); }
  closeCart() { this.cartOverlay.classList.remove("open"); }
}

/* ---- INIT ---- */
document.addEventListener("DOMContentLoaded", () => new Ui());