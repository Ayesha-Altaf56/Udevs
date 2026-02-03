/*
  Script.js
  Handles all the interactive logic for the website.
*/

// Run this code when the page finishes loading
document.addEventListener('DOMContentLoaded', function () {

    // 1. List of all products in our store
    const products = [
        {
            id: 1,
            name: "Smart Watch Pro Edition",
            price: "$199.99",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
            description: "Experience the future on your wrist. The Smart Watch Pro Edition features a retina display, all-day battery life, and advanced health monitoring sensors. Water-resistant and compatible with both iOS and Android."
        },
        {
            id: 2,
            name: "Studio Headphones",
            price: "$249.99",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
            description: "Immerse yourself in high-fidelity sound with these premium Studio Headphones. Featuring active noise cancellation, memory foam ear cups for long-lasting comfort, and up to 30 hours of battery life."
        },
        {
            id: 3,
            name: "Urban Runners",
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
            description: "Step up your game with Urban Runners. These sneakers combine street style with athletic performance, featuring a breathable mesh upper and a shock-absorbing sole for all-day comfort."
        },
        {
            id: 4,
            name: "Pro Running Shoes",
            price: "$120.00",
            image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800",
            description: "Designed for the dedicated runner. The Pro Running Shoes offer superior grip, lightweight construction, and reactive cushioning to help you break your personal bests."
        },
        {
            id: 5,
            name: "FitBit Advance",
            price: "$150.00",
            image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
            description: "Stay on top of your fitness goals with the FitBit Advance. Monitors heart rate, sleep quality, and activity levels. Includes smart notifications and is swim-proof."
        },
        {
            id: 6,
            name: "Sky Drone 4K",
            price: "$599.99",
            image: "drone_product.png",
            description: "Explore the world from above. The Sky Drone 4K captures breathtaking aerial video and photos. Features GPS stability, return-to-home function, and easy-to-fly modes for beginners."
        }
    ];

    // 2. Logic for Product Details Page
    // Check if we are currently on the 'product-details.html' page
    if (window.location.pathname.includes('product-details.html')) {

        // Get the Product ID from the URL (e.g., ?id=1)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));

        // Find the product in our list that matches the ID
        const product = products.find(function (p) {
            return p.id === productId;
        });

        // If we found the product, update the HTML elements
        if (product) {
            document.getElementById('productTitle').innerText = product.name;
            document.getElementById('productPrice').innerText = product.price;
            document.getElementById('productDescription').innerText = product.description;
            document.getElementById('mainProductImg').src = product.image;

            // Load Related Products
            const relatedContainer = document.getElementById('related-products');

            if (relatedContainer) {
                relatedContainer.innerHTML = ''; // Clear existing content

                let count = 0; // Counter to limit results to 4

                // Loop through all products to find suggestions
                for (let i = 0; i < products.length; i++) {
                    const p = products[i];

                    // Don't show the product we are currently viewing
                    if (p.id !== productId) {

                        if (count >= 4) break; // Stop after 4 items

                        // build the HTML string for the product card
                        let html = '<div class="col-md-3 col-6">';
                        html += '<div class="card product-card h-100">';
                        html += '<img src="' + p.image + '" class="card-img-top" style="height: 200px; object-fit: cover;">';
                        html += '<div class="card-body p-3">';
                        html += '<h6 class="card-title text-truncate">' + p.name + '</h6>';
                        html += '<span class="text-danger fw-bold d-block mb-2">' + p.price + '</span>';
                        html += '<a href="product-details.html?id=' + p.id + '" class="btn btn-sm btn-outline-primary w-100">View Details</a>';
                        html += '</div></div></div>';

                        // Add to the container
                        relatedContainer.innerHTML += html;

                        count++;
                    }
                }
            }
        }
    }

    // 3. Logic to Add Items to Cart
    function addToCart(productId, quantity) {
        // If quantity is not provided, default to 1
        if (!quantity) quantity = 1;

        // Get the cart from local storage, or start an empty one
        let cart = JSON.parse(localStorage.getItem('shopEaseCart'));
        if (!cart) cart = [];

        // Check if item already exists in cart
        let existingItem = null;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId) {
                existingItem = cart[i];
                break;
            }
        }

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity: quantity });
        }

        // Save back to storage
        localStorage.setItem('shopEaseCart', JSON.stringify(cart));
        updateCartCount();
    }

    // 4. Quantity Buttons (Plus and Minus)
    const btnIncrease = document.getElementById('btn-increase');
    const btnDecrease = document.getElementById('btn-decrease');
    const quantityInput = document.getElementById('quantity-input');

    if (btnIncrease && btnDecrease && quantityInput) {

        btnIncrease.addEventListener('click', function () {
            let val = parseInt(quantityInput.value);
            quantityInput.value = val + 1;
        });

        btnDecrease.addEventListener('click', function () {
            let val = parseInt(quantityInput.value);
            if (val > 1) {
                quantityInput.value = val - 1;
            }
        });
    }

    // 5. "Add to Cart" Button Logic
    const mainAddToCartBtn = document.getElementById('addToCartMain');

    if (mainAddToCartBtn) {
        mainAddToCartBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Get ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));

            if (productId) {
                // Get quantity
                let qty = 1;
                if (quantityInput) {
                    qty = parseInt(quantityInput.value);
                }

                addToCart(productId, qty);
                alert('Product added to cart!');

                // Change button text temporarily
                mainAddToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added';
                mainAddToCartBtn.classList.remove('btn-primary');
                mainAddToCartBtn.classList.add('btn-success');

                setTimeout(function () {
                    mainAddToCartBtn.innerHTML = '<i class="fas fa-cart-plus me-2"></i> Add to Cart';
                    mainAddToCartBtn.classList.add('btn-primary');
                    mainAddToCartBtn.classList.remove('btn-success');
                }, 2000);
            }
        });
    }

    // 6. Logic to Display Cart Items (Cart Page)
    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }

    function loadCart() {
        const cartTableBody = document.getElementById('cart-table-body');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTax = document.getElementById('cart-tax');
        const cartTotal = document.getElementById('cart-total');

        if (!cartTableBody) return;

        let cart = JSON.parse(localStorage.getItem('shopEaseCart'));
        if (!cart) cart = [];

        cartTableBody.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="5" class="text-center py-5">Your cart is empty. <a href="products.html">Go Shopping</a></td></tr>';
        } else {
            // Loop through each item in the cart
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];

                // Find the full product details
                const product = products.find(function (p) {
                    return p.id === item.id;
                });

                if (product) {
                    const priceVal = parseFloat(product.price.replace('$', ''));
                    const total = priceVal * item.quantity;
                    subtotal += total;

                    const row = document.createElement('tr');
                    row.className = 'align-middle';

                    // Build row HTML
                    let html = '<td><div class="d-flex align-items-center">';
                    html += '<img src="' + product.image + '" class="img-fluid rounded me-3" style="width: 60px;">';
                    html += '<div><h6 class="mb-0">' + product.name + '</h6></div></div></td>';
                    html += '<td>' + product.price + '</td>';
                    html += '<td><input type="number" class="form-control form-control-sm item-qty" data-index="' + i + '" value="' + item.quantity + '" min="1" style="width: 60px;"></td>';
                    html += '<td>$' + total.toFixed(2) + '</td>';
                    html += '<td><button class="btn btn-link text-danger btn-remove-item" data-index="' + i + '"><i class="fas fa-trash-alt"></i></button></td>';

                    row.innerHTML = html;
                    cartTableBody.appendChild(row);
                }
            }
        }

        const tax = subtotal * 0.08;
        const finalTotal = subtotal + tax;

        if (cartSubtotal) cartSubtotal.innerText = '$' + subtotal.toFixed(2);
        if (cartTax) cartTax.innerText = '$' + tax.toFixed(2);
        if (cartTotal) cartTotal.innerText = '$' + finalTotal.toFixed(2);

        // Attach listeners to new buttons
        attachCartListeners();
    }

    function attachCartListeners() {
        // Remove Buttons
        const removeBtns = document.querySelectorAll('.btn-remove-item');
        for (let i = 0; i < removeBtns.length; i++) {
            removeBtns[i].addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));

                let cart = JSON.parse(localStorage.getItem('shopEaseCart'));
                if (cart) {
                    cart.splice(index, 1); // Remove item
                    localStorage.setItem('shopEaseCart', JSON.stringify(cart));
                    loadCart(); // Refresh cart display
                    updateCartCount(); // Update badge
                }
            });
        }

        // Quantity Inputs
        const qtyInputs = document.querySelectorAll('.item-qty');
        for (let i = 0; i < qtyInputs.length; i++) {
            qtyInputs[i].addEventListener('change', function () {
                const index = parseInt(this.getAttribute('data-index'));
                let newQty = parseInt(this.value);

                if (newQty < 1) newQty = 1;

                let cart = JSON.parse(localStorage.getItem('shopEaseCart'));
                if (cart) {
                    cart[index].quantity = newQty;
                    localStorage.setItem('shopEaseCart', JSON.stringify(cart));
                    loadCart(); // Refresh cart display
                }
            });
        }
    }

    // 7. Initialize Cart Badge Count
    updateCartCount();

    // 8. Contact Form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // 9. Image Gallery Switcher
    const mainImg = document.getElementById('mainProductImg');
    const thumbnails = document.querySelectorAll('.product-gallery img');

    if (mainImg && thumbnails.length > 0) {
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].addEventListener('click', function () {
                mainImg.src = this.src;

                // Dim other thumbnails
                for (let j = 0; j < thumbnails.length; j++) {
                    thumbnails[j].style.opacity = '0.6';
                }
                this.style.opacity = '1';
            });
        }
    }

    // 10. Checkout Logic
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Order Placed Successfully! Thank you for shopping with us.');
            localStorage.removeItem('shopEaseCart');
            window.location.href = 'index.html';
        });
    }

});

// Helper function to update the red badge number
function updateCartCount() {
    const badge = document.querySelector('.badge-cart');
    if (badge) {
        let cart = JSON.parse(localStorage.getItem('shopEaseCart'));
        if (!cart) cart = [];

        let totalItems = 0;
        for (let i = 0; i < cart.length; i++) {
            totalItems += cart[i].quantity;
        }

        badge.innerText = totalItems;
    }
}