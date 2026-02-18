import React from 'react';
import { useOutletContext, Navigate, Link } from 'react-router-dom';

const Invoice = () => {
    const { cartItems } = useOutletContext();

    // If cart is empty and we are on invoice page, it might be a direct access or after clearing.
    // For demonstration, let's redirect to cart if empty.
    if (cartItems.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    const orderNumber = Math.floor(Math.random() * 90000000) + 10000000;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="container my-5 px-lg-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-dark text-white p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="fw-bold mb-0 text-white"><i className="fa-solid fa-cart-shopping me-2"></i>E-Shop</h2>
                            <p className="mb-0 text-white-50">Order Invoice</p>
                        </div>
                        <div className="text-end">
                            <h5 className="mb-0">INVOICE #{orderNumber}</h5>
                            <p className="mb-0 text-white-50">Date: {date}</p>
                        </div>
                    </div>
                </div>
                <div className="card-body p-5">
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <h6 className="text-muted text-uppercase fw-bold mb-3">Billing From:</h6>
                            <p className="mb-0 fw-bold">E-Shop Inc.</p>
                            <p className="mb-0">123 Commerce St</p>
                            <p className="mb-0">Silicon Valley, CA 94025</p>
                            <p className="mb-0">support@eshop.com</p>
                        </div>
                        <div className="col-sm-6 text-sm-end">
                            <h6 className="text-muted text-uppercase fw-bold mb-3">Billing To:</h6>
                            <p className="mb-0 fw-bold">Guest Customer</p>
                            <p className="mb-0">456 Buyer Ave</p>
                            <p className="mb-0">New York, NY 10001</p>
                            <p className="mb-0">customer@example.com</p>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-borderless">
                            <thead className="border-bottom">
                                <tr>
                                    <th className="py-3">Description</th>
                                    <th className="py-3 text-center">Qty</th>
                                    <th className="py-3 text-end">Price</th>
                                    <th className="py-3 text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="border-bottom">
                                        <td className="py-3">
                                            <div className="fw-bold">{item.title}</div>
                                            <div className="small text-muted">SKU: {item.id}00-ABC</div>
                                        </td>
                                        <td className="py-3 text-center align-middle">{item.qty}</td>
                                        <td className="py-3 text-end align-middle">${item.price.toFixed(2)}</td>
                                        <td className="py-3 text-end align-middle fw-bold">${(item.price * item.qty).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row justify-content-end mt-4">
                        <div className="col-md-5">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal:</span>
                                <span className="fw-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Tax (8%):</span>
                                <span className="fw-bold">${tax.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="h4 mb-0 fw-bold">Total:</span>
                                <span className="h4 mb-0 fw-bold text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-top text-center text-muted">
                        <p className="mb-1 fw-bold">Thank you for your purchase!</p>
                        <p className="small">If you have any questions, please contact our customer service.</p>
                        <div className="mt-4 gap-2 d-flex justify-content-center no-print">
                            <button className="btn btn-outline-dark px-4" onClick={() => window.print()}>
                                <i className="fa-solid fa-print me-2"></i>Print Invoice
                            </button>
                            <Link to="/" className="btn btn-primary-custom px-4">
                                Back to Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                @media print {
                    .no-print, footer, header, .sidenav, .close-btn-container, .overlay {
                        display: none !important;
                    }
                    body {
                        background-color: white !important;
                    }
                    .container {
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .card {
                        box-shadow: none !important;
                        border: none !important;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default Invoice;
