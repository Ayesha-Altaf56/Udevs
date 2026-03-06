import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductList = ({ activeTab }) => {
    const filteredProducts = products.filter((product) => {
        if (activeTab === 'New Arrivals') return product.isNew;
        if (activeTab === 'Best Sellers') return product.reviews > 200;
        if (activeTab === 'Luxury') return product.price > 10000;
        return true; // 'All Watches'
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
