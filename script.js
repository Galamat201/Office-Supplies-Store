// ===== PRODUCTS DATA =====
const products = [
  { id: 1, name: "Notebook", price: 3 },
  { id: 2, name: "Pen", price: 1 },
  { id: 3, name: "Pencil", price: 0.5 },
  { id: 4, name: "Stapler", price: 5 },
  { id: 5, name: "Marker", price: 2 },
];

// ===== CART STATE =====
let cart = [];

// ===== ELEMENTS =====
const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cartItems");
const totalEl = document.getElementById("total");

// ===== LOAD PRODUCTS =====
function loadProducts() {
  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <span>${p.name} - $${p.price}</span>
      <button class="add" onclick="addToCart(${p.id})">Add</button>
    `;
    productsEl.appendChild(div);
  });
}

// ===== ADD TO CART =====
function addToCart(id) {
  const item = cart.find((i) => i.id === id);

  if (item) {
    item.qty++;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

// ===== CHANGE QUANTITY (+ / -) =====
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeItem(id);
  } else {
    renderCart();
  }
}

// ===== REMOVE ITEM =====
function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

// ===== RENDER CART =====
function renderCart() {
  cartEl.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        ${item.qty}
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        <button class="remove" onclick="removeItem(${item.id})">✕</button>
      </div>
    `;
    cartEl.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
}

// ===== INIT =====
loadProducts();
