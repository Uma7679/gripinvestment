import { jwtDecode } from "./utils/jwt";
import {apiService} from "./services/apiService.js";
import {useCallback, useEffect, useState} from "react";
import {formatCurrency} from "./utils/formatters.js";
import {DashboardPage} from "./components/dashboard/DashboardPage.jsx";
import {ProductsPage} from "./components/products/ProductsPage.jsx";
import {PortfolioPage} from "./components/portfolio/PortfolioPage.jsx";
import {TransactionLogsPage} from "./components/transactions/TransactionLogsPage.jsx";
import {ProfilePage} from "./components/profile/ProfilePage.jsx";
import {AuthPage} from "./components/auth/AuthPage.jsx";
import {MainLayout} from "./components/layout/MainLayout.jsx";

export default function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('gripToken'));
    const [currentPage, setCurrentPage] = useState('dashboard');

    const [products, setProducts] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllData = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const [productsData, portfolioData, logsData] = await Promise.all([
                apiService.getProducts(),
                apiService.getPortfolio(userId),
                apiService.getLogsByInvestor(userId)
            ]);
            setProducts(productsData || []);
            setInvestments(portfolioData || []);
            setLogs(logsData || []);
        } catch (err) {
            setError('Failed to fetch data. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                if (!decodedToken || !decodedToken.sub) {
                    handleLogout();
                    return;
                }

                const userData = {
                    id: decodedToken.sub,
                    email: decodedToken.email,
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                    risk_appetite: 'moderate'
                };

                if(!userData.id || !userData.email || !userData.firstName) {
                    console.error("JWT token is missing required claims (sub=uuid, email, firstName)");
                    handleLogout();
                    return;
                }

                setUser(userData);
                // fetchAllData(userData.id);
                fetchAllData(userData.id).catch((err) => {
                    console.error("Error fetching data:", err);
                });

            } catch (e) {
                console.error("Invalid token:", e);
                handleLogout();
            }
        } else {
            setLoading(false);
        }
    }, [token, fetchAllData]);

    const handleLogin = (authToken) => {
        localStorage.setItem('gripToken', authToken);
        setToken(authToken);
        setCurrentPage('dashboard');
    };

    const handleLogout = () => {
        localStorage.removeItem('gripToken');
        setToken(null);
        setUser(null);
        setInvestments([]);
        setProducts([]);
        setLogs([]);
    };

    const handleInvest = async (productId, amount) => {
        try {
            const newInvestmentRequest = {
                productId,
                amount
            };
            await apiService.createInvestment(newInvestmentRequest);
            alert(`Successfully invested ${formatCurrency(amount)}!`);
            // Refresh portfolio data after new investment
            const portfolioData = await apiService.getPortfolio(user.id);
            setInvestments(portfolioData || []);
            setCurrentPage('portfolio');
        } catch (err) {
            alert(`Investment failed: ${err.message}`);
        }
    };

    const renderPage = () => {
        if (loading && !user) return <div className="flex justify-center items-center h-screen"><p>Checking session...</p></div>;
        if (loading && user) return <div className="flex justify-center items-center h-full w-full"><p>Loading Data...</p></div>
        if (error) return <div className="flex justify-center items-center h-full w-full"><p className="text-red-500">{error}</p></div>;

        switch (currentPage) {
            case 'dashboard': return <DashboardPage user={user} investments={investments} products={products} />;
            case 'products': return <ProductsPage products={products} onInvest={handleInvest} />;
            case 'portfolio': return <PortfolioPage investments={investments} products={products} />;
            case 'logs': return <TransactionLogsPage logs={logs} />;
            case 'profile': return <ProfilePage user={user} setUser={setUser} />;
            default: return <DashboardPage user={user} investments={investments} products={products} />;
        }
    };

    if (!user) {
        return <AuthPage onLogin={handleLogin} />;
    }

    return (
        <MainLayout user={user} onLogout={handleLogout} currentPage={currentPage} setCurrentPage={setCurrentPage}>
            {renderPage()}
        </MainLayout>
    );
}
