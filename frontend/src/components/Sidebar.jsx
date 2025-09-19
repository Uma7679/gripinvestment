import React from "react";
import {DashboardIcon} from "./icons/DashboardIcon";
import {ProductsIcon} from "./icons/ProductsIcon";
import {PortfolioIcon} from "./icons/PortfolioIcon";
import {LogsIcon} from "./icons/LogsIcon";
import {ProfileIcon} from "./icons/ProfileIcon";

export default function Sidebar({ currentPage, setCurrentPage, onLogout }) {
    const navItems = [
        { name: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
        { name: 'products', label: 'Products', Icon: ProductsIcon },
        { name: 'portfolio', label: 'My Portfolio', Icon: PortfolioIcon },
        { name: 'logs', label: 'Transaction Logs', Icon: LogsIcon },
        { name: 'profile', label: 'Profile', Icon: ProfileIcon },
    ];

    return (
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex items-center justify-center h-20 border-b">
                {/* Keep your Grip brand - you can use GripIcon component */}
                <div className="flex items-center">
                    <div className="h-10 w-10 text-emerald-600"><svg/></div>
                    <span className="text-2xl font-bold ml-2 text-gray-800">Grip</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => (
                    <button key={item.name} onClick={() => setCurrentPage(item.name)}
                            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${currentPage === item.name ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'}`}>
                        <item.Icon className="h-5 w-5 mr-3" />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="px-4 py-6 border-t">
                <button onClick={onLogout} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">
                    Logout
                </button>
            </div>
        </div>
    );
}
