import { Settings as SettingsIcon } from 'lucide-react';

function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Configure your system preferences and application settings.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <SettingsIcon className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Coming Soon</h2>
                <p className="text-slate-500 max-w-sm mt-2">
                    The Settings module is currently under construction and will be available in a future update.
                </p>
            </div>
        </div>
    );
}

export default Settings;
