import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, PlusCircle, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Auto-collapse on smaller screens for better responsiveness
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) { // lg breakpoint
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        // Initial check
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mainNavItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard, exact: true },
        { name: 'Products', path: '/products', icon: Package, exact: false },
        { name: 'Add Product', path: '/add-product', icon: PlusCircle, exact: false },
    ];

    const bottomNavItems = [
        { name: 'Users', path: '/users', icon: Users, exact: false },
        { name: 'Settings', path: '/settings', icon: Settings, exact: false },
    ];

    const NavItem = ({ item }) => (
        <NavLink
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
                `group flex items-center rounded-lg font-medium transition-all duration-200 ${isCollapsed ? 'justify-center py-3' : 'px-3 py-2.5'
                } ${isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`
            }
            title={isCollapsed ? item.name : ""}
        >
            {({ isActive }) => (
                <>
                    <item.icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-blue-700" : "text-slate-500 group-hover:text-blue-600"} ${isCollapsed ? '' : 'mr-3'}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                </>
            )}
        </NavLink>
    );

    return (
        <aside
            className={`relative flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-20 ${isCollapsed ? 'w-20' : 'w-64'
                } hidden md:flex`}
        >
            {/* Logo Area */}
            <div className={`h-16 flex items-center border-b border-slate-200 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
                {isCollapsed ? (
                    <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                        A
                    </div>
                ) : (
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 whitespace-nowrap overflow-hidden">
                        AdminPro
                    </h1>
                )}
            </div>

            {/* Main Navigation Links */}
            <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto scroller">
                {mainNavItems.map((item) => (
                    <NavItem key={item.path} item={item} />
                ))}

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                    {bottomNavItems.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}
                </div>
            </nav>

            {/* Toggle Button */}
            <div className="p-4 border-t border-slate-200 flex justify-center bg-slate-50/50">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-white hover:text-slate-800 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-sm ${isCollapsed ? 'w-full' : 'w-full'}`}
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <span className="flex items-center w-full justify-center">
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Collapse</span>
                        </span>
                    )}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
