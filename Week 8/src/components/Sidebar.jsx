import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Watch, CreditCard, LogOut, ChevronLeft, ChevronRight, Home } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
        { name: 'Dashboard / Home', path: '/', icon: Home },
        { name: 'Watches', path: '#watches', icon: Watch },
        { name: 'Cart', path: '/cart', icon: ShoppingCart },
        { name: 'Checkout', path: '/checkout', icon: CreditCard },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-slate-900 border-r border-slate-800 flex flex-col pt-4 ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Brand */}
                <div className="h-16 flex items-center justify-between px-4 mb-6">
                    <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap transition-all duration-300 ${!isOpen && 'lg:opacity-0 lg:w-0'}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
                            <Watch className="text-white w-6 h-6" />
                        </div>
                        <span className="text-white font-black text-xl tracking-tight">Varnex <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Watch</span></span>
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shadow-sm"
                    >
                        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>

                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive && !item.path.includes('#')
                                    ? 'bg-indigo-600/10 text-indigo-400'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && !item.path.includes('#') && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
                                    )}
                                    <item.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                                    <span
                                        className={`font-semibold tracking-wide transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 max-w-full' : 'lg:opacity-0 lg:max-w-0'
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout Section */}
                <div className="p-4 mt-auto border-t border-slate-800/50">
                    <button className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 group">
                        <LogOut className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                        <span
                            className={`font-medium transition-all duration-300 whitespace-nowrap overflow-hidden ${isOpen ? 'opacity-100 max-w-full' : 'lg:opacity-0 lg:max-w-0'
                                }`}
                        >
                            Sign Out
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
