// Google Analytics (replace with your actual tracking ID)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-XXXXX-Y'); // Replace with your tracking ID

// Track page views
document.addEventListener('DOMContentLoaded', function() {
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
});

// Track cart interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.getAttribute('data-id');
        const product = products.find(p => p.id === parseInt(productId));
        
        gtag('event', 'add_to_cart', {
            items: [{
                id: productId,
                name: product.name,
                price: product.price,
                currency: 'USD'
            }]
        });
    }
    
    if (e.target.classList.contains('remove-item')) {
        const productId = e.target.getAttribute('data-id');
        const product = products.find(p => p.id === parseInt(productId));
        
        gtag('event', 'remove_from_cart', {
            items: [{
                id: productId,
                name: product.name,
                price: product.price,
                currency: 'USD'
            }]
        });
    }
    
    if (e.target.id === 'checkout-btn') {
        gtag('event', 'begin_checkout', {
            value: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
            currency: 'USD',
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        });
    }
});