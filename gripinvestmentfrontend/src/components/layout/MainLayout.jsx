import {useState} from "react";
import {
    DashboardIcon,
    GripIcon,
    LogsIcon,
    MenuIcon,
    PortfolioIcon,
    ProductsIcon,
    ProfileIcon
} from "../shared/Icons.jsx";

export const MainLayout = ({ user, onLogout, children, currentPage, setCurrentPage }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: DashboardIcon, page: 'dashboard' },
        { name: 'Products', icon: ProductsIcon, page: 'products' },
        { name: 'My Portfolio', icon: PortfolioIcon, page: 'portfolio' },
        { name: 'Transaction Logs', icon: LogsIcon, page: 'logs' },
        { name: 'Profile', icon: ProfileIcon, page: 'profile' },
    ];

    const NavLink = ({ item }) => (
        <button
            onClick={() => { setCurrentPage(item.page); setSidebarOpen(false); }}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentPage === item.page
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
        >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
        </button>
    );

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-20 border-b">
                <GripIcon className="h-8 w-8 text-emerald-600"/>
                <span className="text-2xl font-bold ml-2 text-gray-800">Grip</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => <NavLink key={item.page} item={item} />)}
            </nav>
            <div className="px-4 py-6 border-t">
                <button onClick={onLogout} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none">
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`fixed inset-0 flex z-40 lg:hidden transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)}></div>
                <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SidebarContent />
                </div>
            </div>
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
                    <SidebarContent />
                </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-shrink-0 bg-white border-b lg:border-none">
                    <div className="flex items-center justify-between p-4">
                        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                            <MenuIcon className="h-6 w-6 text-gray-500" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800 capitalize">{currentPage}</h1>
                        <div className="flex items-center">
                            <span className="text-sm font-medium hidden sm:block">Welcome, {user.firstName}</span>
                            <ProfileIcon className="h-8 w-8 ml-3 text-gray-600 bg-gray-200 rounded-full p-1"/>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};