import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Auto-collapse sidebar on smaller screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`transition-all duration-300 ease-in-out flex flex-col min-h-screen ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Layout;
