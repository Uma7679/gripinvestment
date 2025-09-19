// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
//
// export default function Navbar() {
//     const { user, logout } = useContext(AuthContext);
//
//     return (
//         <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
//             <Link to="/" className="text-xl font-bold">InvestSmart</Link>
//             <div className="space-x-4 hidden md:flex">
//                 <Link to="/" className="hover:underline">Home</Link>
//                 <Link to="/products" className="hover:underline">Products</Link>
//                 <Link to="/portfolio" className="hover:underline">Portfolio</Link>
//                 <Link to="/transactions" className="hover:underline">Transactions</Link>
//                 <Link to="/profile" className="hover:underline">Profile</Link>
//             </div>
//             <div>
//                 {user ? (
//                     <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
//                         Logout
//                     </button>
//                 ) : (
//                     <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">
//                         Login
//                     </Link>
//                 )}
//             </div>
//         </nav>
//     );
// }
//
// const Header = () => (
//     <header className="flex items-center justify-between p-4 md:px-12 bg-gray-100 border-b border-gray-200">
//         <div className="flex items-center space-x-2">
//             <div className="h-6 w-6 bg-black rounded-full"></div>
//             <span className="text-xl font-bold">Munolino</span>
//         </div>
//         <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-600">
//             <a href="#" className="hover:text-gray-900 transition-colors">About application</a>
//             <a href="#" className="hover:text-gray-900 transition-colors">Pricing</a>
//             <a href="#" className="hover:text-gray-900 transition-colors">Services</a>
//             <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
//         </div>
//         <div className="flex items-center space-x-2">
//             <button className="hidden md:block px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
//                 Get Started
//             </button>
//             <button className="p-2 bg-gray-200 rounded-full md:hidden">
//                 <PlusIcon className="w-4 h-4 text-gray-600" />
//             </button>
//             <button className="p-2 bg-white rounded-full border border-gray-300">
//                 <BellIcon className="w-4 h-4 text-gray-600" />
//             </button>
//             <button className="md:hidden p-2 bg-white rounded-full border border-gray-300">
//                 <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
//             </button>
//         </div>
//     </header>
// );

import React from "react";
import {GripIcon} from "./icons/GripIcon";

export default function Navbar({ user }) {
    return (
        <header className="bg-white border-b">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <GripIcon className="h-8 w-8 text-emerald-600"/>
                    <span className="text-xl font-semibold ml-2">Grip</span>
                </div>
                <div className="flex items-center">
                    <span className="text-sm font-medium hidden sm:block mr-4">Welcome, {user?.firstName || user?.email}</span>
                </div>
            </div>
        </header>
    );
}

