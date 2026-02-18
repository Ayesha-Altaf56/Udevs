import React from 'react';
import { Link } from 'react-router-dom';

const CustomerService = () => {
    return (
        <div className="container my-5">
            <div className="card shadow-sm p-5 text-center border-0 rounded-4">
                <i className="fa-solid fa-headset fa-4x text-primary mb-4"></i>
                <h1 className="fw-bold mb-3">Customer Service</h1>
                <p className="text-muted fs-5 mb-4">Hello! What can we help you with today?</p>
                <div className="row g-4 text-start">
                    <div className="col-md-4">
                        <div className="p-3 border rounded-3 hover-shadow">
                            <h5 className="fw-bold"><i className="fa-solid fa-box me-2"></i>Your Orders</h5>
                            <p className="small text-muted">Track packages, edit or cancel orders.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 border rounded-3 hover-shadow">
                            <h5 className="fw-bold"><i className="fa-solid fa-arrow-rotate-left me-2"></i>Returns & Refunds</h5>
                            <p className="small text-muted">Return or exchange items, print return labels.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 border rounded-3 hover-shadow">
                            <h5 className="fw-bold"><i className="fa-solid fa-lock me-2"></i>Login & Security</h5>
                            <p className="small text-muted">Edit login, name, and mobile number.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerService;
