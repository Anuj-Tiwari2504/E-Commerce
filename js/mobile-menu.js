// Universal Mobile Menu Script for all pages
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    navMenu.classList.toggle('active');
    
    // Toggle hamburger/close icon
    const icon = mobileBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
        body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
        icon.className = 'fas fa-bars';
        body.style.overflow = 'auto';
    }
}

// Close menu when clicking on links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('navMenu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            navMenu.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.className = 'fas fa-bars';
            body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (!navMenu.contains(event.target) && !mobileBtn.contains(event.target)) {
            navMenu.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.className = 'fas fa-bars';
            body.style.overflow = 'auto';
        }
    });
});