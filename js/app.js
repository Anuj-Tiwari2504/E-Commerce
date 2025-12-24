// Search Functions
function searchProducts(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredProducts = [...products];
        loadProducts(filteredProducts);
        return;
    }
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    loadProducts(filteredProducts);
    
    if (filteredProducts.length === 0) {
        showToast(`No products found for "${searchTerm}"`, 'info');
    } else {
        showToast(`Found ${filteredProducts.length} products for "${searchTerm}"`);
    }
}

// Global Variables
let cart = JSON.parse(localStorage.getItem('desimart-cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('desimart-wishlist')) || [];
let filteredProducts = [...products];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    updateWishlistCount();
    setupSmoothScrolling();
});

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Product Functions
function loadProducts(productsToShow = products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const isInWishlist = wishlist.some(item => item.id === product.id);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in-up';
        productCard.innerHTML = `
            <div class="product-image-container" style="position: relative; overflow: hidden; border-radius: 12px 12px 0 0;">
                <img src="${product.image}" alt="${product.name}" class="product-image" style="width: 100%; height: 250px; object-fit: cover; cursor: pointer; transition: transform 0.3s;" onclick="openProductModal(${product.id})" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                ${discountPercent > 0 ? `<div class="discount-badge" style="position: absolute; top: 10px; left: 10px; background: #e74c3c; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">${discountPercent}% OFF</div>` : ''}
                <button class="btn-icon" style="position: absolute; top: 10px; right: 10px; background: ${isInWishlist ? '#e74c3c' : 'rgba(255,255,255,0.9)'}; color: ${isInWishlist ? 'white' : '#666'}; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s;" onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info" style="padding: 1.5rem; background: white; border-radius: 0 0 12px 12px;">
                <h3 class="product-name" style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; color: #333; cursor: pointer;" onclick="openProductModal(${product.id})">${product.name}</h3>
                <div class="product-rating" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <span class="stars" style="color: #f39c12;">${generateStars(product.rating)}</span>
                    <span style="font-size: 0.9rem; color: #666;">(${product.reviews})</span>
                </div>
                <div class="product-price" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <span class="current-price" style="font-size: 1.3rem; font-weight: 700; color: #333;">₹${product.price.toLocaleString()}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price" style="text-decoration: line-through; color: #999; font-size: 1rem;">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">By ${product.brand}</p>
                <p style="font-size: 0.85rem; color: #777; margin-bottom: 1.5rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.description}</p>
                <div class="product-actions" style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-primary" style="flex: 1; padding: 10px; background: linear-gradient(135deg, #00BFFF, #1E90FF); color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s;" onclick="buyNow(${product.id})" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(30,144,255,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                    <button class="btn btn-secondary" style="flex: 1; padding: 10px; background: #fff; color: #333; border: 2px solid #ddd; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s;" onclick="addToCart(${product.id})" onmouseover="this.style.borderColor='#00BFFF'; this.style.color='#00BFFF'" onmouseout="this.style.borderColor='#ddd'; this.style.color='#333'">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function filterProducts(category = '') {
    const categoryFilter = document.getElementById('categoryFilter');
    if (category) {
        categoryFilter.value = category;
    } else {
        category = categoryFilter.value;
    }
    
    if (category) {
        filteredProducts = products.filter(product => product.category === category);
    } else {
        filteredProducts = [...products];
    }
    
    sortProducts();
}

function sortProducts() {
    const sortFilter = document.getElementById('sortFilter');
    const sortBy = sortFilter.value;
    
    switch (sortBy) {
        case 'priceLow':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'priceHigh':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
        default:
            // Keep original order
            break;
    }
    
    loadProducts(filteredProducts);
}

// Buy Now Function
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    addToCart(productId);
    showToast(`Redirecting to checkout for ${product.name}...`, 'info');
    // In a real app, this would redirect directly to checkout
    setTimeout(() => {
        toggleCart();
    }, 1000);
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    loadCartItems();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        updateCart();
        loadCartItems();
    }
}

function updateCart() {
    localStorage.setItem('desimart-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = total.toLocaleString();
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    if (cartSidebar.classList.contains('active')) {
        loadCartItems();
    }
}

function loadCartItems() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.style.cssText = 'display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee;';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem;">${item.name}</h4>
                <p style="margin: 0; font-weight: 600;">₹${item.price.toLocaleString()}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" style="background: #f0f0f0; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">-</button>
                <span style="min-width: 20px; text-align: center;">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" style="background: #f0f0f0; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">+</button>
                <button onclick="removeFromCart(${item.id})" style="background: #e74c3c; color: white; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer; margin-left: 0.5rem;">×</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartTotal();
}

// Wishlist Functions
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showToast(`${product.name} removed from wishlist`);
    } else {
        wishlist.push(product);
        showToast(`${product.name} added to wishlist!`);
    }
    
    updateWishlist();
    loadProducts(filteredProducts); // Reload to update heart icons
}

function updateWishlist() {
    localStorage.setItem('desimart-wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateWishlistCount() {
    document.getElementById('wishlistCount').textContent = wishlist.length;
}

function toggleWishlist() {
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    wishlistSidebar.classList.toggle('active');
    if (wishlistSidebar.classList.contains('active')) {
        loadWishlistItems();
    }
}

function loadWishlistItems() {
    const wishlistItems = document.getElementById('wishlistItems');
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your wishlist is empty</p>';
        return;
    }
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.style.cssText = 'display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee;';
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem;">${item.name}</h4>
                <p style="margin: 0; font-weight: 600;">₹${item.price.toLocaleString()}</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <button onclick="addToCart(${item.id})" style="background: var(--saffron); color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Add to Cart</button>
                <button onclick="toggleWishlist(${item.id})" style="background: #e74c3c; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Remove</button>
            </div>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
}

// Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
            </div>
            <div>
                <h2 style="margin-bottom: 1rem;">${product.name}</h2>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="color: #f39c12;">${generateStars(product.rating)}</span>
                    <span>(${product.reviews} reviews)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 1.5rem; font-weight: 700;">₹${product.price.toLocaleString()}</span>
                    ${product.originalPrice > product.price ? `<span style="text-decoration: line-through; color: #666;">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                    ${discountPercent > 0 ? `<span style="background: #e74c3c; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">${discountPercent}% OFF</span>` : ''}
                </div>
                <p style="margin-bottom: 1rem; color: #666; line-height: 1.6;">${product.description}</p>
                <div style="margin-bottom: 1rem;">
                    <p><strong>Brand:</strong> ${product.brand}</p>
                    <p><strong>Seller:</strong> ${product.seller}</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();">Add to Cart</button>
                    <button class="btn ${isInWishlist ? 'btn-secondary' : 'btn-secondary'}" onclick="toggleWishlist(${product.id}); openProductModal(${product.id});">
                        ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Account Functions
function toggleAccount() {
    window.location.href = 'account.html';
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    showToast('Redirecting to checkout...', 'info');
    // In a real app, this would redirect to checkout page
}

// Form Submission
function submitForm(event) {
    event.preventDefault();
    showToast('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close sidebars when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const modal = document.getElementById('productModal');
    
    if (!event.target.closest('.cart-sidebar') && !event.target.closest('[onclick*="toggleCart"]')) {
        cartSidebar.classList.remove('active');
    }
    
    if (!event.target.closest('.wishlist-sidebar') && !event.target.closest('[onclick*="toggleWishlist"]')) {
        wishlistSidebar.classList.remove('active');
    }
    
    if (event.target === modal) {
        closeModal();
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
});