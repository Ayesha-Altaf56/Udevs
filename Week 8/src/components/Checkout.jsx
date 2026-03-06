import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { getCartTotal } = useCart();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const shipping = 15.00;
    const taxes = getCartTotal() * 0.08;
    const total = getCartTotal() + shipping + taxes;

    if (isSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 max-w-lg mx-auto text-center px-4">
                <div className="w-24 h-24 bg-emerald-50 flex items-center justify-center rounded-full mb-6 relative">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Order Confirmed!</h2>
                <p className="text-slate-500 mb-8 text-lg">
                    Thank you for your premium purchase. Your luxurious timepiece is being prepared for shipping and will arrive securely.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3.5 w-full sm:w-auto bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link to="/cart" className="p-3 bg-white rounded-xl shadow-sm text-slate-500 hover:text-indigo-600 transition-colors border border-slate-200">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">Checkout</h1>
                    <p className="text-slate-500">Complete your premium order</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
                            Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" />
                            <input type="text" placeholder="Last Name" className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" />
                            <input type="text" placeholder="Address Address" className="w-full sm:col-span-2 p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" />
                            <input type="text" placeholder="City" className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" />
                            <input type="text" placeholder="Postal Code" className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" />
                        </div>
                    </div>

                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 border-b border-slate-100 pb-4">
                            <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
                            Payment Details
                        </h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Card Number" className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-mono" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/YY" className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-mono" />
                                <input type="text" placeholder="CVC" className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-mono" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl shadow-slate-900/20 sticky top-28">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-700 pb-4">
                            <CheckCircle2 className="text-indigo-400" />
                            Order Finalization
                        </h2>

                        <div className="space-y-4 mb-8 text-slate-300">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-white">${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-medium text-white">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes (8%)</span>
                                <span className="font-medium text-white">${taxes.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-700/50 pt-6 mb-8 mt-auto">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-lg text-slate-300">Total</span>
                                <span className="text-4xl font-black">${total.toFixed(2)}</span>
                            </div>
                            <p className="text-right text-xs text-slate-500">Including all fees & taxes</p>
                        </div>

                        <button
                            onClick={() => {
                                setIsSuccess(true);
                                window.scrollTo(0, 0); // Scroll top for the success view
                            }}
                            className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
                        >
                            Place Order Securely
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
