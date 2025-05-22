// Theme Switching
const themeLightBtn = document.getElementById('theme-light');
const themeDarkBtn = document.getElementById('theme-dark');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeLightBtn.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
});

themeDarkBtn.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
});

// Cookie Consent
const cookieConsent = document.querySelector('.cookie-consent');
const acceptCookiesBtn = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'flex';
}

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.style.display = 'none';
    // Set a cookie
    document.cookie = "cookies_accepted=true; max-age=2592000; path=/"; // 30 days
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle (for shop pages)
const hamburger = document.getElementById('hamburger');
if (hamburger) {
    const navUL = document.querySelector('.shop-nav ul');
    
    hamburger.addEventListener('click', () => {
        navUL.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Loading Spinner Simulation
const loadingSpinner = document.getElementById('loading-spinner');

// Simulate loading for demonstration
if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 1000);
}