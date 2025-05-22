// Sample Product Data
const products = [
    {
        id: 1,
        name: "Classic White Tee",
        price: 2000,
        image: "assets/w.jpeg",
        description: "Our classic white t-shirt made from 100% organic cotton for maximum comfort."
    },
    {
        id: 2,
        name: "Black Graphic Tee",
        price: 2800,
        image: "assets/black.webp",
        description: "Stylish black t-shirt with a unique graphic print. Perfect for casual outings."
    },
    {
        id: 3,
        name: "Vintage Red Tee",
        price: 2500,
        image: "assets/red.jpeg",
        description: "Vintage-inspired red t-shirt with a distressed look for that retro feel."
    },
    {
        id: 4,
        name: "Blue Striped Tee",
        price: 3000,
        image: "assets/blue.webp",
        description: "Navy blue t-shirt with white stripes for a nautical look."
    },
    {
        id: 5,
        name: "Green Pocket Tee",
        price: 2500,
        image: "assets/tshirt_hs_men_pat_d48_o.jpg",
        description: "Olive green t-shirt with a chest pocket for added style."
    },
    {
        id: 6,
        name: "Grey Oversized Tee",
        price: 3500,
        image: "assets/puma.jpeg",
        description: "Comfortable oversized grey t-shirt for a relaxed fit."
    },
    {
        id: 7,
        name: "Yellow Summer Tee",
        price:  2200,
        image: "assets/yello.jpeg",
        description: "Bright yellow t-shirt perfect for summer days."
    },
    {
        id: 8,
        name: "Pink Tie-Dye Tee",
        price: 2700,
        image: "assets/pink.jpeg",
        description: "Trendy pink tie-dye t-shirt for a unique look."
    }
];

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productGrid = document.getElementById('products');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartLink = document.getElementById('cart-link');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

// Display Products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to Cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}

// Remove from Cart
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart
function updateCart() {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '₹0.00';
    } else {
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">₹${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = '₹' + total.toFixed(2);
    }
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Show Cart Notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Toggle Cart
function toggleCart() {
    cartOverlay.style.display = cartOverlay.style.display === 'flex' ? 'none' : 'flex';
}

// Event Listeners
if (cartLink) {
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });
}

if (closeCartBtn) {
    closeCartBtn.addEventListener('click', toggleCart);
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality would go here in a real implementation!');
    });
}

// Close cart when clicking outside
cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
        toggleCart();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
    
    // Check if we're on the shop page to initialize cart functionality
    if (window.location.pathname.includes('.vscode/shop.html')) {
        // Any shop-specific initialization
    }
});