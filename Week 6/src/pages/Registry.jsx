import React from 'react';

const Registry = () => {
    return (
        <div className="container my-5 text-center">
            <div className="py-5 px-3 bg-white shadow-sm rounded-4">
                <i className="fa-solid fa-gift fa-4x text-warning mb-4"></i>
                <h1 className="fw-bold mb-3">Wedding & Baby Registry</h1>
                <p className="text-muted fs-5 mb-4">Create, manage, and find registries for any occasion.</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-primary-custom px-4 py-2">Create a Registry</button>
                    <button className="btn btn-outline-secondary px-4 py-2">Find a Registry</button>
                </div>
            </div>
        </div>
    );
};

export default Registry;
