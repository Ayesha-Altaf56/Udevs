import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const ProductDetails = () => {
    const { addToCart } = useOutletContext();
    const [mainImage, setMainImage] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
    const [activeThumb, setActiveThumb] = useState(0);
    const [selectedQty, setSelectedQty] = useState(1);

    // Sample product data (in real app, fetched by ID)
    const currentProduct = {
        id: 1, // Matches the headphones in other arrays
        title: "Premium Noise Cancelling Wireless Over-Ear Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    };

    const handleAddToCart = () => {
        addToCart(currentProduct, selectedQty);
    };

    const images = [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1524678606372-987d7b66156b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    ];

    const handleThumbClick = (img, index) => {
        setMainImage(img.replace('w=500', 'w=1000'));
        setActiveThumb(index);
    };

    return (
        <main className="container-fluid my-4 px-lg-5">
            {/* Breadcrumb */}
            <div className="mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ fontSize: '0.9rem' }}>
                        <li className="breadcrumb-item"><Link to="/products" className="text-decoration-none text-muted">Electronics</Link></li>
                        <li className="breadcrumb-item"><Link to="/products" className="text-decoration-none text-muted">Headphones</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Over-Ear Headphones</li>
                    </ol>
                </nav>
            </div>

            <div className="row">
                {/* Image Gallery Column */}
                <div className="col-md-5 mb-4 position-relative">
                    <div className="d-flex sticky-top" style={{ top: '20px' }}>
                        {/* Thumbnails */}
                        <div className="d-flex flex-column me-3 d-none d-sm-flex">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    className={`thumbnail-img ${activeThumb === index ? 'active' : ''}`}
                                    alt={`Thumb ${index + 1}`}
                                    onClick={() => handleThumbClick(img, index)}
                                />
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-grow-1 text-center">
                            <img src={mainImage} className="img-fluid" style={{ maxHeight: '500px' }} alt="Main Product" />
                        </div>
                    </div>
                </div>

                {/* Product Details Column */}
                <div className="col-md-4 mb-4">
                    <h1 className="product-title mb-2">Premium Noise Cancelling Wireless Over-Ear Headphones with Microphone,
                        Deep Bass, 30 Hour Playtime, Bluetooth 5.0</h1>

                    <div className="mb-2">
                        <Link to="#" className="text-decoration-none small" style={{ color: '#007185' }}>Visit the Audio Store</Link>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <div className="rating me-2">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <Link to="#" className="text-decoration-none small me-2" style={{ color: '#007185' }}>2,401 ratings</Link>
                        <span className="text-muted small">|</span>
                        <Link to="#" className="text-decoration-none small ms-2" style={{ color: '#007185' }}>100+ answered questions</Link>
                    </div>

                    <hr />

                    <div className="mb-3">
                        <span className="text-muted small mb-1 d-block">List Price: <span
                            className="text-decoration-line-through">$249.99</span></span>
                        <div className="d-flex align-items-baseline">
                            <span className="fs-5 text-muted me-1">-20%</span>
                            <span className="product-price-large fw-medium me-1"><sup className="fs-6">$</sup>199<sup
                                className="fs-6">99</sup></span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <span className="fw-bold">Color:</span> <span className="text-muted">Matte Black</span>
                        <div className="mt-2">
                            <button className="btn btn-sm btn-outline-dark active me-2" style={{ width: '80px' }}>Black</button>
                            <button className="btn btn-sm btn-outline-secondary me-2" style={{ width: '80px' }}>Silver</button>
                            <button className="btn btn-sm btn-outline-secondary" style={{ width: '80px' }}>Blue</button>
                        </div>
                    </div>

                    <div className="my-4">
                        <h5 className="fs-6 fw-bold">About this item</h5>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><i className="fa-solid fa-circle fa-2xs me-2 text-dark"></i>INDUSTRY LEADING NOISE
                                CANCELLATION: Advanced noise cancelling technology blocks out ambient noise for a focused
                                listening experience.</li>
                            <li className="mb-2"><i className="fa-solid fa-circle fa-2xs me-2 text-dark"></i>PREMIUM SOUND QUALITY:
                                Enjoy high-resolution audio with deep, punchy bass and crystal clear highs.</li>
                            <li className="mb-2"><i className="fa-solid fa-circle fa-2xs me-2 text-dark"></i>ALL-DAY COMFORT: Super
                                soft ear pads and adjustable headband ensure comfort for long listening sessions.</li>
                            <li className="mb-2"><i className="fa-solid fa-circle fa-2xs me-2 text-dark"></i>LONG BATTERY LIFE: Up
                                to 30 hours of battery life on a single charge. Quick charging gives 5 hours of playback in
                                just 10 minutes.</li>
                            <li className="mb-2"><i className="fa-solid fa-circle fa-2xs me-2 text-dark"></i>CRYSTAL CLEAR CALLS:
                                Built-in microphone with voice isolation for clear hands-free calling.</li>
                        </ul>
                    </div>
                </div>

                {/* Buy Box Column */}
                <div className="col-md-3">
                    <div className="buy-box bg-white">
                        <div className="mb-2">
                            <span className="product-price-large fw-medium"><sup className="fs-6">$</sup>199<sup
                                className="fs-6">99</sup></span>
                        </div>
                        <div className="mb-3">
                            <div className="text-muted small">No Import Fees Deposit & $12.98 Shipping to your location</div>
                            <div className="small mt-2">Delivery <span className="fw-bold">Mon, Dec 25</span>. Order within <span
                                className="text-success">2 hrs 30 mins</span></div>
                        </div>
                        <div className="mb-3">
                            <span className="stock-status">In Stock</span>
                        </div>

                        <div className="mb-3">
                            <select
                                className="form-select form-select-sm rounded-pill mb-3"
                                aria-label="Quantity"
                                value={selectedQty}
                                onChange={(e) => setSelectedQty(parseInt(e.target.value))}
                            >
                                <option value="1">Qty: 1</option>
                                <option value="2">Qty: 2</option>
                                <option value="3">Qty: 3</option>
                                <option value="4">Qty: 4</option>
                                <option value="5">Qty: 5</option>
                            </select>

                            <button className="btn btn-primary-custom w-100 rounded-pill mb-2" onClick={handleAddToCart}>Add to Cart</button>
                            <button className="btn btn-buy-now w-100 rounded-pill mb-2">Buy Now</button>
                        </div>

                        <div className="small text-muted mb-3">
                            <table className="w-100">
                                <tbody>
                                    <tr>
                                        <td className="py-1">Ships from</td>
                                        <td className="py-1 text-end">E-Shop</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Sold by</td>
                                        <td className="py-1 text-end">AudioTech Inc.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="form-check small mb-3">
                            <input className="form-check-input" type="checkbox" id="giftCheck" />
                            <label className="form-check-label" htmlFor="giftCheck">
                                Add a gift receipt for easy returns
                            </label>
                        </div>

                        <button className="btn btn-sm btn-outline-secondary w-100 mb-2">Add to List</button>
                    </div>
                </div>
            </div>

            <hr className="my-5" />

            {/* Similar Products Section */}
            <div className="mb-5">
                <h4 className="fw-bold mb-4">Products related to this item</h4>
                <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
                    {/* Similar Item 1 */}
                    <div className="col">
                        <div className="card h-100 border-0">
                            <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                                className="card-img-top" alt="Similar" />
                            <div className="card-body p-1">
                                <Link to="#" className="text-dark text-decoration-none small fw-bold">Similar Wireless...</Link>
                                <div className="rating small mt-1">
                                    <i className="fa-solid fa-star text-warning"></i> 4.5
                                </div>
                                <div className="text-danger small mt-1">$49.99</div>
                            </div>
                        </div>
                    </div>
                    {/* Similar Item 2 */}
                    <div className="col">
                        <div className="card h-100 border-0">
                            <img src="https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                                className="card-img-top" alt="Similar" />
                            <div className="card-body p-1">
                                <Link to="#" className="text-dark text-decoration-none small fw-bold">Bluetooth Head...</Link>
                                <div className="rating small mt-1">
                                    <i className="fa-solid fa-star text-warning"></i> 4.3
                                </div>
                                <div className="text-danger small mt-1">$59.99</div>
                            </div>
                        </div>
                    </div>
                    {/* Similar Item 3 */}
                    <div className="col">
                        <div className="card h-100 border-0">
                            <img src="https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=60"
                                className="card-img-top" alt="Similar" />
                            <div className="card-body p-1">
                                <Link to="#" className="text-dark text-decoration-none small fw-bold">Pro Headset</Link>
                                <div className="rating small mt-1">
                                    <i className="fa-solid fa-star text-warning"></i> 4.7
                                </div>
                                <div className="text-danger small mt-1">$129.99</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
