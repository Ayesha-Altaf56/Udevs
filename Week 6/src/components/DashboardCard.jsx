import React from 'react';

const DashboardCard = ({ title, value, icon, trend, trendValue, color }) => {
    return (
        <div className="col-xl-3 col-md-6">
            <div className={`card admin-card bg-${color} text-${color === 'warning' || color === 'light' ? 'dark' : 'white'} h-100`}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className={`text-${color === 'warning' || color === 'light' ? 'dark' : 'white'}-50 text-uppercase mb-2`}>{title}</h6>
                            <h3 className="mb-0">{value}</h3>
                        </div>
                        <div className="admin-icon">
                            <i className={`fas ${icon}`}></i>
                        </div>
                    </div>
                    <div className="mt-3">
                        <span className={`badge bg-${color === 'warning' || color === 'light' ? 'dark' : 'light'} text-${color}`}>
                            <i className={`fas fa-arrow-${trend === 'up' ? 'up' : 'down'} me-1`}></i>
                            {trendValue}
                        </span>
                        <span className={`small ms-1 text-${color === 'warning' || color === 'light' ? 'dark' : 'white'}-50`}>Since last month</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
