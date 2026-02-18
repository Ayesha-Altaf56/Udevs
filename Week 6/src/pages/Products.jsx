import React from 'react';
import { Link, useOutletContext, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Products = ({ view }) => {
    const { addToCart } = useOutletContext();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const categoryQuery = searchParams.get('category');

    const isDealsView = view === 'deals';

    // Sample data for products to demonstrate reusability
    const allProducts = [
        {
            id: 1,
            title: "Premium Wireless Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 4.5,
            reviewCount: "2,401",
            price: 199.99,
            deliveryDate: "Mon, Dec 25",
            isDeal: true,
            category: 'headphones'
        },
        {
            id: 2,
            title: "Ultra-Slim Laptop 15.6\"",
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 4,
            reviewCount: "350",
            price: 749.00,
            deliveryDate: "Mon, Dec 25",
            isDeal: false,
            category: 'computers'
        },
        {
            id: 3,
            title: "4K Digital Camera with Lens",
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 5,
            reviewCount: "89",
            price: 599.00,
            deliveryDate: "Tue, Dec 26",
            isDeal: true,
            category: 'camera'
        },
        {
            id: 4,
            title: "Fitness Tracker Smart Watch",
            image: "/images/smart-band.png",
            rating: 4,
            reviewCount: "1,029",
            price: 49.99,
            deliveryDate: "Tomorrow",
            isDeal: true,
            category: 'electronics'
        },
        {
            id: 5,
            title: "Professional Sketching Set",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 4.8,
            reviewCount: "512",
            price: 29.99,
            deliveryDate: "Tomorrow",
            isDeal: false,
            category: 'arts-crafts'
        }
    ];

    let products = allProducts;
    if (isDealsView) {
        products = products.filter(p => p.isDeal);
    }
    if (categoryQuery) {
        products = products.filter(p => p.category === categoryQuery);
    }
    if (searchQuery) {
        products = products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const getResultText = () => {
        if (searchQuery) return `search results for "${searchQuery}"`;
        if (categoryQuery) return `category: ${categoryQuery}`;
        return isDealsView ? "Today's Deals" : "All Departments";
    };

    return (
        <main className="container-fluid my-4">
            <div className="row">
                {/* Sidebar / Filter Section */}
                <aside className="col-lg-2 col-md-3 d-none d-md-block filter-section border-end bg-white">
                    <div className="p-2">
                        <h5>Department</h5>
                        <Link to="/products" className={`filter-link ${!isDealsView && !categoryQuery ? 'active fw-bold' : ''}`}>All Departments</Link>
                        <Link to="/todays-deals" className={`filter-link ${isDealsView ? 'active fw-bold' : ''}`}>Today's Deals</Link>
                        <Link to="/products?category=electronics" className={`filter-link ${categoryQuery === 'electronics' ? 'active fw-bold' : ''}`}>Electronics</Link>
                        <Link to="/products?category=computers" className={`filter-link ${categoryQuery === 'computers' ? 'active fw-bold' : ''}`}>Computers & Accessories</Link>
                        <Link to="/products?category=smart-home" className={`filter-link ${categoryQuery === 'smart-home' ? 'active fw-bold' : ''}`}>Smart Home</Link>
                        <Link to="/products?category=headphones" className={`filter-link ${categoryQuery === 'headphones' ? 'active fw-bold' : ''}`}>Headphones</Link>
                        <Link to="/products?category=camera" className={`filter-link ${categoryQuery === 'camera' ? 'active fw-bold' : ''}`}>Camera & Photo</Link>
                        <Link to="/products?category=fashion" className={`filter-link ${categoryQuery === 'fashion' ? 'active fw-bold' : ''}`}>Fashion</Link>
                        <Link to="/products?category=home-kitchen" className={`filter-link ${categoryQuery === 'home-kitchen' ? 'active fw-bold' : ''}`}>Home & Kitchen</Link>

                        <hr className="my-3" />

                        <h5>Customer Reviews</h5>
                        <Link to="#" className="filter-link">
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-solid fa-star text-warning"></i>
                            <i className="fa-regular fa-star text-warning"></i>
                            & Up
                        </Link>
                        {/* ... simpler links for brevity ... */}
                    </div>
                </aside>

                {/* Product Grid Section */}
                <div className="col-lg-10 col-md-9">
                    {/* Results Header & Sort */}
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                        <span className="small">Showing <span className="fw-bold text-danger">{getResultText()}</span></span>
                        <div className="dropdown">
                            <button className="btn btn-sm btn-outline-secondary dropdown-toggle rounded-pill shadow-sm"
                                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by: Featured
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow">
                                <li><Link className="dropdown-item active" to="#">Featured</Link></li>
                                <li><Link className="dropdown-item" to="#">Price: Low to High</Link></li>
                                <li><Link className="dropdown-item" to="#">Price: High to Low</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
                        {products.length > 0 ? (
                            products.map(product => (
                                <div className="col product-item" key={product.id}>
                                    <ProductCard product={product} onAddToCart={() => addToCart(product)} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12 py-5 text-center">
                                <h3>No products found</h3>
                                <p className="text-muted">Try a different search or category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Products;
