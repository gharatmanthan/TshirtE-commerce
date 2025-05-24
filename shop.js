// Enhanced Product Data with categories and additional details
const products = [
    {
        id: 1,
        name: "Classic White Tee",
        price: 2000,
        image: "assets/w.jpeg",
        description: "Our classic white t-shirt made from 100% organic cotton for maximum comfort. Perfect for layering or wearing on its own.",
        category: ["men", "unisex"],
        rating: 4.5,
        reviews: 128,
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray"],
        isNew: false
    },
    {
        id: 2,
        name: "Black Graphic Tee",
        price: 2800,
        image: "assets/black.webp",
        description: "Stylish black t-shirt with a unique graphic print. Perfect for casual outings. Made from premium cotton blend for softness and durability.",
        category: ["men"],
        rating: 4.2,
        reviews: 86,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        isNew: false
    },
    {
        id: 3,
        name: "Vintage Red Tee",
        price: 2500,
        image: "assets/red.jpeg",
        description: "Vintage-inspired red t-shirt with a distressed look for that retro feel. Pre-washed for extra softness and authentic vintage appearance.",
        category: ["men", "unisex"],
        rating: 4.7,
        reviews: 215,
        sizes: ["S", "M", "L"],
        colors: ["Red", "Navy"],
        isNew: false,
        onSale: true,
        originalPrice: 3000
    },
    {
        id: 4,
        name: "Blue Striped Tee",
        price: 3000,
        image: "assets/blue.webp",
        description: "Navy blue t-shirt with white stripes for a nautical look. Made from breathable pima cotton for all-day comfort.",
        category: ["women"],
        rating: 4.3,
        reviews: 92,
        sizes: ["XS", "S", "M"],
        colors: ["Blue", "White"],
        isNew: false
    },
    {
        id: 5,
        name: "Green Pocket Tee",
        price: 2500,
        image: "assets/tshirt_hs_men_pat_d48_o.jpg",
        description: "Olive green t-shirt with a chest pocket for added style. Perfect for casual Fridays or weekend outings.",
        category: ["men"],
        rating: 4.0,
        reviews: 64,
        sizes: ["M", "L", "XL"],
        colors: ["Green", "Khaki"],
        isNew: false
    },
    {
        id: 6,
        name: "Grey Oversized Tee",
        price: 3500,
        image: "assets/puma.jpeg",
        description: "Comfortable oversized grey t-shirt for a relaxed fit. Made from premium cotton with a slightly textured finish.",
        category: ["women", "unisex","new"],
        rating: 4.8,
        reviews: 178,
        sizes: ["S", "M", "L"],
        colors: ["Gray", "Black"],
        isNew: true
    },
    {
        id: 7,
        name: "Yellow Summer Tee",
        price: 2200,
        image: "assets/yello.jpeg",
        description: "Bright yellow t-shirt perfect for summer days. Lightweight fabric that keeps you cool in warm weather.",
        category: ["women"],
        rating: 4.1,
        reviews: 53,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Yellow"],
        isNew: false,
        onSale: true,
        originalPrice: 2800
    },
    {
        id: 8,
        name: "Pink Tie-Dye Tee",
        price: 2700,
        image: "assets/pink.jpeg",
        description: "Trendy pink tie-dye t-shirt for a unique look. Each piece has a slightly different pattern making it one-of-a-kind.",
        category: ["women", "unisex","new"],
        rating: 4.6,
        reviews: 142,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink", "Purple"],
        isNew: true
    }
];

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productGrid = document.getElementById('products');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartCount = document.getElementById('cart-count');
const cartCountSidebar = document.getElementById('cart-count-sidebar');
const cartLink = document.getElementById('cart-link');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchToggle = document.getElementById('search-toggle');
const searchOverlay = document.getElementById('search-overlay');
const closeSearch = document.getElementById('close-search');
const productModal = document.getElementById('product-modal');
const closeModal = document.getElementById('close-modal');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const newsletterForm = document.getElementById('newsletter-form');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const searchInput = document.querySelector('.search-container input');
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const searchOverlayInput = document.querySelector('.search-overlay input');

// Display Products with enhanced product cards
function displayProducts(filterCategory = 'all') {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    let filteredProducts;
    
    if (filterCategory === 'all') {
        filteredProducts = products;
    } else if (filterCategory === 'sale') {
        filteredProducts = products.filter(product => product.onSale);
    } else if (filterCategory === 'new') {
        filteredProducts = products.filter(product => product.isNew);
    } else {
        filteredProducts = products.filter(product => 
            product.category.includes(filterCategory)
        );
    }
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try a different category or search term</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Generate star rating HTML
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        productCard.innerHTML = `
            ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
            ${product.onSale ? '<span class="product-badge sale">Sale</span>' : ''}
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category.join(', ')}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${starsHTML}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price.toFixed(2)}</span>
                    ${product.onSale ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Quick View
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Add event listeners to "Quick View" buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', showProductModal);
    });
}

// Add to Cart with quantity option
function addToCart(e) {
    const button = e.target.closest('.add-to-cart');
    if (!button) return;
    
    const productId = parseInt(button.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const quantity = button.closest('.modal-actions') 
        ? parseInt(document.querySelector('.quantity-control input').value) || 1
        : 1;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity,
            selectedSize: 'M',
            selectedColor: product.colors[0]
        });
    }
    
    updateCart();
    showCartNotification('Item added to cart!');
    
    // Close modal if adding from modal
    if (button.closest('.modal-actions')) {
        closeModalAndOverlay();
    }
}

// Remove from Cart
function removeFromCart(e) {
    const button = e.target.closest('.remove-item');
    if (!button) return;
    
    const productId = parseInt(button.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showCartNotification('Item removed from cart');
}

// Update quantity in cart
function updateQuantity(e, action) {
    const button = e.target.closest('.quantity-btn');
    if (!button) return;
    
    const cartItem = button.closest('.cart-item');
    if (!cartItem) return;
    
    const productId = parseInt(cartItem.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
    }
    
    updateCart();
}

// Update Cart display with enhanced features
function updateCart() {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in header and sidebar
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    if (cartCountSidebar) cartCountSidebar.textContent = totalItems;
    
    // Update cart items display
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="#products" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.setAttribute('data-id', item.id);
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-meta">${item.selectedColor || ''}, ${item.selectedSize || 'M'}</p>
                        <p class="cart-item-price">₹${item.price.toFixed(2)} x ${item.quantity} = <strong>₹${itemTotal.toFixed(2)}</strong></p>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-action="decrease">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>
                                <button class="quantity-btn plus" data-action="increase">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
        
        // Calculate shipping (free over 2000)
        const shipping = subtotal >= 2000 ? 0 : 100;
        const total = subtotal + shipping;
        
        if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(2);
        if (cartTotal) cartTotal.textContent = total.toFixed(2);
        
        // Update shipping display
        const shippingElement = document.getElementById('shipping-cost');
        if (shippingElement) {
            shippingElement.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
        }
        
        // Update cart summary
        updateCartSummary();
    }
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            updateQuantity(e, button.getAttribute('data-action'));
        });
    });
    
    // Save total for checkout page
    localStorage.setItem('cartTotal', total || 0);
}

// Update cart summary in sidebar
function updateCartSummary() {
    const cartSummary = document.getElementById('cart-summary-details');
    if (!cartSummary) return;
    
    if (cart.length === 0) {
        cartSummary.innerHTML = '<p class="cart-empty-summary">Your cart is empty.</p>';
        return;
    }
    
    let html = '<ul class="cart-summary-list">';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <li>
                <span class="cart-summary-name">${item.name}</span>
                <span class="cart-summary-qty">x${item.quantity}</span>
                <span class="cart-summary-price">₹${itemTotal.toFixed(2)}</span>
            </li>
        `;
    });
    
    html += '</ul>';
    cartSummary.innerHTML = html;
}

// Show cart notification
function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
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
    if (!cartOverlay) return;
    
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartOverlay.classList.contains('active') ? 'hidden' : '';
}

// Show Product Modal
function showProductModal(e) {
    const button = e.target.closest('.view-details');
    if (!button) return;
    
    const productId = parseInt(button.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Generate star rating HTML
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    // Update modal content
    const modalTitle = document.getElementById('modal-product-title');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDesc = document.getElementById('modal-product-description');
    const modalStars = document.querySelector('.rating .stars');
    const modalReviewCount = document.querySelector('.review-count');
    const modalMainImage = document.getElementById('modal-main-image');
    
    if (modalTitle) modalTitle.textContent = product.name;
    if (modalPrice) {
        modalPrice.textContent = `₹${product.price.toFixed(2)}`;
        if (product.onSale) {
            modalPrice.innerHTML += ` <span class="original-price">₹${product.originalPrice.toFixed(2)}</span>`;
        }
    }
    if (modalDesc) modalDesc.textContent = product.description;
    if (modalStars) modalStars.innerHTML = starsHTML;
    if (modalReviewCount) modalReviewCount.textContent = `(${product.reviews} reviews)`;
    if (modalMainImage) {
        modalMainImage.src = product.image;
        modalMainImage.alt = product.name;
    }
    
    // Clear and add thumbnails
    const thumbnailsContainer = document.querySelector('.thumbnail-images');
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail active';
        thumbnail.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
        thumbnailsContainer.appendChild(thumbnail);
    }
    
    // Set size options
    const sizeOptions = document.querySelector('.size-options');
    if (sizeOptions) {
        sizeOptions.innerHTML = '';
        product.sizes.forEach(size => {
            const sizeBtn = document.createElement('button');
            sizeBtn.className = 'size-option';
            sizeBtn.textContent = size;
            sizeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
                sizeBtn.classList.add('active');
            });
            if (size === 'M') sizeBtn.classList.add('active');
            sizeOptions.appendChild(sizeBtn);
        });
    }
    
    // Set color options
    const colorOptions = document.querySelector('.color-options');
    if (colorOptions) {
        colorOptions.innerHTML = '';
        product.colors.forEach(color => {
            const colorBtn = document.createElement('button');
            colorBtn.className = 'color-option';
            colorBtn.setAttribute('data-color', color);
            colorBtn.style.backgroundColor = getColorHex(color);
            colorBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
                colorBtn.classList.add('active');
            });
            if (color === product.colors[0]) colorBtn.classList.add('active');
            colorOptions.appendChild(colorBtn);
        });
    }
    
    // Set quantity to 1
    const quantityInput = document.querySelector('.quantity-control input');
    if (quantityInput) quantityInput.value = 1;
    
    // Show modal
    if (productModal) {
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Set up add to cart button in modal
    const addToCartBtn = document.getElementById('add-to-cart-modal');
    if (addToCartBtn) {
        addToCartBtn.onclick = function(e) {
            e.preventDefault();
            const quantity = parseInt(document.querySelector('.quantity-control input').value) || 1;
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity: quantity,
                    selectedSize: document.querySelector('.size-option.active')?.textContent || 'M',
                    selectedColor: document.querySelector('.color-option.active')?.getAttribute('data-color') || product.colors[0]
                });
            }
            
            updateCart();
            showCartNotification('Item added to cart!');
            closeModalAndOverlay();
        };
    }
}

// Helper function to get color hex values
function getColorHex(color) {
    const colors = {
        'White': '#ffffff',
        'Black': '#000000',
        'Gray': '#808080',
        'Red': '#e74c3c',
        'Navy': '#001f3f',
        'Blue': '#0074d9',
        'Green': '#2ecc40',
        'Khaki': '#f0e68c',
        'Yellow': '#ffdc00',
        'Pink': '#ff69b4',
        'Purple': '#b10dc9'
    };
    return colors[color] || '#cccccc';
}

// Filter products by category
function filterProducts(e) {
    const button = e.target.closest('.filter-btn');
    if (!button) return;
    
    const category = button.getAttribute('data-category');
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.disabled = false;
    });
    button.classList.add('active');
    button.disabled = true;
    
    // Display filtered products
    displayProducts(category);
}

// Toggle search overlay
function toggleSearch() {
    if (!searchOverlay) return;
    
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
        const searchInput = searchOverlay.querySelector('input');
        if (searchInput) searchInput.focus();
    }
}

// Close modal and overlay functions
function closeModalAndOverlay() {
    if (productModal) {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// Handle newsletter submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    if (!emailInput) return;
    
    const email = emailInput.value;
    // In a real app, you would send this to your server
    console.log('Newsletter subscription:', email);
    showCartNotification('Thanks for subscribing!');
    e.target.reset();
}

// Handle search
function handleSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        product.category.some(cat => cat.toLowerCase().includes(term))
    );
    
    displayFilteredProducts(filteredProducts);
}

// Helper function to display filtered products
function displayFilteredProducts(filteredProducts) {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try different search terms</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Generate star rating HTML
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }

        productCard.innerHTML = `
            ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
            ${product.onSale ? '<span class="product-badge sale">Sale</span>' : ''}
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category.join(', ')}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${starsHTML}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price.toFixed(2)}</span>
                    ${product.onSale ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Quick View
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Reattach event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', showProductModal);
    });
}

// Handle scroll event
function handleScroll() {
    if (scrollToTopBtn) {
        scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    displayProducts();
    updateCart();
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', filterProducts);
    });
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (searchOverlayInput) {
                handleSearch(searchOverlayInput.value);
            }
            if (searchOverlay) searchOverlay.classList.remove('active');
        });
    }
    
    if (searchOverlayInput) {
        searchOverlayInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(searchOverlayInput.value);
                if (searchOverlay) searchOverlay.classList.remove('active');
            }
        });
    }
    // Cart functionality
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
            if (cart.length === 0) {
                showCartNotification('Your cart is empty!');
                return;
            }
            window.location.href = 'payment.html';
        });
    }
    
    // Close cart when clicking outside
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            toggleCart();
        }
    });
    
    // Product modal
    if (closeModal) {
        closeModal.addEventListener('click', closeModalAndOverlay);
    }
    
    // Scroll to top
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Scroll event
    window.addEventListener('scroll', handleScroll);
});

// Close modal when clicking outside
if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModalAndOverlay();
        }
    });
}