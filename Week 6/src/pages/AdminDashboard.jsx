import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import TableRow from '../components/TableRow';

const AdminDashboard = () => {
    // Dummy Data
    const stats = [
        {
            id: 1,
            title: "Total Sales",
            value: "$48,250",
            icon: "fa-dollar-sign",
            color: "primary",
            trend: "up",
            trendValue: "12.5%"
        },
        {
            id: 2,
            title: "Total Orders",
            value: "1,250",
            icon: "fa-shopping-bag",
            color: "success",
            trend: "up",
            trendValue: "5.2%"
        },
        {
            id: 3,
            title: "New Users",
            value: "324",
            icon: "fa-user-plus",
            color: "warning",
            trend: "up",
            trendValue: "2.1%"
        },
        {
            id: 4,
            title: "Pending Requests",
            value: "18",
            icon: "fa-exclamation-circle",
            color: "danger",
            trend: "down",
            trendValue: "1.5%"
        }
    ];

    const orders = [
        {
            id: "#ORD-001",
            customer: "John Doe",
            product: "Wireless Headphones",
            date: "Oct 15, 2026",
            amount: "$199.99",
            status: "Completed"
        },
        {
            id: "#ORD-002",
            customer: "Sarah Smith",
            product: "Smart Watch Series 5",
            date: "Oct 14, 2026",
            amount: "$399.00",
            status: "Pending"
        },
        {
            id: "#ORD-003",
            customer: "Michael Brown",
            product: "Running Sneakers",
            date: "Oct 14, 2026",
            amount: "$89.00",
            status: "Processing"
        },
        {
            id: "#ORD-004",
            customer: "Emily Davis",
            product: "Digital Camera",
            date: "Oct 13, 2026",
            amount: "$599.00",
            status: "Cancelled"
        },
        {
            id: "#ORD-005",
            customer: "William Wilson",
            product: "Gaming Mouse",
            date: "Oct 12, 2026",
            amount: "$45.50",
            status: "Completed"
        }
    ];

    return (
        <div className="bg-light" style={{ minHeight: '100vh' }}>
            {/* Top Navbar for Admin */}
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" style={{ zIndex: 1030 }}>
                <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" to="/">E-Shop Admin</Link>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="w-100"></div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <Link className="nav-link px-3" to="/login">Sign out</Link>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    {/* Reusable Sidebar Component */}
                    <Sidebar />

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                    <i className="fas fa-calendar me-1"></i>
                                    This week
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="row g-4 mb-4">
                            {stats.map(stat => (
                                <DashboardCard
                                    key={stat.id}
                                    title={stat.title}
                                    value={stat.value}
                                    icon={stat.icon}
                                    color={stat.color}
                                    trend={stat.trend}
                                    trendValue={stat.trendValue}
                                />
                            ))}
                        </div>

                        {/* Recent Orders Area */}
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="card shadow-sm border-0">
                                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">Recent Orders</h5>
                                        <button className="btn btn-sm btn-outline-primary">View All</button>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Customer</th>
                                                    <th>Product</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map(order => (
                                                    <TableRow key={order.id} order={order} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
