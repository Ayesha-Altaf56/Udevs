import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
    const [activeTab, setActiveTab] = useState('All Watches');
    const tabs = ['All Watches', 'New Arrivals', 'Best Sellers', 'Luxury'];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Explore Catalog</h1>
                    <p className="text-slate-500 text-lg">Discover our premium collection of luxury timepieces.</p>
                </div>
                <div className="flex p-1 bg-white border border-slate-200 rounded-xl overflow-x-auto custom-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300 ${activeTab === tab
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <ProductList activeTab={activeTab} />
        </div>
    );
};

export default Home;
