import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="#">
                            <i className="fas fa-home me-2"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <i className="fas fa-box me-2"></i>
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <i className="fas fa-shopping-cart me-2"></i>
                            Orders
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <i className="fas fa-users me-2"></i>
                            Customers
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <i className="fas fa-chart-bar me-2"></i>
                            Reports
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <i className="fas fa-cog me-2"></i>
                            Settings
                        </Link>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span>Saved reports</span>
                    <Link className="link-secondary" to="#" aria-label="Add a new report">
                        <i className="fas fa-plus-circle"></i>
                    </Link>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <i className="fas fa-file-alt me-2"></i>
                            Current month
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            <i className="fas fa-file-alt me-2"></i>
                            Last quarter
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
