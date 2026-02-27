import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, Users, PlusCircle } from 'lucide-react';

function MobileNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 px-4 z-50">
            <NavLink
                to="/"
                end
                className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-[10px] font-medium">Dashboard</span>
            </NavLink>
            <NavLink
                to="/products"
                className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <Package className="w-5 h-5" />
                <span className="text-[10px] font-medium">Products</span>
            </NavLink>
            <NavLink
                to="/users"
                className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <Users className="w-5 h-5" />
                <span className="text-[10px] font-medium">Users</span>
            </NavLink>
            <NavLink
                to="/add-product"
                className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <PlusCircle className="w-5 h-5" />
                <span className="text-[10px] font-medium">Add</span>
            </NavLink>
            <NavLink
                to="/settings"
                className={({ isActive }) => `flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <Settings className="w-5 h-5" />
                <span className="text-[10px] font-medium">Settings</span>
            </NavLink>
        </div>
    );
}

export default MobileNav;
