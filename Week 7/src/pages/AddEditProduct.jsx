import { useState, useEffect } from 'react';
import { Save, X, ImagePlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

function AddEditProduct() {
    const navigate = useNavigate();
    const { id } = useParams(); // For determining if we are in Edit Mode
    const [products, , { addProduct, updateProduct }] = useLocalStorage('products', []);

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'In Stock',
        description: '',
        image: '' // Storing base64 string for simplicity in local storage
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Load existing product if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const existingProduct = products.find(p => p.id === id);
            if (existingProduct) {
                setFormData(existingProduct);
            } else {
                setError('Product not found.');
            }
        }
    }, [id, isEditMode, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(''); // Clear errors when user types
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (success) return; // Prevent double submissions

        setError('');

        // Basic Validation
        if (!formData.name.trim()) return setError('Product Name is required.');
        if (!formData.category.trim()) return setError('Please select a Category.');
        if (!formData.description.trim()) return setError('Description is required.');

        const numericPrice = Number(formData.price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            return setError('Price must be a valid positive number.');
        }

        const numericStock = Number(formData.stock);
        if (isNaN(numericStock) || numericStock < 0) {
            return setError('Stock must be zero or a positive number.');
        }

        // Action
        try {
            if (isEditMode) {
                updateProduct(id, formData);
            } else {
                addProduct(formData);
            }

            // Show Success Message and Delay Redirect
            setSuccess(true);
            setTimeout(() => {
                navigate('/products');
            }, 1200);

        } catch (err) {
            setError('Failed to save to local storage.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h1>
                <button
                    onClick={() => navigate('/products')}
                    className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 bg-white rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm self-end sm:self-auto"
                    title="Cancel"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-4">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-700 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Product successfully {isEditMode ? 'updated' : 'created'}! Redirecting...</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: Image Upload & Preview */}
                <div className="w-full md:w-1/3 bg-slate-50 p-6 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col items-center justify-center">
                    <label className="text-sm font-medium text-slate-700 mb-4 w-full text-center">Product Image</label>

                    <div className="relative w-full aspect-square max-w-[240px] rounded-2xl border-2 border-dashed border-slate-300 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center overflow-hidden cursor-pointer group shadow-sm">
                        {formData.image ? (
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 p-4">
                                <ImagePlus className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-medium text-center">Click to upload image</span>
                                <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP (Max 2MB)</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    {formData.image && (
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                            className="mt-4 text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
                        >
                            Remove Image
                        </button>
                    )}
                </div>

                {/* Right Side: Form Inputs */}
                <div className="w-full md:w-2/3 p-6 space-y-6 flex flex-col justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Status (Top Right placement feels better in hierarchy) */}
                        <div className="space-y-1 sm:col-span-2 flex justify-end">
                            <div className="inline-flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status:</span>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-medium text-slate-700 shadow-sm appearance-none cursor-pointer pr-8"
                                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em' }}
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Product Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Premium Wireless Headphones"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Category <span className="text-red-500">*</span></label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em 1em' }}
                                required
                            >
                                <option value="" disabled>Select a Category...</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Home & Office">Home & Office</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Price ($) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="w-full pl-8 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Stock Quantity <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                required
                            />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Description <span className="text-red-500">*</span></label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Brief description of the product..."
                                rows="3"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm resize-y"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex justify-end gap-3 mt-auto">
                        <button
                            type="button"
                            onClick={() => navigate('/products')}
                            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isEditMode ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddEditProduct;
