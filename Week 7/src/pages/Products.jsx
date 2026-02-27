import { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Products() {
    // Local Storage hook setup
    const [products, , { removeProduct }] = useLocalStorage('products', []);

    // Local State for Search, Filter, and Modal
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [productToDelete, setProductToDelete] = useState(null);

    // Dynamic Categories based on current products
    const categories = useMemo(() => {
        const uniqueCategories = new Set(products.map(p => p.category).filter(Boolean));
        return ['All', ...Array.from(uniqueCategories)];
    }, [products]);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.id?.toString().includes(searchQuery);
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    // Delete Handlers
    const confirmDelete = () => {
        if (productToDelete) {
            removeProduct(productToDelete.id);
            setProductToDelete(null);
        }
    };

    // Helper for Stock Status Color
    const getStockBadge = (stock) => {
        const numStock = Number(stock);
        if (numStock > 10) return { label: 'In Stock', classes: 'bg-emerald-50 text-emerald-700' };
        if (numStock > 0) return { label: 'Low Stock', classes: 'bg-amber-50 text-amber-700' };
        return { label: 'Out of Stock', classes: 'bg-red-50 text-red-700' };
    };

    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your product catalog and inventory.</p>
                </div>
                <Link to="/add-product" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors sm:w-auto w-full shadow-sm">
                    <Plus className="w-5 h-5 mr-2 -ml-1" />
                    Add Product
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">

                {/* Filters and Search Bar */}
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 text-sm shadow-sm"
                        />
                    </div>

                    <div className="w-full sm:w-auto flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full sm:w-auto pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-700 shadow-sm appearance-none cursor-pointer"
                            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em' }}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium whitespace-nowrap">
                            <tr>
                                <th className="px-6 py-4">Product Info</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => {
                                    const badge = getStockBadge(product.stock);
                                    return (
                                        <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900">{product.name}</span>
                                                    <span className="text-xs text-slate-400">ID: {product.id.slice(-6).toUpperCase()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                                                ${Number(product.price).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badge.classes}`}>
                                                    {badge.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        to={`/edit-product/${product.id}`}
                                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setProductToDelete(product)}
                                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="w-8 h-8 text-slate-300 mb-3" />
                                            <p className="font-medium text-slate-900">No products found</p>
                                            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4 bg-slate-50/50">
                    <p>Showing <span className="font-medium text-slate-900">{filteredProducts.length}</span> entries</p>
                </div>
            </div>

            {/* Delete Confirmation Modal Overlay */}
            {productToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
                    <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Delete Product</h3>
                            <p className="text-sm text-slate-500 mt-2">
                                Are you sure you want to delete <span className="font-semibold text-slate-700">"{productToDelete.name}"</span>?
                                This action cannot be undone.
                            </p>
                            <div className="flex justify-center gap-3 mt-6 w-full">
                                <button
                                    onClick={() => setProductToDelete(null)}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
