import React from 'react';

const TableRow = ({ order }) => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'badge bg-success rounded-pill';
            case 'Pending': return 'badge bg-warning text-dark rounded-pill';
            case 'Processing': return 'badge bg-info text-dark rounded-pill';
            case 'Cancelled': return 'badge bg-danger rounded-pill';
            default: return 'badge bg-secondary rounded-pill';
        }
    };

    return (
        <tr>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.product}</td>
            <td>{order.date}</td>
            <td>{order.amount}</td>
            <td><span className={getStatusBadge(order.status)}>{order.status}</span></td>
            <td><button className="btn btn-sm btn-light"><i className="fas fa-ellipsis-v"></i></button></td>
        </tr>
    );
};

export default TableRow;
