import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal, getCartCount } = useCart();
    const shipping = 15.00;
    const taxes = getCartTotal() * 0.08;
    const total = getCartTotal() + shipping + taxes;

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-indigo-50 flex items-center justify-center rounded-3xl mb-6">
                    <ShoppingBag className="w-12 h-12 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-8 max-w-sm text-center">Looks like you haven't added any luxury timepieces to your cart yet.</p>
                <Link
                    to="/"
                    className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
                >
                    Explore Watches
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Shopping Cart</h1>
                <p className="text-slate-500 text-lg">You have {getCartCount()} items in your cart.</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-10">
                {/* Cart Items */}
                <div className="flex-1 rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden h-fit">
                    <div className="hidden sm:grid grid-cols-12 gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-3 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Price</div>
                        <div className="col-span-1"></div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {cart.map((item) => (
                            <div key={item.id} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-4 items-center group">
                                {/* Product Info */}
                                <div className="col-span-1 font-bold sm:col-span-6 flex items-center gap-6">
                                    <div className="w-24 h-24 shrink-0 bg-slate-50 p-3 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50/50 transition-colors">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-1">{item.brand}</h3>
                                        <p className="text-lg font-bold text-slate-900 line-clamp-2">{item.name}</p>
                                        <p className="text-sm text-slate-500 mt-2 sm:hidden">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="col-span-1 sm:col-span-3 flex items-center sm:justify-center">
                                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-6 text-center font-bold text-slate-800">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="hidden sm:block col-span-2 text-right">
                                    <span className="text-xl font-bold text-slate-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>

                                {/* Remove */}
                                <div className="absolute top-6 right-6 sm:static sm:col-span-1 flex justify-end">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full xl:w-[400px]">
                    <div className="sticky top-28 rounded-3xl bg-slate-900 text-white p-8 shadow-2xl shadow-slate-900/20">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 text-slate-300">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-white">${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-medium text-white">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Tax</span>
                                <span className="font-medium text-white">${taxes.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-700/50 pt-6 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-lg text-slate-300">Total</span>
                                <span className="text-4xl font-black">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="w-full py-4 px-6 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-95 group">
                            Proceed to Checkout
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-slate-400 text-sm mt-4">Safe and secure payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
