import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image Wrapper */}
            <div className="relative aspect-square p-6 bg-slate-50/50 flex items-center justify-center overflow-hidden">
                <div className="absolute top-4 left-4">
                    {product.isNew && (
                        <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full tracking-wide">
                            NEW
                        </span>
                    )}
                </div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-48 h-48 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
                        />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">({product.reviews})</span>
                </div>

                <p className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mb-1">{product.brand}</p>
                <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2 line-clamp-2 flex-1">{product.name}</h3>

                <div className="flex items-end justify-between mt-4">
                    <div>
                        <p className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
                        {product.oldPrice && (
                            <p className="text-sm text-slate-400 line-through decoration-slate-300">${product.oldPrice.toFixed(2)}</p>
                        )}
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 group/btn"
                    >
                        <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
