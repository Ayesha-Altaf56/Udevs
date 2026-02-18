import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const { addToCart } = useOutletContext();
    // Sample data for products to demonstrate reusability
    const featuredProducts = [
        {
            id: 1,
            title: "Premium Noise Cancelling Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 4.5,
            reviewCount: "1,230",
            price: 199.99
        },
        {
            id: 2,
            title: "Sport Running Sneakers",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 4.5,
            reviewCount: "850",
            price: 89.00
        },
        {
            id: 3,
            title: "Smart Fitness Watch",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 5,
            reviewCount: "2,100",
            price: 149.50
        },
        {
            id: 4,
            title: "Digital Camera 4K",
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            rating: 4,
            reviewCount: "320",
            price: 599.00
        }
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section">
                {/* Background image handles visual */}
            </section>

            {/* Categories & Features Container */}
            <div className="container-fluid px-4" style={{ marginTop: '-250px', position: 'relative', zIndex: 2 }}>
                {/* Categories Row */}
                <div className="row g-4 mb-4">
                    <div className="col-md-3">
                        <div className="card category-card h-100">
                            <h3 className="card-title">Electronics</h3>
                            <img src="https://images.unsplash.com/photo-1511385348-a52b4a160dc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                className="category-img" alt="Electronics" />
                            <Link to="/products?category=electronics" className="btn-link text-decoration-none">See more</Link>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card h-100">
                            <h3 className="card-title">Fashion Trends</h3>
                            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                className="category-img" alt="Fashion" />
                            <Link to="/products?category=fashion" className="btn-link text-decoration-none">Explore now</Link>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card h-100">
                            <h3 className="card-title">Home & Kitchen</h3>
                            <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                                className="category-img" alt="Home" />
                            <Link to="/products?category=home-kitchen" className="btn-link text-decoration-none">Shop now</Link>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex flex-column gap-3">
                        {/* Sign in CTA for small card */}
                        <div className="card category-card text-center p-3" style={{ height: 'auto' }}>
                            <h4>Sign in for the best experience</h4>
                            <Link to="/login" className="btn btn-warning btn-sm my-2">Sign in securely</Link>
                        </div>
                    </div>
                </div>

                {/* Featured Products */}
                <section className="my-5 bg-white p-4 shadow-sm text-dark">
                    <h2 className="mb-4">Popular Products</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {featuredProducts.map(product => (
                            <div className="col product-item" key={product.id}>
                                <ProductCard product={product} compact={true} onAddToCart={() => addToCart(product)} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
