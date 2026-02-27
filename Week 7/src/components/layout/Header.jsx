import { Bell, Search, User } from 'lucide-react';

function Header() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 transition-colors">
            <div className="flex items-center flex-1">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-400 text-sm"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="md:hidden relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                    <Search className="w-5 h-5" />
                </button>
                <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
                <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden md:block px-1">Admin User</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
