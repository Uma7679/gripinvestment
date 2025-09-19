import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
import React, { useState } from "react";

export default function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");

    return (
        <AuthProvider>
            <Router>
                <div className="flex min-h-screen">
                    <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={() => { localStorage.clear(); window.location.href = "/auth"; }} />
                    <div className="flex-1 flex flex-col">
                        <Navbar user={{ firstName: localStorage.getItem("firstName") || localStorage.getItem("email") }} />
                        <main className="flex-1">
                            <AppRoutes />
                        </main>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}
