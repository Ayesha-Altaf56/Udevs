import { TrendingUp, Users, Package, DollarSign, Tag, Clock } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Dashboard() {
    // Dynamic data from Local Storage
    const [products] = useLocalStorage('products', []);

    // Derived Statistics
    const totalProducts = products.length;
    const uniqueCategories = new Set(products.filter(p => p.category).map(p => p.category)).size;

    // Assuming newly added products are appended to the array, reverse it for recent ones.
    const recentActivity = [...products].reverse().slice(0, 5);

    const stats = [
        { name: 'Total Products', value: totalProducts, change: '+12%', icon: Package, trend: 'up', color: 'blue' },
        { name: 'Total Categories', value: uniqueCategories, change: '+2', icon: Tag, trend: 'up', color: 'indigo' },
        { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, trend: 'up', color: 'emerald' },
        { name: 'Active Users', value: '2,350', change: '+15.2%', icon: Users, trend: 'up', color: 'amber' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors sm:w-auto w-full shadow-sm">
                    Download Report
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 bg-${stat.color}-50 rounded-full flex items-center justify-center text-${stat.color}-600`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className={`text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-slate-500 ml-2">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Revenue Overview</h2>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                        <TrendingUp className="w-8 h-8 text-slate-300 mr-3" />
                        <p className="text-slate-500 font-medium">Chart Component Placeholder</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm overflow-hidden flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((product, i) => (
                                <div key={product.id || i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                                        <Package className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            Added "{product.name}"
                                        </p>
                                        <div className="flex items-center mt-1">
                                            <Tag className="w-3 h-3 text-slate-400 mr-1" />
                                            <p className="text-xs text-slate-500">{product.category}</p>
                                            <span className="mx-2 text-slate-300">•</span>
                                            <Clock className="w-3 h-3 text-slate-400 mr-1" />
                                            <p className="text-xs text-slate-500">Just now</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium text-slate-900">No recent activity</p>
                                <p className="text-xs text-slate-500 mt-1">Add some products to see them here.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
