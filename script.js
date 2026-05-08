document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartLink = document.getElementById('cart-link');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeModal = document.querySelector('.close');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const products = document.querySelectorAll('.product');
    const contactForm = document.getElementById('contact-form');

    // Update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    // Show cart modal
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price}`;
                cartItems.appendChild(li);
                total += item.price;
            });
            cartTotal.textContent = total.toFixed(2);
            cartModal.style.display = 'block';
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Search and filter
    function filterProducts() {
        const searchTerm = searchBar ? searchBar.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : 'all';
        products.forEach(product => {
            const name = product.dataset.name.toLowerCase();
            const cat = product.dataset.category;
            const matchesSearch = name.includes(searchTerm);
            const matchesCategory = category === 'all' || cat === category;
            product.classList.toggle('hidden', !(matchesSearch && matchesCategory));
        });
    }

    if (searchBar) searchBar.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Initialize
    updateCartCount();
});