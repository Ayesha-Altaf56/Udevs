import React from 'react';

const GiftCards = () => {
    return (
        <div className="container my-5">
            <h1 className="fw-bold mb-4">Gift Cards</h1>
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                        <img src="https://images.unsplash.com/photo-1549463512-20510ed6893e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} alt="Gift Card" />
                        <div className="card-body p-4">
                            <h3 className="fw-bold">eGift Cards</h3>
                            <p className="text-muted">Send it now or schedule for later. Choose from hundreds of designs.</p>
                            <button className="btn btn-warning w-100 rounded-pill fw-bold">Send an eGift</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                        <img src="https://images.unsplash.com/photo-1512909006721-3d6018887183?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} alt="Mail Card" />
                        <div className="card-body p-4">
                            <h3 className="fw-bold">Gift Cards by Mail</h3>
                            <p className="text-muted">Choose your design and we'll ship it for free in a specialty gift box.</p>
                            <button className="btn btn-outline-dark w-100 rounded-pill fw-bold">Order by Mail</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCards;
