import React from 'react';

const Sell = () => {
    return (
        <div className="container my-5 text-center">
            <div className="py-5 px-3 bg-dark text-white shadow rounded-4" style={{ background: 'linear-gradient(135deg, #131921 0%, #232f3e 100%)' }}>
                <i className="fa-solid fa-store fa-4x text-warning mb-4"></i>
                <h1 className="fw-bold mb-3">Become an E-Shop Seller</h1>
                <p className="fs-5 mb-4 text-white-50">Reach hundreds of millions of customers and start your business today.</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-warning px-5 py-3 rounded-pill fw-bold">Sign up to Sell</button>
                    <button className="btn btn-outline-light px-5 py-3 rounded-pill fw-bold">Learn more</button>
                </div>
                <div className="row mt-5 pt-3 g-4">
                    <div className="col-md-4">
                        <i className="fa-solid fa-earth-americas fa-2x mb-2 text-warning"></i>
                        <h5>Global Reach</h5>
                    </div>
                    <div className="col-md-4">
                        <i className="fa-solid fa-truck-fast fa-2x mb-2 text-warning"></i>
                        <h5>Fulfillment by E-Shop</h5>
                    </div>
                    <div className="col-md-4">
                        <i className="fa-solid fa-chart-line fa-2x mb-2 text-warning"></i>
                        <h5>Grow Your Business</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sell;
