import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

function Layout() {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
                    <Outlet />
                </main>
            </div>
            <MobileNav />
        </div>
    );
}

export default Layout;
