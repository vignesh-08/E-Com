/**
 * AuraStyle - E-Commerce Product Listing Application Logic
 * 
 * Features:
 * - Real-time compound filtering (search + category + sorting)
 * - Persistent cart management using LocalStorage
 * - Accessible Slide-out Cart Drawer with quantity adjustment
 * - Responsive Theme Toggle (Light/Dark mode) with user preference persistence
 * - Interactive UI transitions & user notification toasts
 */

// ==========================================================================
// 1. PRODUCT DATABASE (25 Items across 5 Categories)
// ==========================================================================
const PRODUCTS = [
    // --- CATEGORY: ELECTRONICS ---
    {
        id: 1,
        name: "Wireless Noise-Cancelling Headphones",
        price: 1599,
        category: "electronics",
        image: "assets/headphone_prod.png"
    },
    {
        id: 2,
        name: "Aura Watch Smart Fitness Band",
        price: 1199,
        category: "electronics",
        image: "assets/smartwatch_prod.png"
    },
    {
        id: 3,
        name: "Portable Outdoor Bluetooth Speaker",
        price: 599,
        category: "electronics",
        image: "assets/speaker_prod.png"
    },
    {
        id: 4,
        name: "Ergonomic Silent Wireless Mouse",
        price: 399,
        category: "electronics",
        image: "assets/mouse_prod.png"
    },
    {
        id: 5,
        name: "Custom RGB Mechanical Gaming Keyboard",
        price: 899,
        category: "electronics",
        image: "assets/keyboard_prod.png"
    },

    // --- CATEGORY: FASHION ---
    {
        id: 6,
        name: "Classic Distressed Leather Jacket",
        price: 1999,
        category: "fashion",
        image: "assets/leather_jacket_prod.png"
    },
    {
        id: 7,
        name: "Unisex Vintage Denim Jacket",
        price: 999,
        category: "fashion",
        image: "assets/denim_jacket_prod.png"
    },
    {
        id: 8,
        name: "Stretch Slim-Fit Chino Trousers",
        price: 899,
        category: "fashion",
        image: "assets/chinos_prod.png"
    },
    {
        id: 9,
        name: "Lightweight Hooded Windbreaker Jacket",
        price: 599,
        category: "fashion",
        image: "assets/windbreaker_prod.png"
    },
    {
        id: 10,
        name: "Heavyweight Knit Crewneck Sweater",
        price: 999,
        category: "fashion",
        image: "assets/sweater_prod.png"
    },

    // --- CATEGORY: FOOTWEAR ---
    {
        id: 11,
        name: "Handcrafted Premium Leather Boots",
        price: 1399,
        category: "footwear",
        image: "assets/boots_prod.png"
    },
    {
        id: 12,
        name: "Ultralight Breathable Running Shoes",
        price: 999,
        category: "footwear",
        image: "assets/runshoes_prod.png"
    },
    {
        id: 13,
        name: "Casual Daily Canvas Sneakers",
        price: 499,
        category: "footwear",
        image: "assets/Casual_Daily_Canvas_Sneakers.jpg"
    },
    {
        id: 14,
        name: "Retro Style High-Top Sneakers",
        price: 799,
        category: "footwear",
        image: "assets/Retro_Style_High-Top_Sneakers.jpg"
    },
    {
        id: 15,
        name: "Comfort Foam Slip-On Loafers",
        price: 699,
        category: "footwear",
        image: "assets/Comfort_Foam_Slip-On_Loafers.jpg"
    },

    // --- CATEGORY: ACCESSORIES ---
    {
        id: 16,
        name: "Minimalist RFID Leather Wallet",
        price: 299,
        category: "accessories",
        image: "assets/Minimalist_RFID_Leather_Wallet.jpg"
    },
    {
        id: 17,
        name: "Polarized Retro Wayfarer Sunglasses",
        price: 899,
        category: "accessories",
        image: "assets/Polarized_Retro_Wayfarer_Sunglasses.jpg"
    },
    {
        id: 18,
        name: "Water-Resistant Commuter Travel Backpack",
        price: 699,
        category: "accessories",
        image: "assets/Water-Resistant_Commuter_Travel_Backpack.jpg"
    },
    {
        id: 19,
        name: "Premium Waxed Canvas Duffle Bag",
        price: 849,
        category: "accessories",
        image: "assets/Premium_Waxed_Canvas_Duffle_Bag.jpg"
    },
    {
        id: 20,
        name: "Vacuum Insulated Stainless Steel Bottle",
        price: 299,
        category: "accessories",
        image: "assets/Vacuum_Insulated_Stainless_Steel_Bottle.jpg"
    },

    // --- CATEGORY: HOME DECOR ---
    {
        id: 21,
        name: "Nordic Minimalist Ceramic Vase",
        price: 499,
        category: "home decor",
        image: "assets/Nordic_Minimalist_Ceramic_Vase.jpg"
    },
    {
        id: 22,
        name: "Hand-Woven Organic Cotton Throw Blanket",
        price: 399,
        category: "home decor",
        image: "assets/Hand-Woven_Organic_Cotton_Throw_Blanket.jpg"
    },
    {
        id: 23,
        name: "Premium Soy Wax Scented Candle Set",
        price: 199,
        category: "home decor",
        image: "assets/Premium_Soy_Wax_Scented_Candle_Set.jpg"
    },
    {
        id: 24,
        name: "Modern Brass Desk Accent Table Lamp",
        price: 499,
        category: "home decor",
        image: "assets/Modern_Brass_Desk_Accent_Table_Lamp.jpg"
    },
    {
        id: 25,
        name: "Abstract Geometric Pattern Framed Canvas Art",
        price: 499,
        category: "home decor",
        image: "assets/Abstract_Geometric_Pattern_Framed_Canvas_Art.jpg"
    }
];

// ==========================================================================
// 1.5. OFFLINE VECTOR IMAGE GENERATOR
// ==========================================================================
function generateOfflineImage(id, name, category) {
    // Generate unique gradients per product using HSL mathematical distribution
    const hue = (id * 137) % 360;
    const startColor = `hsl(${hue}, 75%, 55%)`;
    const endColor = `hsl(${(hue + 45) % 360}, 80%, 40%)`;
    let iconMarkup;
    
    switch (category) {
        case "electronics":
            iconMarkup = `
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            `;
            break;
        case "fashion":
            iconMarkup = `
                <path d="M20.38 3.46L16 6.07a2 2 0 0 0-.9-.57l-3.1-3.1a1 1 0 0 0-1.4 0l-3.1 3.1a2 2 0 0 0-.9.57L2.12 3.46A1 1 0 0 0 .8 4.78l2.5 7.5a2 2 0 0 0 1.9 1.36h.6v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6h.6a2 2 0 0 0 1.9-1.36l2.5-7.5a1 1 0 0 0-1.32-1.32z"></path>
            `;
            break;
        case "footwear":
            iconMarkup = `
                <path d="M4 16h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"></path>
                <path d="M4 16V9a2 2 0 0 1 2-2h3l2 4h5a4 4 0 0 1 4 4v1"></path>
            `;
            break;
        case "accessories":
            iconMarkup = `
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            `;
            break;
        case "home decor":
            iconMarkup = `
                <path d="M9 18h6l-1.5-8h-3z"></path>
                <path d="M12 10V3"></path>
                <path d="M8 3h8"></path>
                <path d="M12 18v3"></path>
                <path d="M10 21h4"></path>
            `;
            break;
        default:
            iconMarkup = `
                <circle cx="12" cy="12" r="10"></circle>
            `;
    }

    const initials = name
        .split(" ")
        .filter(word => word.length > 0)
        .slice(0, 3)
        .map(word => word[0].toUpperCase())
        .join("");

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
            <defs>
                <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${startColor}" />
                    <stop offset="100%" stop-color="${endColor}" />
                </linearGradient>
                <filter id="shadow-${id}" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.15" />
                </filter>
            </defs>
            <rect width="400" height="400" fill="url(#grad-${id})" />
            <g stroke="rgba(255,255,255,0.05)" stroke-width="1.5">
                <line x1="40" y1="0" x2="40" y2="400" />
                <line x1="80" y1="0" x2="80" y2="400" />
                <line x1="120" y1="0" x2="120" y2="400" />
                <line x1="160" y1="0" x2="160" y2="400" />
                <line x1="200" y1="0" x2="200" y2="400" />
                <line x1="240" y1="0" x2="240" y2="400" />
                <line x1="280" y1="0" x2="280" y2="400" />
                <line x1="320" y1="0" x2="320" y2="400" />
                <line x1="360" y1="0" x2="360" y2="400" />
                <line x1="0" y1="40" x2="400" y2="40" />
                <line x1="0" y1="80" x2="400" y2="80" />
                <line x1="0" y1="120" x2="400" y2="120" />
                <line x1="0" y1="160" x2="400" y2="160" />
                <line x1="0" y1="200" x2="400" y2="200" />
                <line x1="0" y1="240" x2="400" y2="240" />
                <line x1="0" y1="280" x2="400" y2="280" />
                <line x1="0" y1="320" x2="400" y2="320" />
                <line x1="0" y1="360" x2="400" y2="360" />
            </g>
            <circle cx="200" cy="180" r="75" fill="rgba(255, 255, 255, 0.15)" filter="url(#shadow-${id})" />
            <circle cx="200" cy="180" r="70" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.25)" stroke-width="2" />
            <g transform="translate(160, 140) scale(3.3)" stroke="#ffffff" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                ${iconMarkup}
            </g>
            <text x="200" y="310" fill="#ffffff" font-family="'Outfit', sans-serif" font-weight="700" font-size="22" text-anchor="middle" letter-spacing="1">
                ${initials}
            </text>
            <text x="200" y="335" fill="rgba(255, 255, 255, 0.6)" font-family="'Inter', sans-serif" font-weight="600" font-size="12" text-anchor="middle" letter-spacing="2">
                ${category.toUpperCase()}
            </text>
        </svg>
    `;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ==========================================================================
// 2. STATE CONFIGURATION
// ==========================================================================
let cart = [];

const filters = {
    searchQuery: "",
    category: "all",
    sortBy: "default"
};

// ==========================================================================
// 3. DOM ELEMENT REFERENCES
// ==========================================================================
const DOM = {
    productGrid: document.getElementById("product-grid"),
    emptyState: document.getElementById("empty-state"),
    resultsCount: document.getElementById("results-count"),
    searchInput: document.getElementById("search-input"),
    searchClear: document.getElementById("search-clear"),
    categoryFilter: document.getElementById("category-filter"),
    priceSort: document.getElementById("price-sort"),
    resetFiltersBtn: document.getElementById("reset-filters-btn"),
    themeToggle: document.getElementById("theme-toggle"),
    cartBtn: document.getElementById("cart-btn"),
    cartCount: document.getElementById("cart-count"),
    cartOverlay: document.getElementById("cart-overlay"),
    cartDrawer: document.getElementById("cart-drawer"),
    cartClose: document.getElementById("cart-close"),
    cartItems: document.getElementById("cart-items"),
    cartDrawerCount: document.getElementById("cart-drawer-count"),
    cartSubtotal: document.getElementById("cart-subtotal"),
    clearCartBtn: document.getElementById("clear-cart-btn"),
    checkoutBtn: document.getElementById("checkout-btn"),
    toastContainer: document.getElementById("toast-container")
};

// ==========================================================================
// 4. THEME CONTROLLER
// ==========================================================================
function initTheme() {
    const savedTheme = localStorage.getItem("aura-theme");
    // Default to system preferences or light theme
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const defaultTheme = prefersDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", defaultTheme);
        localStorage.setItem("aura-theme", defaultTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("aura-theme", nextTheme);
    showToast(`Switched to ${nextTheme} mode`);
}

// ==========================================================================
// 5. SHOPPING CART ENGINE
// ==========================================================================
function initCart() {
    const savedCart = localStorage.getItem("aura-cart");
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            // Ensure cart items use generated offline images if they exist in PRODUCTS database
            cart.forEach(item => {
                const prod = PRODUCTS.find(p => p.id === item.id);
                if (prod) {
                    item.image = prod.image;
                }
            });
        } catch (e) {
            cart = [];
            localStorage.setItem("aura-cart", JSON.stringify(cart));
        }
    }
    renderCart();
}

function saveCart() {
    localStorage.setItem("aura-cart", JSON.stringify(cart));
}

function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    
    // Trigger animation wobble on the header badge
    DOM.cartCount.classList.remove("wobble");
    void DOM.cartCount.offsetWidth; // Force reflow
    DOM.cartCount.classList.add("wobble");

    showToast(`Added "${product.name}" to cart`);
}

function removeFromCart(productId) {
    const itemIdx = cart.findIndex(item => item.id === productId);
    if (itemIdx === -1) return;
    
    const itemName = cart[itemIdx].name;
    cart.splice(itemIdx, 1);
    
    saveCart();
    renderCart();
    showToast(`Removed "${itemName}"`);
}

function updateQuantity(productId, newQty) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (newQty <= 0) {
        removeFromCart(productId);
    } else {
        item.quantity = newQty;
        saveCart();
        renderCart();
    }
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm("Are you sure you want to clear all items from your cart?")) {
        cart = [];
        saveCart();
        renderCart();
        showToast("Cart cleared");
    }
}

function renderCart() {
    // 1. Calculate totals
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // 2. Update badge counters
    DOM.cartCount.textContent = totalCount;
    DOM.cartDrawerCount.textContent = totalCount;
    DOM.cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    // 3. Render drawer items
    if (cart.length === 0) {
        DOM.cartItems.innerHTML = `
            <div class="cart-empty-view">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Your shopping cart is empty</p>
            </div>
        `;
        DOM.clearCartBtn.style.display = "none";
        DOM.checkoutBtn.disabled = true;
    } else {
        DOM.clearCartBtn.style.display = "block";
        DOM.checkoutBtn.disabled = false;
        
        DOM.cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
                    <div class="cart-item-controls">
                        <!-- Quantity selector -->
                        <div class="qty-selectors">
                            <button class="qty-btn" aria-label="Decrease quantity" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" aria-label="Increase quantity" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <!-- Trash delete btn -->
                        <button class="remove-item-btn" aria-label="Remove item" onclick="removeFromCart(${item.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function toggleCartDrawer(isOpen) {
    if (isOpen) {
        DOM.cartOverlay.classList.add("active");
        DOM.cartDrawer.classList.add("active");
        DOM.cartDrawer.setAttribute("aria-hidden", "false");
        DOM.cartOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background body scroll
    } else {
        DOM.cartOverlay.classList.remove("active");
        DOM.cartDrawer.classList.remove("active");
        DOM.cartDrawer.setAttribute("aria-hidden", "true");
        DOM.cartOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}

// ==========================================================================
// 6. FILTER, SEARCH & SORT LOGIC
// ==========================================================================
function renderProducts(filteredList) {
    if (filteredList.length === 0) {
        DOM.productGrid.style.display = "none";
        DOM.emptyState.style.display = "flex";
    } else {
        DOM.productGrid.style.display = "grid";
        DOM.emptyState.style.display = "none";
        
        DOM.productGrid.innerHTML = filteredList.map(product => `
            <article class="product-card" data-id="${product.id}">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                    <span class="product-badge">${product.category}</span>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name" title="${product.name}">${product.name}</h3>
                    <div class="product-price-row">
                        <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" onclick="addToCart(${product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </article>
        `).join('');
    }

    // Update product counter text description
    const count = filteredList.length;
    let desc = "";
    const catName = filters.category === "all" ? "all categories" : filters.category;
    
    if (count === 0) {
        desc = `No products found in "${catName}"`;
    } else if (count === 1) {
        desc = `Showing 1 product in "${catName}"`;
    } else {
        desc = `Showing ${count} products in "${catName}"`;
    }

    if (filters.searchQuery.trim() !== "") {
        desc += ` matching "${filters.searchQuery}"`;
    }
    
    DOM.resultsCount.textContent = desc;
}

function applyFilters() {
    let result = [...PRODUCTS];

    // 1. Text Search Filter
    if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase().trim();
        result = result.filter(item => item.name.toLowerCase().includes(query));
    }

    // 2. Category Dropdown Filter
    if (filters.category !== "all") {
        result = result.filter(item => item.category === filters.category);
    }

    // 3. Price Sorting
    if (filters.sortBy === "low-to-high") {
        result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "high-to-low") {
        result.sort((a, b) => b.price - a.price);
    }
    // "default" keeps the initial array order

    renderProducts(result);
}

function resetFilters() {
    filters.searchQuery = "";
    filters.category = "all";
    filters.sortBy = "default";

    DOM.searchInput.value = "";
    DOM.categoryFilter.value = "all";
    DOM.priceSort.value = "default";
    DOM.searchClear.style.display = "none";

    applyFilters();
    showToast("Filters reset to default");
}

// ==========================================================================
// 7. TOAST FEEDBACK NOTIFIER
// ==========================================================================
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    // Garbage collect toasts after animation ends (2.5 seconds)
    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// ==========================================================================
// 8. EVENT BINDING & INTERACTIVITY INITIALIZATION
// ==========================================================================
function setupEventListeners() {
    // --- Theme Toggler ---
    DOM.themeToggle.addEventListener("click", toggleTheme);

    // --- Search Input Box ---
    DOM.searchInput.addEventListener("input", (e) => {
        filters.searchQuery = e.target.value;
        if (filters.searchQuery.trim() !== "") {
            DOM.searchClear.style.display = "flex";
        } else {
            DOM.searchClear.style.display = "none";
        }
        applyFilters();
    });

    // Clear Search Input Button
    DOM.searchClear.addEventListener("click", () => {
        DOM.searchInput.value = "";
        filters.searchQuery = "";
        DOM.searchClear.style.display = "none";
        applyFilters();
        DOM.searchInput.focus();
    });

    // --- Select Category Dropdown ---
    DOM.categoryFilter.addEventListener("change", (e) => {
        filters.category = e.target.value;
        applyFilters();
    });

    // --- Select Price Sort Dropdown ---
    DOM.priceSort.addEventListener("change", (e) => {
        filters.sortBy = e.target.value;
        applyFilters();
    });

    // --- Empty State Filter Reset Button ---
    DOM.resetFiltersBtn.addEventListener("click", resetFilters);

    // --- Drawer System Toggle ---
    DOM.cartBtn.addEventListener("click", () => toggleCartDrawer(true));
    DOM.cartClose.addEventListener("click", () => toggleCartDrawer(false));
    DOM.cartOverlay.addEventListener("click", () => toggleCartDrawer(false));

    // Keyboard Accessibility for closing drawer (ESC key)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            toggleCartDrawer(false);
        }
    });

    // Mock Checkout action
    DOM.checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) return;
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        alert(`Order placed successfully!\nTotal paid: ₹${total.toLocaleString('en-IN')}\n\nThank you for shopping at AuraStyle!`);
        cart = [];
        saveCart();
        renderCart();
        toggleCartDrawer(false);
    });

    // Clear Cart action
    DOM.clearCartBtn.addEventListener("click", clearCart);
}

// Global scope attachment for inline onclick handles
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

// ==========================================================================
// 9. APP INITIALIZATION TRIGGER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Generate unique offline SVG vectors for items sharing the same category fallback images
    PRODUCTS.forEach(p => {
        if (p.image === "assets/electronics.png" || 
            p.image === "assets/fashion.png" || 
            p.image === "assets/footwear.png" || 
            p.image === "assets/accessories.png" || 
            p.image === "assets/home_decor.png") {
            p.image = generateOfflineImage(p.id, p.name, p.category);
        }
    });

    initTheme();
    initCart();
    applyFilters(); // Renders the default 25 products initially
    setupEventListeners();
});
