import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (onLogin) onLogin(); // Default to "User"
            alert(activeTab === 'login' ? 'Successfully signed in!' : 'Account created successfully!');
            navigate('/');
        }, 1500);
    };

    return (
        <div className="bg-white" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Auth Container */}
            <div className="container d-flex flex-column align-items-center mt-4" style={{ flex: 1 }}>

                {/* Logo */}
                <Link to="/" className="auth-logo mb-3 text-decoration-none">
                    <i className="fa-solid fa-cart-shopping me-2"></i> E-Shop
                </Link>

                {/* Auth Card */}
                <div className="auth-card shadow-none">

                    {/* Tabs */}
                    <ul className="nav nav-pills nav-fill mb-3" id="authTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                onClick={() => setActiveTab('login')}
                                type="button"
                                disabled={isLoading}>Sign In</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                                onClick={() => setActiveTab('signup')}
                                type="button"
                                disabled={isLoading}>Create Account</button>
                        </li>
                    </ul>

                    <div className="tab-content" id="authTabContent">

                        {/* Login Form */}
                        <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}>
                            <h3 className="mb-3">Sign in</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="loginEmail" className="form-label fw-bold small">Email or mobile phone number</label>
                                    <input type="email" className="form-control form-control-auth" id="loginEmail" required disabled={isLoading} />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between">
                                        <label htmlFor="loginPassword" className="form-label fw-bold small">Password</label>
                                        <Link to="#" className="small text-decoration-none" style={{ color: '#0066c0' }}>Forgot password?</Link>
                                    </div>
                                    <input type="password" className="form-control form-control-auth" id="loginPassword" required disabled={isLoading} />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-auth" disabled={isLoading}>
                                        {isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                                        Sign in
                                    </button>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="keepSignedIn" disabled={isLoading} />
                                    <label className="form-check-label small" htmlFor="keepSignedIn">
                                        Keep me signed in. <Link to="#" className="text-decoration-none">Details</Link>
                                    </label>
                                </div>
                            </form>

                            <div className="auth-separator">
                                <span>New to E-Shop?</span>
                            </div>

                            <button
                                className="btn btn-create-account shadow-sm"
                                onClick={() => setActiveTab('signup')}
                                disabled={isLoading}>
                                Create your E-Shop account
                            </button>
                        </div>

                        {/* Signup Form */}
                        <div className={`tab-pane fade ${activeTab === 'signup' ? 'show active' : ''}`}>
                            <h3 className="mb-3">Create account</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="signupName" className="form-label fw-bold small">Your name</label>
                                    <input type="text" className="form-control form-control-auth" id="signupName" placeholder="First and last name" required disabled={isLoading} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signupEmail" className="form-label fw-bold small">Mobile number or email</label>
                                    <input type="email" className="form-control form-control-auth" id="signupEmail" required disabled={isLoading} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signupPassword" className="form-label fw-bold small">Password</label>
                                    <input type="password" className="form-control form-control-auth" id="signupPassword" placeholder="At least 6 characters" required disabled={isLoading} />
                                    <div className="form-text small"><i className="fa-solid fa-info-circle me-1"></i> Passwords must be at least 6 characters.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signupPasswordConfirm" className="form-label fw-bold small">Re-enter password</label>
                                    <input type="password" className="form-control form-control-auth" id="signupPasswordConfirm" required disabled={isLoading} />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-auth" disabled={isLoading}>
                                        {isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                                        Create your E-Shop account
                                    </button>
                                </div>

                                <div className="small text-muted">
                                    By creating an account, you agree to E-Shop's <Link to="#" className="text-decoration-none">Conditions of Use</Link> and <Link to="#" className="text-decoration-none">Privacy Notice</Link>.
                                </div>

                                <div className="auth-separator">
                                    <span>Already have an account?</span>
                                </div>

                                <div className="text-center">
                                    <button
                                        className="btn btn-light w-100 border small shadow-sm"
                                        style={{ fontSize: '13px', padding: '8px' }}
                                        disabled={isLoading}
                                        onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}>Sign in</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* Auth Footer */}
            <div className="auth-footer mt-5 pb-5 bg-white border-top">
                <div className="container mt-4">
                    <div className="auth-footer-links mb-2 text-center">
                        <Link to="#" className="mx-2 small text-decoration-none" style={{ color: '#0066c0' }}>Conditions of Use</Link>
                        <Link to="#" className="mx-2 small text-decoration-none" style={{ color: '#0066c0' }}>Privacy Notice</Link>
                        <Link to="#" className="mx-2 small text-decoration-none" style={{ color: '#0066c0' }}>Help</Link>
                    </div>
                    <p className="text-center small text-muted">&copy; 1996-2026, E-Shop.com, Inc. or its affiliates</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
