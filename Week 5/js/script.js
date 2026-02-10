// Custom JavaScript for E-Commerce Functionality

document.addEventListener('DOMContentLoaded', () => {
    console.log('E-Commerce App Loaded');

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Cart Functionality
    initCart();
    updateCartBadge();

    // Add to Cart Functionality (Products Page & Details Page)
    const addToCartBtns = document.querySelectorAll('.btn-primary-custom, .btn-buy-now'); // Include Buy Now for demo
    addToCartBtns.forEach(btn => {
        // Check if it's an Add to Cart button (text check or specific class if we added one)
        if (btn.textContent.includes('Add to Cart') || btn.textContent.includes('Buy Now')) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                // Simple logic to extract data based on page structure
                const card = this.closest('.card');
                const buyBox = this.closest('.buy-box');

                let product = {};

                if (card) {
                    // Products Page or Home Page
                    const title = card.querySelector('.card-title').textContent.trim();
                    const productItem = card.closest('.product-item');
                    let price = 0;

                    if (productItem && productItem.hasAttribute('data-price')) {
                        price = parseFloat(productItem.getAttribute('data-price'));
                    } else {
                        // Fallback: handle cases where cents are in a separate span
                        const priceEl = card.querySelector('.price');
                        // Clone to avoid modifying original, then replace spans with a decimal point if needed
                        // Or just extract numbers and treat last 2 as cents if no decimal exists
                        const priceText = priceEl.textContent.trim().replace('$', '').replace(/,/g, '');
                        // A more robust way: if it looks like "8900" but we know the structure has two parts
                        // For this demo, since we are adding data-price everywhere, we'll favor that.
                        price = parseFloat(priceText);
                    }

                    const image = card.querySelector('.card-img-top').src;

                    product = {
                        title: title,
                        price: price,
                        image: image,
                        qty: 1,
                        id: Date.now() + Math.random() // Unique ID
                    };
                } else if (buyBox) {
                    // Product Details Page
                    const title = document.querySelector('h3.fw-medium') ? document.querySelector('h3.fw-medium').textContent.trim() : "Product";
                    // Try to find the main product image - specific to product-details.html structure
                    const mainImage = document.querySelector('.col-md-5 img');
                    const image = mainImage ? mainImage.src : "https://via.placeholder.com/200";

                    const priceTextParent = buyBox.querySelector('.product-price-large');
                    let price = 0;
                    if (priceTextParent) {
                        const priceText = priceTextParent.innerText.replace(/\n/g, '').replace('$', '');
                        price = parseFloat(priceText);
                    }

                    const qtySelect = buyBox.querySelector('select');
                    const qty = qtySelect ? parseInt(qtySelect.value) : 1;

                    product = {
                        title: title,
                        price: price,
                        image: image,
                        qty: qty,
                        id: Date.now() + Math.random()
                    };
                }

                if (product.title) {
                    addToCart(product);
                }
            });
        }
    });

    // Checkout Functionality
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            generateInvoice(cart);
        });
    }
});

function generateInvoice(cart) {
    const invoiceContent = document.getElementById('invoice-content');
    if (!invoiceContent) return;

    const orderNumber = Math.floor(Math.random() * 900000000) + 100000000;
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let total = 0;
    const itemsHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
            <tr>
                <td>${item.title}</td>
                <td class="text-center">${item.qty}</td>
                <td class="text-end">$${item.price.toFixed(2)}</td>
                <td class="text-end fw-bold">$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    const tax = total * 0.08; // 8% tax
    const finalTotal = total + tax;

    invoiceContent.innerHTML = `
        <div class="text-center mb-4">
            <h2 class="fw-bold"><i class="fa-solid fa-cart-shopping me-2 text-warning"></i>E-Shop</h2>
            <p class="text-muted">Simplified Shopping, Premium Experience</p>
        </div>
        <div class="row mb-4">
            <div class="col-sm-6 text-start">
                <h6 class="text-muted mb-1">Order Details:</h6>
                <div><strong>Order #:</strong> ${orderNumber}</div>
                <div><strong>Date:</strong> ${date}</div>
            </div>
            <div class="col-sm-6 text-sm-end text-start mt-2 mt-sm-0">
                <h6 class="text-muted mb-1">Customer Details:</h6>
                <div><strong>Customer:</strong> Demo User</div>
                <div><strong>Email:</strong> demo@example.com</div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-borderless border-top border-bottom">
                <thead>
                    <tr class="text-muted small text-uppercase">
                        <th>Product</th>
                        <th class="text-center">Qty</th>
                        <th class="text-end">Unit Price</th>
                        <th class="text-end">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>
        </div>
        <div class="row justify-content-end">
            <div class="col-md-5">
                <div class="d-flex justify-content-between mb-1">
                    <span>Subtotal:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <div class="d-flex justify-content-between mb-1">
                    <span>Estimated Tax (8%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between h4 fw-bold">
                    <span>Total:</span>
                    <span>$${finalTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
        <div class="alert alert-success mt-4 mb-0 border-0 shadow-sm d-flex align-items-center">
            <i class="fa-solid fa-circle-check fa-2x me-3"></i>
            <div>
                <div class="fw-bold">Payment Successful!</div>
                <div class="small">Your order has been placed successfully. Thank you for shopping with E-Shop!</div>
            </div>
        </div>
    `;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('invoiceModal'));
    modal.show();

    // Clear cart
    localStorage.removeItem('cart');
    updateCartBadge();

    // If on cart page, refresh/render empty state
    if (window.location.pathname.includes('cart.html')) {
        const cartItemsWrapper = document.getElementById('cart-items-wrapper');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        if (cartItemsWrapper) {
            // Remove all cart items from DOM
            const items = cartItemsWrapper.querySelectorAll('.cart-item');
            items.forEach(i => i.remove());
        }
        if (emptyCartMessage) emptyCartMessage.classList.remove('d-none');

        // Update summary numbers
        const subtotalPriceEl = document.getElementById('cart-subtotal-price');
        const subtotalCountEl = document.getElementById('cart-count-subtotal');
        const summaryCountEl = document.getElementById('cart-summary-count');
        const summaryPriceEl = document.getElementById('cart-summary-price');

        if (subtotalPriceEl) subtotalPriceEl.textContent = '$0.00';
        if (subtotalCountEl) subtotalCountEl.textContent = '0 items';
        if (summaryCountEl) summaryCountEl.textContent = '0 items';
        if (summaryPriceEl) summaryPriceEl.textContent = '$0.00';
    }
}

function initCart() {
    const cartItemsWrapper = document.getElementById('cart-items-wrapper');
    const savedItemsContainer = document.getElementById('saved-items-container');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    // Render Cart Items
    if (cartItemsWrapper) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.classList.remove('d-none');
            // Remove any dynamically added items (clean slate)
            const existingItems = cartItemsWrapper.querySelectorAll('.cart-item');
            existingItems.forEach(el => el.remove());
        } else {
            if (emptyCartMessage) emptyCartMessage.classList.add('d-none');

            // clear existing items (ensure no duplicates on re-init)
            const existingItems = cartItemsWrapper.querySelectorAll('.cart-item');
            existingItems.forEach(el => el.remove());

            cart.forEach((item, index) => {
                const itemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <div class="row">
                        <div class="col-md-2"> <!-- Image -->
                            <div class="form-check d-flex align-items-center mb-2">
                                <input class="form-check-input me-2 item-check" type="checkbox" checked>
                                <img src="${item.image}" class="img-fluid" alt="${item.title}" style="max-height: 100px; object-fit: contain;">
                            </div>
                        </div>
                        <div class="col-md-8"> <!-- Details -->
                            <a href="#" class="text-dark text-decoration-none">
                                <h5 class="fw-bold mb-1">${item.title}</h5>
                            </a>
                            <div class="text-success small mb-1">In Stock</div>
                            <div class="d-flex flex-wrap align-items-center cart-actions">
                                <select class="form-select form-select-sm w-auto me-3 shadow-sm border-secondary-subtle item-qty">
                                    <option value="1" ${item.qty === 1 ? 'selected' : ''}>Qty: 1</option>
                                    <option value="2" ${item.qty === 2 ? 'selected' : ''}>Qty: 2</option>
                                    <option value="3" ${item.qty === 3 ? 'selected' : ''}>Qty: 3</option>
                                    <option value="4" ${item.qty === 4 ? 'selected' : ''}>Qty: 4</option>
                                    <option value="5" ${item.qty === 5 ? 'selected' : ''}>Qty: 5</option>
                                    <option value="${item.qty}" ${item.qty > 5 ? 'selected' : ''} ${item.qty > 5 ? '' : 'hidden'}>Qty: ${item.qty}</option>
                                </select>
                                <a href="#" class="action-delete">Delete</a>
                                <a href="#" class="action-save">Save for later</a>
                            </div>
                        </div>
                        <div class="col-md-2 text-end"> <!-- Price -->
                            <span class="cart-price fw-bold item-price" data-price="${item.price}">$${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>`;
                cartItemsWrapper.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        // Event Delegation for Cart Actions...
        cartItemsWrapper.addEventListener('click', (e) => {
            const target = e.target;
            const cartItem = target.closest('.cart-item');

            if (!cartItem) return;

            const id = parseFloat(cartItem.getAttribute('data-id')); // using parseFloat because ID is timestamp + random
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Delete Action
            if (target.classList.contains('action-delete')) {
                e.preventDefault();
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                cartItem.remove();

                // Show empty message if cart is empty
                if (cart.length === 0 && emptyCartMessage) {
                    emptyCartMessage.classList.remove('d-none');
                }

                updateCartTotal(); // Recalculate totals
                updateCartBadge();
                showNotification('Item removed from cart.');
            }

            // Save for Later Action (placeholder for now, removes from cart)
            if (target.classList.contains('action-save')) {
                e.preventDefault();
                moveToSaved(cartItem); // Keep existing visual logic
                // Also remove from cart logic
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                cartItem.remove();

                if (cart.length === 0 && emptyCartMessage) {
                    emptyCartMessage.classList.remove('d-none');
                }

                updateCartTotal();
                updateCartBadge();
                showNotification('Item saved for later.');
            }
        });

        // Event Listener for Quantity Changes
        cartItemsWrapper.addEventListener('change', (e) => {
            if (e.target.classList.contains('item-qty')) {
                const cartItem = e.target.closest('.cart-item');
                const id = parseFloat(cartItem.getAttribute('data-id'));
                const newQty = parseInt(e.target.value);

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const itemIndex = cart.findIndex(item => item.id === id);

                if (itemIndex > -1) {
                    cart[itemIndex].qty = newQty;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }

                updateCartTotal();
                updateCartBadge();
            }

            if (e.target.classList.contains('item-check')) {
                updateCartTotal();
            }
        });
    } else {
        // If not on cart page, we still need to handle saved items container clicks if pertinent
    }

    // Event Delegation for Saved Items Actions (simplified)
    if (savedItemsContainer) {
        savedItemsContainer.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;

            // Move to Cart
            if (target.classList.contains('action-move-to-cart')) {
                const savedRow = target.closest('.row'); // saved item row
                if (savedRow) {
                    moveToCart(savedRow);
                    updateCartTotal();
                    showNotification('Item moved back to cart.');
                }
            }

            // Delete from Saved
            if (target.classList.contains('action-delete-saved')) {
                const savedRow = target.closest('.row');
                if (savedRow) {
                    savedRow.remove();
                    updateSavedCount();
                    showNotification('Item removed from saved list.');
                }
            }
        });
    }

    // Initial calculation
    if (document.querySelector('.cart-item')) {
        updateCartTotal();
    }
}

function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    let totalQty = 0;

    cartItems.forEach(item => {
        const checkbox = item.querySelector('.item-check');
        // Only count checked items
        if (checkbox && checkbox.checked) {
            const priceEl = item.querySelector('.item-price');
            const qtyEl = item.querySelector('.item-qty');

            if (priceEl && qtyEl) {
                const price = parseFloat(priceEl.getAttribute('data-price'));
                const qty = parseInt(qtyEl.value);

                total += price * qty;
                totalQty += qty;
            }
        }
    });

    // Update UI
    const subtotalPriceEls = [
        document.getElementById('cart-subtotal-price'),
        document.getElementById('cart-summary-price')
    ];

    const subtotalCountEls = [
        document.getElementById('cart-count-subtotal'),
        document.getElementById('cart-summary-count')
    ];

    const badgeCount = document.getElementById('cart-badge-count');

    const formattedTotal = '$' + total.toFixed(2);
    const countText = totalQty + ' items';

    subtotalPriceEls.forEach(el => {
        if (el) el.textContent = formattedTotal;
    });

    subtotalCountEls.forEach(el => {
        if (el) el.textContent = countText;
    });

    if (badgeCount) badgeCount.textContent = totalQty;
}

function moveToSaved(cartItem) {
    const savedContainer = document.getElementById('saved-items-container');
    if (!savedContainer) return;

    // Extract data
    const img = cartItem.querySelector('img').src;
    const title = cartItem.querySelector('h5').textContent;
    const price = cartItem.querySelector('.item-price').textContent;

    // Create saved item HTML structure
    const savedItemHTML = `
        <div class="row align-items-center border-top py-3 saved-item">
            <div class="col-md-2">
                <img src="${img}" class="img-fluid" alt="${title}">
            </div>
            <div class="col-md-8">
                <a href="#" class="text-decoration-none fw-bold text-dark">${title}</a>
                <div class="text-success small">In Stock</div>
                <div class="cart-actions mt-1">
                    <a href="#" class="ms-0 action-move-to-cart">Move to Cart</a>
                    <a href="#" class="action-delete-saved">Delete</a>
                </div>
            </div>
            <div class="col-md-2 text-end">
                <span class="cart-price fw-bold">${price}</span>
            </div>
        </div>
    `;

    // Append to container
    savedContainer.insertAdjacentHTML('beforeend', savedItemHTML);

    // Remove from cart
    cartItem.remove();
    updateSavedCount();
}

function moveToCart(savedRow) {
    const cartWrapper = document.getElementById('cart-items-wrapper');
    if (!cartWrapper) return;

    // Extract data
    const img = savedRow.querySelector('img').src;
    const title = savedRow.querySelector('a').textContent;
    const priceText = savedRow.querySelector('.cart-price').textContent;
    const priceVal = priceText.replace('$', '');

    // Create cart item HTML structure
    const cartItemHTML = `
     <div class="cart-item">
        <div class="row">
            <div class="col-md-2">
                <div class="form-check d-flex align-items-center mb-2">
                    <input class="form-check-input me-2 item-check" type="checkbox" value="" checked>
                    <img src="${img}" class="img-fluid" alt="${title}">
                </div>
            </div>
            <div class="col-md-8">
                <a href="#" class="text-dark text-decoration-none">
                    <h5 class="fw-bold mb-1">${title}</h5>
                </a>
                <div class="text-success small mb-1">In Stock</div>
                <div class="d-flex flex-wrap align-items-center cart-actions">
                    <select class="form-select form-select-sm w-auto me-3 shadow-sm border-secondary-subtle item-qty">
                        <option value="1" selected>Qty: 1</option>
                        <option value="2">Qty: 2</option>
                        <option value="3">Qty: 3</option>
                    </select>
                    <a href="#" class="action-delete">Delete</a>
                    <a href="#" class="action-save">Save for later</a>
                    <a href="#" class="action-share">Share</a>
                </div>
            </div>
            <div class="col-md-2 text-end">
                <span class="cart-price fw-bold item-price" data-price="${priceVal}">${priceText}</span>
            </div>
        </div>
    </div>
    `;

    cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
    savedRow.remove();
    updateSavedCount();
}

function updateSavedCount() {
    const savedContainer = document.getElementById('saved-items-container');
    const badge = document.getElementById('saved-count');
    if (savedContainer && badge) {
        const count = savedContainer.querySelectorAll('.saved-item').length;
        badge.textContent = count;
    }
}

function showNotification(message) {
    // Simple alert or create a toast - using a simple console log/alert substitute for now
    // In a real app, use Bootstrap Toasts
    console.log(message);
}

// Sidebar Navigation Logic
function openNav() {
    const sidenav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("closeBtn");

    if (sidenav) sidenav.classList.add("open");
    if (overlay) overlay.classList.add("show");
    if (closeBtn) closeBtn.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeNav() {
    const sidenav = document.getElementById("mySidenav");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("closeBtn");

    if (sidenav) sidenav.classList.remove("open");
    if (overlay) overlay.classList.remove("show");
    if (closeBtn) closeBtn.classList.remove("show");
    document.body.style.overflow = ""; // Restore scrolling
}

document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById("nav-hamburger-menu");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function (e) {
            e.preventDefault();
            openNav();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeNav);
    }

    if (overlay) {
        overlay.addEventListener("click", closeNav);
    }

    // Product Filtering Logic
    const filterLinks = document.querySelectorAll('.filter-link');
    const productItems = document.querySelectorAll('.product-item');

    const minPriceInput = document.getElementById('min-price-input');
    const maxPriceInput = document.getElementById('max-price-input');
    const priceGoBtn = document.getElementById('price-go-btn');

    let activeFilters = {
        category: 'all',
        rating: 0,
        priceMin: 0,
        priceMax: Infinity,
        search: ''
    };

    function applyFilters() {
        let visibleCount = 0;
        productItems.forEach(item => {
            const itemCategory = (item.getAttribute('data-category') || '').toLowerCase();
            const itemPrice = parseFloat(item.getAttribute('data-price')) || 0;
            const itemRating = parseFloat(item.getAttribute('data-rating')) || 0;
            const itemTitle = item.querySelector('.card-title') ? item.querySelector('.card-title').textContent.toLowerCase() : '';

            const categoryMatch = activeFilters.category === 'all' || itemCategory === activeFilters.category;
            const priceMatch = itemPrice >= activeFilters.priceMin && itemPrice <= activeFilters.priceMax;
            const ratingMatch = itemRating >= activeFilters.rating;
            // Search in both Title and Category
            const searchMatch = activeFilters.search === '' ||
                itemTitle.includes(activeFilters.search) ||
                itemCategory.includes(activeFilters.search);

            if (categoryMatch && priceMatch && ratingMatch && searchMatch) {
                item.classList.remove('d-none');
                visibleCount++;
            } else {
                item.classList.add('d-none');
            }
        });

        // Update result text
        const countSpan = document.querySelector('.col-lg-10 .d-flex.justify-content-between .small');
        if (countSpan) {
            let filterText = activeFilters.category === 'all' ? 'All Departments' : activeFilters.category;
            if (activeFilters.search) filterText += ` for "${activeFilters.search}"`;

            countSpan.innerHTML = `${visibleCount} results for <span class="fw-bold text-danger">"${filterText}"</span>`;
        }

        // Show "No Results" message if nothing matches
        let noResultsMsg = document.getElementById('no-results-message');
        if (visibleCount === 0) {
            if (!noResultsMsg && productGrid) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'col-12 text-center py-5';
                noResultsMsg.innerHTML = `
                    <i class="fa-solid fa-magnifying-glass fa-3x text-muted mb-3"></i>
                    <h3>No results found</h3>
                    <p class="text-muted">Try adjusting your filters or search terms.</p>
                `;
                productGrid.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    if (filterLinks.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Category Filter
                if (this.hasAttribute('data-category')) {
                    activeFilters.category = this.getAttribute('data-category');
                    // Update active state for category links only
                    document.querySelectorAll('.filter-link[data-category]').forEach(l => l.classList.remove('active', 'fw-bold'));
                    this.classList.add('active', 'fw-bold');
                }
                // Rating Filter
                else if (this.hasAttribute('data-rating')) {
                    const ratingValue = parseFloat(this.getAttribute('data-rating'));
                    if (activeFilters.rating === ratingValue) {
                        activeFilters.rating = 0; // Toggle off if clicked again
                        this.classList.remove('active', 'fw-bold');
                    } else {
                        activeFilters.rating = ratingValue;
                        document.querySelectorAll('.filter-link[data-rating]').forEach(l => l.classList.remove('active', 'fw-bold'));
                        this.classList.add('active', 'fw-bold');
                    }
                }
                // Price Range Filter
                else if (this.hasAttribute('data-price-min')) {
                    const pMin = parseFloat(this.getAttribute('data-price-min'));
                    const pMax = parseFloat(this.getAttribute('data-price-max'));

                    if (activeFilters.priceMin === pMin && activeFilters.priceMax === pMax) {
                        activeFilters.priceMin = 0;
                        activeFilters.priceMax = Infinity;
                        this.classList.remove('active', 'fw-bold');
                    } else {
                        activeFilters.priceMin = pMin;
                        activeFilters.priceMax = pMax;
                        document.querySelectorAll('.filter-link[data-price-min]').forEach(l => l.classList.remove('active', 'fw-bold'));
                        this.classList.add('active', 'fw-bold');
                    }
                }

                applyFilters();
            });
        });
    }

    // Custom Price Filter
    if (priceGoBtn && minPriceInput && maxPriceInput) {
        priceGoBtn.addEventListener('click', () => {
            const minV = parseFloat(minPriceInput.value) || 0;
            const maxV = parseFloat(maxPriceInput.value) || Infinity;

            activeFilters.priceMin = minV;
            activeFilters.priceMax = maxV;

            // Remove active state from preset price range links
            document.querySelectorAll('.filter-link[data-price-min]').forEach(l => l.classList.remove('active', 'fw-bold'));

            applyFilters();
        });
    }

    // Product Sorting Logic
    const sortLinks = document.querySelectorAll('.dropdown-item[data-sort]');
    const productGrid = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-lg-3.row-cols-xl-4.g-3');

    if (sortLinks.length > 0 && productGrid) {
        sortLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Update active state in dropdown
                sortLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Update dropdown button text
                const sortBtn = document.querySelector('.dropdown-toggle.rounded-pill');
                if (sortBtn) {
                    sortBtn.textContent = `Sort by: ${this.textContent.trim()}`;
                }

                const sortType = this.getAttribute('data-sort');
                sortProducts(sortType);
            });
        });
    }

    function sortProducts(type) {
        const itemsArray = Array.from(productItems);

        itemsArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price')) || 0;
            const priceB = parseFloat(b.getAttribute('data-price')) || 0;
            const ratingA = parseFloat(a.getAttribute('data-rating')) || 0;
            const ratingB = parseFloat(b.getAttribute('data-rating')) || 0;

            if (type === 'price-low') return priceA - priceB;
            if (type === 'price-high') return priceB - priceA;
            if (type === 'rating') return ratingB - ratingA;
            return 0;
        });

        // Re-append items in new order
        itemsArray.forEach(item => productGrid.appendChild(item));
    }

    // Search Functionality
    const searchForm = document.querySelector('.navbar-search');
    const searchInput = document.querySelector('.navbar-search input[type="search"]');

    function performSearch(query) {
        const queryClean = query.trim().toLowerCase();
        // Check if we are on a page where we can filter locally (products.html or any page with .product-item)
        const canFilterLocally = window.location.pathname.includes('products.html');

        if (canFilterLocally) {
            activeFilters.search = queryClean;
            applyFilters();
        } else if (queryClean !== '') {
            // Redirect to products.html if we are not already there
            window.location.href = `products.html?search=${encodeURIComponent(queryClean)}`;
        }
    }

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch(searchInput.value);
        });

        // Real-time search (only if on products page)
        searchInput.addEventListener('input', () => {
            if (window.location.pathname.includes('products.html')) {
                activeFilters.search = searchInput.value.trim().toLowerCase();
                applyFilters();
            }
        });
    }

    // URL Search Param Handling on Load
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const categoryParam = urlParams.get('category');

    if (searchParam && window.location.pathname.includes('products.html')) {
        if (searchInput) searchInput.value = searchParam;
        activeFilters.search = searchParam.toLowerCase();
        applyFilters();
    }

    if (categoryParam && window.location.pathname.includes('products.html')) {
        activeFilters.category = categoryParam.toLowerCase();
        // Update sidebar active state
        document.querySelectorAll('.filter-link[data-category]').forEach(l => {
            if (l.getAttribute('data-category') === categoryParam.toLowerCase()) {
                l.classList.add('active', 'fw-bold');
            } else {
                l.classList.remove('active', 'fw-bold');
            }
        });
        applyFilters();
    }

    // Initialize Auth
    initAuth();
});

// Simple script to switch tabs programmatically
function triggerTab(tabId) {
    const tabEl = document.getElementById(tabId)
    if (tabEl) {
        const tab = new bootstrap.Tab(tabEl)
        tab.show()
    }
}

function initAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const greetingEl = document.querySelector('.navbar-nav .nav-link[href="login.html"] .small, .navbar-nav .nav-link #nav-greeting');

    // Update Greeting if logged in
    if (user && greetingEl) {
        greetingEl.textContent = `Hello, ${user.name.split(' ')[0]}`; // Use first name
        const accountEl = greetingEl.nextElementSibling;
        if (accountEl) accountEl.textContent = 'Sign Out';

        const loginLink = greetingEl.closest('a');
        if (loginLink) {
            loginLink.href = '#';
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        }
    }

    // Handle Auth Forms on Login Page
    if (window.location.pathname.includes('login.html')) {
        const loginForm = document.querySelector('#login form');
        const signupForm = document.querySelector('#signup form');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;

                const users = JSON.parse(localStorage.getItem('users')) || [];
                const matchedUser = users.find(u => u.email === email && u.password === password);

                if (matchedUser) {
                    localStorage.setItem('currentUser', JSON.stringify(matchedUser));
                    showNotification('Signed in successfully!');
                    setTimeout(() => window.location.href = 'index.html', 1000);
                } else {
                    alert('Invalid email or password');
                }
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('signupName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                const confirmPassword = document.getElementById('signupPasswordConfirm').value;

                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }

                if (password.length < 6) {
                    alert('Password must be at least 6 characters!');
                    return;
                }

                const users = JSON.parse(localStorage.getItem('users')) || [];
                if (users.find(u => u.email === email)) {
                    alert('An account with this email already exists.');
                    return;
                }

                const newUser = { name, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(newUser));

                showNotification('Account created successfully!');
                setTimeout(() => window.location.href = 'index.html', 1000);
            });
        }
    }
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification('Item added to cart!');
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-badge-count');
    if (badge) {
        const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
        badge.textContent = totalQty;
    }
}

