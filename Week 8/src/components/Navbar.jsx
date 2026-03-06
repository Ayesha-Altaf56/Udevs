import React from 'react';
import { Search, Bell, ShoppingCart, Menu, Watch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 sm:px-6 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
            <div className="flex items-center flex-1 gap-4">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-3 lg:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Brand Logo - Visible on Mobile when Sidebar is hidden */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
                            <Watch className="text-white w-5 h-5" />
                        </div>
                        <span className="text-slate-900 font-black text-lg tracking-tight hidden sm:block">Varnex</span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full max-w-md hidden md:block lg:ml-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search premium watches..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                {/* Mobile Search Icon */}
                <button className="md:hidden p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50">
                    <Search className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Cart */}
                <button
                    onClick={() => navigate('/cart')}
                    className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </button>

                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                {/* Profile */}
                <button className="flex items-center gap-3 py-1 pr-1 pl-1 sm:pl-3 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-semibold text-slate-700 leading-none">Ayesha</p>
                        <p className="text-xs text-slate-500 mt-1">Admin</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white">
                        A
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
