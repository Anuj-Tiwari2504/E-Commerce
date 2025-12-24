// Account Management
let currentUser = JSON.parse(localStorage.getItem('desimart-user')) || null;

// Initialize account page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('account.html')) {
        initializeAccount();
    }
});

function initializeAccount() {
    if (currentUser) {
        showDashboard();
    } else {
        showAuthForm();
    }
}

// Auth Functions
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        authTitle.textContent = 'Welcome Back!';
        authSubtitle.textContent = 'Sign in to your account';
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        authTitle.textContent = 'Join DesiMart';
        authSubtitle.textContent = 'Create your account';
        tabs[1].classList.add('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    
    // Simulate login (in real app, this would be an API call)
    const user = {
        name: 'John Doe',
        email: email,
        phone: '+91 9876543210',
        dob: '1990-01-01',
        joinDate: new Date().toISOString()
    };
    
    currentUser = user;
    localStorage.setItem('desimart-user', JSON.stringify(user));
    
    showToast('Login successful! Welcome back.');
    showDashboard();
}

function handleSignup(event) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }
    
    // Simulate signup (in real app, this would be an API call)
    const user = {
        name: name,
        email: email,
        phone: phone,
        dob: '',
        joinDate: new Date().toISOString()
    };
    
    currentUser = user;
    localStorage.setItem('desimart-user', JSON.stringify(user));
    
    showToast('Account created successfully! Welcome to DesiMart.');
    showDashboard();
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('desimart-user');
    showToast('Logged out successfully.');
    showAuthForm();
}

// Dashboard Functions
function showAuthForm() {
    document.getElementById('authContainer').classList.remove('hidden');
    document.getElementById('dashboardContainer').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('authContainer').classList.add('hidden');
    document.getElementById('dashboardContainer').classList.remove('hidden');
    
    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
    
    // Load profile data
    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileEmail').value = currentUser.email;
    document.getElementById('profilePhone').value = currentUser.phone;
    document.getElementById('profileDob').value = currentUser.dob;
    
    // Load wishlist
    loadDashboardWishlist();
}

function showSection(section) {
    // Remove active class from all nav items and sections
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked nav item and corresponding section
    event.target.classList.add('active');
    document.getElementById(section + 'Section').classList.add('active');
}

function updateProfile(event) {
    event.preventDefault();
    
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const dob = document.getElementById('profileDob').value;
    
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.dob = dob;
    
    localStorage.setItem('desimart-user', JSON.stringify(currentUser));
    
    // Update display
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;
    document.getElementById('userAvatar').textContent = name.charAt(0).toUpperCase();
    
    showToast('Profile updated successfully!');
}

function loadDashboardWishlist() {
    const wishlistGrid = document.getElementById('wishlistGrid');
    const wishlist = JSON.parse(localStorage.getItem('desimart-wishlist')) || [];
    
    if (wishlist.length === 0) {
        wishlistGrid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Your wishlist is empty</p>';
        return;
    }
    
    wishlistGrid.innerHTML = '';
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 0.5rem;">
            <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem;">${item.name}</h4>
            <p style="font-weight: 600; color: var(--saffron);">₹${item.price.toLocaleString()}</p>
            <button onclick="addToCart(${item.id})" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.5rem; font-size: 0.8rem;">Add to Cart</button>
        `;
        wishlistGrid.appendChild(wishlistItem);
    });
}

function addNewAddress() {
    const addressName = prompt('Address Name (e.g., Home, Office):');
    const addressText = prompt('Full Address:');
    
    if (addressName && addressText) {
        const addressesList = document.getElementById('addressesList');
        const newAddress = document.createElement('div');
        newAddress.className = 'address-item';
        newAddress.innerHTML = `
            <div>
                <h4>${addressName}</h4>
                <p>${addressText}</p>
            </div>
            <div class="address-actions">
                <button class="btn-small" onclick="editAddress(this)">Edit</button>
                <button class="btn-small delete" onclick="deleteAddress(this)">Delete</button>
            </div>
        `;
        addressesList.appendChild(newAddress);
        showToast('Address added successfully!');
    }
}

function editAddress(button) {
    const addressItem = button.closest('.address-item');
    const nameElement = addressItem.querySelector('h4');
    const textElement = addressItem.querySelector('p');
    
    const newName = prompt('Address Name:', nameElement.textContent);
    const newText = prompt('Full Address:', textElement.textContent);
    
    if (newName && newText) {
        nameElement.textContent = newName;
        textElement.textContent = newText;
        showToast('Address updated successfully!');
    }
}

function deleteAddress(button) {
    if (confirm('Are you sure you want to delete this address?')) {
        button.closest('.address-item').remove();
        showToast('Address deleted successfully!');
    }
}

// Update toggleAccount function in app.js
function toggleAccount() {
    window.location.href = 'account.html';
}