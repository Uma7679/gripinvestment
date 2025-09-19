// import React, { useState, useEffect, useMemo } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
//
// // --- MOCK DATA (Simulating Backend API) ---
// const mockProducts = [
//     { id: 'prod1', name: 'SafeGuard Bonds', investment_type: 'bond', tenure_months: 60, annual_yield: 7.5, risk_level: 'low', min_investment: 1000, max_investment: 100000, description: 'Government-backed bonds with guaranteed returns. Ideal for conservative investors seeking stability.' },
//     { id: 'prod2', name: 'Growth Fund', investment_type: 'mf', tenure_months: 36, annual_yield: 12.0, risk_level: 'moderate', min_investment: 5000, description: 'A diversified mutual fund targeting high-growth sectors for balanced risk and return.' },
//     { id: 'prod3', name: 'Tech Innovators ETF', investment_type: 'etf', tenure_months: 120, annual_yield: 18.5, risk_level: 'high', min_investment: 10000, description: 'An Exchange Traded Fund focused on disruptive technology companies with high growth potential.' },
//     { id: 'prod4', name: 'Steady Income FD', investment_type: 'fd', tenure_months: 24, annual_yield: 6.8, risk_level: 'low', min_investment: 25000, description: 'A fixed deposit offering stable and predictable returns over a two-year period.' },
//     { id: 'prod5', name: 'Global Equity Fund', investment_type: 'mf', tenure_months: 84, annual_yield: 15.2, risk_level: 'moderate', min_investment: 7500, description: 'Invest in a diversified portfolio of international stocks to capture global growth.' },
//     { id: 'prod6', name: 'Other Venture Capital', investment_type: 'other', tenure_months: 120, annual_yield: 25.0, risk_level: 'high', min_investment: 50000, description: 'High-risk, high-reward investment in early-stage startups.' },
// ];
//
// const mockInitialInvestments = [
//     { id: 'inv1', userId: 'user123', productId: 'prod1', amount: 20000, invested_at: '2023-01-15T10:00:00Z', status: 'active' },
//     { id: 'inv2', userId: 'user123', productId: 'prod2', amount: 15000, invested_at: '2023-03-20T14:30:00Z', status: 'active' },
//     { id: 'inv3', userId: 'user123', productId: 'prod5', amount: 10000, invested_at: '2023-05-10T09:00:00Z', status: 'active' },
// ];
//
// const mockTransactionLogs = [
//     { id: 1, endpoint: '/api/invest', http_method: 'POST', status_code: 201, created_at: '2023-05-10T09:00:00Z' },
//     { id: 2, endpoint: '/api/portfolio', http_method: 'GET', status_code: 200, created_at: '2023-05-10T08:59:00Z' },
//     { id: 3, endpoint: '/api/products', http_method: 'GET', status_code: 200, created_at: '2023-05-09T11:00:00Z' },
//     { id: 4, endpoint: '/api/login', http_method: 'POST', status_code: 401, error_message: 'Invalid credentials', created_at: '2023-05-09T10:55:00Z' },
// ];
//
//
// // --- SVG ICONS ---
// const EyeIcon = (props) => (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
// );
// const EyeOffIcon = (props) => (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
// );
// const GripIcon = (props) => (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-4Z"/><path d="M8 14a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3H8Z"/><path d="M12 3v2"/><path d="m20 9 1.5 1.5"/><path d="m4 9-1.5 1.5"/><path d="M12 21v-2"/></svg>
// );
// const DashboardIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
// const ProductsIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
// const PortfolioIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 17V7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8 14h8"/></svg>;
// const LogsIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
// const ProfileIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>;
// const MenuIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
// const XIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
// const SparklesIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
//
// // --- HELPER FUNCTIONS ---
// const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
//
// // --- PASSWORD STRENGTH METER ---
// const PasswordStrengthMeter = ({ password }) => {
//     const getStrength = (pass) => {
//         let score = 0;
//         if (!pass) return 0;
//         if (pass.length > 8) score++;
//         if (pass.match(/[a-z]/)) score++;
//         if (pass.match(/[A-Z]/)) score++;
//         if (pass.match(/\d+/)) score++;
//         if (pass.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) score++;
//         return score;
//     };
//
//     const strength = getStrength(password);
//     const strengthLabels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
//     const strengthColors = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
//
//     return (
//         <div className="mt-2">
//             <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div className={`transition-all duration-300 ${strengthColors[strength]}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Strength: {strengthLabels[strength]}</p>
//         </div>
//     );
// };
//
//
// // --- AUTHENTICATION PAGE ---
// const AuthPage = ({ onLogin }) => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [email, setEmail] = useState('intern@gripinvest.in');
//     const [password, setPassword] = useState('Password123!');
//     const [showPassword, setShowPassword] = useState(false);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [error, setError] = useState('');
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError('');
//         if (isLogin) {
//             // Mock login logic
//             if (email && password) {
//                 const mockUser = {
//                     id: 'user123',
//                     firstName: 'Grip',
//                     lastName: 'Intern',
//                     email: email,
//                     risk_appetite: 'moderate',
//                 };
//                 onLogin(mockUser);
//             } else {
//                 setError('Please enter email and password.');
//             }
//         } else {
//             // Mock signup logic
//             if (email && password && firstName) {
//                 const mockUser = {
//                     id: `user${Date.now()}`,
//                     firstName,
//                     lastName,
//                     email,
//                     risk_appetite: 'moderate',
//                 };
//                 onLogin(mockUser);
//             } else {
//                 setError('Please fill all required fields.');
//             }
//         }
//     };
//
//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
//             <div className="max-w-md w-full mx-auto">
//                 <div className="flex justify-center items-center mb-6">
//                     <GripIcon className="h-10 w-10 text-emerald-600"/>
//                     <h1 className="text-3xl font-bold text-gray-800 ml-2">Grip Invest</h1>
//                 </div>
//                 <div className="bg-white p-8 rounded-2xl shadow-lg">
//                     <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         {!isLogin && (
//                             <div className="flex space-x-4">
//                                 <div>
//                                     <label className="text-sm font-medium text-gray-700">First Name</label>
//                                     <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" required />
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium text-gray-700">Last Name</label>
//                                     <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
//                                 </div>
//                             </div>
//                         )}
//                         <div>
//                             <label className="text-sm font-medium text-gray-700">Email</label>
//                             <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" required />
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-gray-700">Password</label>
//                             <div className="relative">
//                                 <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" required />
//                                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
//                                     {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
//                                 </button>
//                             </div>
//                             {!isLogin && <PasswordStrengthMeter password={password} />}
//                         </div>
//                         {error && <p className="text-red-500 text-sm">{error}</p>}
//                         <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105">
//                             {isLogin ? 'Log In' : 'Sign Up'}
//                         </button>
//                     </form>
//                     <p className="mt-4 text-center text-sm text-gray-600">
//                         {isLogin ? "Don't have an account?" : "Already have an account?"}
//                         <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
//                             {isLogin ? 'Sign up' : 'Log in'}
//                         </button>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// // --- MAIN LAYOUT COMPONENT ---
// const MainLayout = ({ user, onLogout, children, currentPage, setCurrentPage }) => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//
//     const navItems = [
//         { name: 'Dashboard', icon: DashboardIcon, page: 'dashboard' },
//         { name: 'Products', icon: ProductsIcon, page: 'products' },
//         { name: 'My Portfolio', icon: PortfolioIcon, page: 'portfolio' },
//         { name: 'Transaction Logs', icon: LogsIcon, page: 'logs' },
//         { name: 'Profile', icon: ProfileIcon, page: 'profile' },
//     ];
//
//     const NavLink = ({ item }) => (
//         <button
//             onClick={() => { setCurrentPage(item.page); setSidebarOpen(false); }}
//             className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                 currentPage === item.page
//                     ? 'bg-emerald-600 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
//             }`}
//         >
//             <item.icon className="h-5 w-5 mr-3" />
//             {item.name}
//         </button>
//     );
//
//     const SidebarContent = () => (
//         <div className="flex flex-col h-full">
//             <div className="flex items-center justify-center h-20 border-b">
//                 <GripIcon className="h-8 w-8 text-emerald-600"/>
//                 <span className="text-2xl font-bold ml-2 text-gray-800">Grip</span>
//             </div>
//             <nav className="flex-1 px-4 py-6 space-y-2">
//                 {navItems.map(item => <NavLink key={item.page} item={item} />)}
//             </nav>
//             <div className="px-4 py-6 border-t">
//                 <button onClick={onLogout} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none">
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
//
//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Mobile sidebar */}
//             <div className={`fixed inset-0 flex z-40 lg:hidden transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//                 <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)}></div>
//                 <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                     <SidebarContent />
//                 </div>
//             </div>
//             {/* Desktop sidebar */}
//             <div className="hidden lg:flex lg:flex-shrink-0">
//                 <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
//                     <SidebarContent />
//                 </div>
//             </div>
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 <header className="flex-shrink-0 bg-white border-b lg:border-none">
//                     <div className="flex items-center justify-between p-4">
//                         <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
//                             <MenuIcon className="h-6 w-6 text-gray-500" />
//                         </button>
//                         <h1 className="text-xl font-semibold text-gray-800 capitalize">{currentPage}</h1>
//                         <div className="flex items-center">
//                             <span className="text-sm font-medium hidden sm:block">Welcome, {user.firstName}</span>
//                             <ProfileIcon className="h-8 w-8 ml-3 text-gray-600 bg-gray-200 rounded-full p-1"/>
//                         </div>
//                     </div>
//                 </header>
//                 <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// // --- PAGES ---
//
// // Dashboard Page
// const DashboardPage = ({ user, investments, products }) => {
//     const portfolioValue = useMemo(() => investments.reduce((sum, inv) => sum + inv.amount, 0), [investments]);
//     const investmentsCount = investments.length;
//
//     const chartData = useMemo(() => {
//         return investments.map(inv => {
//             const product = products.find(p => p.id === inv.productId);
//             return {
//                 name: product.name,
//                 value: inv.amount,
//                 yield: product.annual_yield
//             };
//         });
//     }, [investments, products]);
//
//     return (
//         <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="bg-white p-6 rounded-xl shadow-sm">
//                     <h3 className="text-sm font-medium text-gray-500">Portfolio Value</h3>
//                     <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(portfolioValue)}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm">
//                     <h3 className="text-sm font-medium text-gray-500">Total Investments</h3>
//                     <p className="mt-2 text-3xl font-bold text-gray-900">{investmentsCount}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm col-span-1 md:col-span-2 flex items-center">
//                     <div className="bg-emerald-100 p-3 rounded-full mr-4">
//                         <SparklesIcon className="h-6 w-6 text-emerald-600"/>
//                     </div>
//                     <div>
//                         <h3 className="text-sm font-medium text-emerald-800">AI Portfolio Insights</h3>
//                         <p className="mt-1 text-gray-700">Your portfolio is well-diversified but slightly leans towards 'moderate' risk. Consider adding a 'low' risk bond to improve stability.</p>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Distribution</h3>
//                 <div style={{ width: '100%', height: 300 }}>
//                     <ResponsiveContainer>
//                         <BarChart data={chartData}>
//                             <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//                             <YAxis tickFormatter={(value) => `₹${value/1000}k`}/>
//                             <Tooltip formatter={(value) => formatCurrency(value)}/>
//                             <Legend />
//                             <Bar dataKey="value" fill="#10b981" name="Investment Amount" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// // Products Page
// const ProductsPage = ({ products, onInvest }) => {
//     const [filters, setFilters] = useState({ type: 'all', risk: 'all' });
//     const [searchTerm, setSearchTerm] = useState('');
//
//     const filteredProducts = useMemo(() => {
//         return products.filter(p => {
//             const typeMatch = filters.type === 'all' || p.investment_type === filters.type;
//             const riskMatch = filters.risk === 'all' || p.risk_level === filters.risk;
//             const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
//             return typeMatch && riskMatch && searchMatch;
//         });
//     }, [products, filters, searchTerm]);
//
//     return (
//         <div className="space-y-6">
//             <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4">
//                 <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md"
//                 />
//                 <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})} className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md">
//                     <option value="all">All Types</option>
//                     <option value="bond">Bond</option>
//                     <option value="mf">Mutual Fund</option>
//                     <option value="etf">ETF</option>
//                     <option value="fd">Fixed Deposit</option>
//                     <option value="other">Other</option>
//                 </select>
//                 <select value={filters.risk} onChange={e => setFilters({...filters, risk: e.target.value})} className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md">
//                     <option value="all">All Risks</option>
//                     <option value="low">Low</option>
//                     <option value="moderate">Moderate</option>
//                     <option value="high">High</option>
//                 </select>
//                 <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-md font-semibold">
//                     <SparklesIcon className="h-5 w-5 mr-2" />
//                     AI Recommendation
//                 </button>
//             </div>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map(p => <ProductCard key={p.id} product={p} onInvest={onInvest}/>)}
//             </div>
//         </div>
//     );
// };
//
// const ProductCard = ({ product, onInvest }) => {
//     const [investAmount, setInvestAmount] = useState(product.min_investment);
//     const riskColors = {
//         low: 'bg-green-100 text-green-800',
//         moderate: 'bg-yellow-100 text-yellow-800',
//         high: 'bg-red-100 text-red-800'
//     };
//     return (
//         <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
//             <div>
//                 <div className="flex justify-between items-start">
//                     <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${riskColors[product.risk_level]}`}>{product.risk_level}</span>
//                 </div>
//                 <p className="text-sm text-gray-500 capitalize">{product.investment_type}</p>
//                 <p className="mt-2 text-sm text-gray-600">{product.description}</p>
//
//                 <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
//                     <div><span className="font-semibold">Yield:</span> {product.annual_yield}% p.a.</div>
//                     <div><span className="font-semibold">Tenure:</span> {product.tenure_months} months</div>
//                     <div><span className="font-semibold">Min Inv:</span> {formatCurrency(product.min_investment)}</div>
//                 </div>
//             </div>
//             <div className="mt-4">
//                 <input
//                     type="number"
//                     value={investAmount}
//                     onChange={(e) => setInvestAmount(Number(e.target.value))}
//                     min={product.min_investment}
//                     max={product.max_investment}
//                     step="1000"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
//                 />
//                 <button onClick={() => onInvest(product.id, investAmount)} className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition">
//                     Invest Now
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// // My Portfolio Page
// const PortfolioPage = ({ investments, products }) => {
//     const portfolioData = useMemo(() => {
//         return investments.map(inv => {
//             const product = products.find(p => p.id === inv.productId);
//             return { ...inv, product };
//         });
//     }, [investments, products]);
//
//     const pieChartData = useMemo(() => {
//         const dataMap = investments.reduce((acc, inv) => {
//             const productType = products.find(p => p.id === inv.productId)?.investment_type || 'other';
//             acc[productType] = (acc[productType] || 0) + inv.amount;
//             return acc;
//         }, {});
//         return Object.entries(dataMap).map(([name, value]) => ({ name: name.toUpperCase(), value }));
//     }, [investments, products]);
//
//     const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
//
//     return (
//         <div className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Investments</h3>
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-sm text-left text-gray-500">
//                             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3">Product</th>
//                                 <th scope="col" className="px-6 py-3">Amount</th>
//                                 <th scope="col" className="px-6 py-3">Invested On</th>
//                                 <th scope="col" className="px-6 py-3">Status</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {portfolioData.map(inv => (
//                                 <tr key={inv.id} className="bg-white border-b">
//                                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{inv.product?.name}</th>
//                                     <td className="px-6 py-4">{formatCurrency(inv.amount)}</td>
//                                     <td className="px-6 py-4">{new Date(inv.invested_at).toLocaleDateString()}</td>
//                                     <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded capitalize">{inv.status}</span></td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation</h3>
//                     <div style={{ width: '100%', height: 250 }}>
//                         <ResponsiveContainer>
//                             <PieChart>
//                                 <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}>
//                                     {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
//                                 </Pie>
//                                 <Tooltip formatter={(value) => formatCurrency(value)}/>
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                     <div className="mt-4 bg-emerald-50 p-4 rounded-lg">
//                         <h4 className="text-sm font-semibold text-emerald-800 flex items-center"><SparklesIcon className="h-4 w-4 mr-2"/>AI Summary</h4>
//                         <p className="text-sm text-gray-700 mt-1">Your assets are primarily allocated in Mutual Funds and Bonds, reflecting a balanced risk profile. This aligns well with your long-term growth objectives.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// // Transaction Logs Page
// const TransactionLogsPage = ({ logs }) => {
//     return (
//         <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Logs</h3>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left text-gray-500">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                     <tr>
//                         <th scope="col" className="px-6 py-3">Endpoint</th>
//                         <th scope="col" className="px-6 py-3">Method</th>
//                         <th scope="col" className="px-6 py-3">Status</th>
//                         <th scope="col" className="px-6 py-3">Timestamp</th>
//                         <th scope="col" className="px-6 py-3">Error</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {logs.map(log => (
//                         <tr key={log.id} className="bg-white border-b">
//                             <td className="px-6 py-4 font-mono">{log.endpoint}</td>
//                             <td className="px-6 py-4">{log.http_method}</td>
//                             <td className={`px-6 py-4 font-semibold ${log.status_code >= 400 ? 'text-red-500' : 'text-green-500'}`}>{log.status_code}</td>
//                             <td className="px-6 py-4">{new Date(log.created_at).toLocaleString()}</td>
//                             <td className="px-6 py-4 text-red-600">{log.error_message || 'None'}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="mt-6 bg-red-50 p-4 rounded-lg">
//                 <h4 className="text-sm font-semibold text-red-800 flex items-center"><SparklesIcon className="h-4 w-4 mr-2"/>AI Error Summary</h4>
//                 <p className="text-sm text-gray-700 mt-1">We noticed 1 failed login attempt. If this was not you, please consider securing your account.</p>
//             </div>
//         </div>
//     );
// };
//
// // Profile Page
// const ProfilePage = ({ user, setUser }) => {
//     const [riskAppetite, setRiskAppetite] = useState(user.risk_appetite);
//     const [saved, setSaved] = useState(false);
//
//     const handleSave = () => {
//         setUser({ ...user, risk_appetite: riskAppetite });
//         setSaved(true);
//         setTimeout(() => setSaved(false), 2000);
//     };
//
//     const aiRecommendations = {
//         low: "Based on your 'low' risk appetite, we recommend focusing on 'SafeGuard Bonds' and 'Steady Income FD' for stable, predictable returns.",
//         moderate: "With a 'moderate' risk appetite, a balanced approach is best. Consider a mix of 'Growth Fund' and 'Global Equity Fund' to capture market growth while managing risk.",
//         high: "Your 'high' risk appetite suggests you're comfortable with volatility for potentially higher rewards. 'Tech Innovators ETF' and 'Other Venture Capital' could be suitable options."
//     };
//
//     return (
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm">
//                 <h3 className="text-lg font-semibold text-gray-800">Your Profile</h3>
//                 <div className="mt-4 space-y-2">
//                     <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
//                     <p><span className="font-semibold">Email:</span> {user.email}</p>
//                 </div>
//             </div>
//             <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm space-y-6">
//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-800">Update Risk Appetite</h3>
//                     <p className="text-sm text-gray-500 mt-1">This helps us tailor recommendations for you.</p>
//                     <div className="mt-4 space-y-2">
//                         {['low', 'moderate', 'high'].map(level => (
//                             <label key={level} className="flex items-center">
//                                 <input type="radio" name="risk" value={level} checked={riskAppetite === level} onChange={() => setRiskAppetite(level)} className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
//                                 <span className="ml-3 block text-sm font-medium text-gray-700 capitalize">{level}</span>
//                             </label>
//                         ))}
//                     </div>
//                     <button onClick={handleSave} className={`mt-4 px-4 py-2 rounded-md font-semibold text-white ${saved ? 'bg-green-500' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
//                         {saved ? 'Saved!' : 'Save Changes'}
//                     </button>
//                 </div>
//                 <div className="bg-emerald-50 p-4 rounded-lg">
//                     <h4 className="text-sm font-semibold text-emerald-800 flex items-center"><SparklesIcon className="h-4 w-4 mr-2"/>AI Recommendations</h4>
//                     <p className="text-sm text-gray-700 mt-1">{aiRecommendations[riskAppetite]}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
//
// // --- MAIN APP COMPONENT ---
// export default function App() {
//     const [user, setUser] = useState(null);
//     const [currentPage, setCurrentPage] = useState('dashboard');
//     const [investments, setInvestments] = useState(mockInitialInvestments);
//
//     // Effect to check for logged-in user on mount
//     useEffect(() => {
//         const storedUser = localStorage.getItem('gripUser');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);
//
//     const handleLogin = (loggedInUser) => {
//         localStorage.setItem('gripUser', JSON.stringify(loggedInUser));
//         setUser(loggedInUser);
//         setCurrentPage('dashboard');
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem('gripUser');
//         setUser(null);
//     };
//
//     const handleInvest = (productId, amount) => {
//         const newInvestment = {
//             id: `inv${Date.now()}`,
//             userId: user.id,
//             productId,
//             amount,
//             invested_at: new Date().toISOString(),
//             status: 'active'
//         };
//         setInvestments([...investments, newInvestment]);
//         alert(`Successfully invested ${formatCurrency(amount)}!`);
//         setCurrentPage('portfolio');
//     };
//
//     const renderPage = () => {
//         switch (currentPage) {
//             case 'dashboard': return <DashboardPage user={user} investments={investments} products={mockProducts} />;
//             case 'products': return <ProductsPage products={mockProducts} onInvest={handleInvest} />;
//             case 'portfolio': return <PortfolioPage investments={investments} products={mockProducts} />;
//             case 'logs': return <TransactionLogsPage logs={mockTransactionLogs} />;
//             case 'profile': return <ProfilePage user={user} setUser={setUser} />;
//             default: return <DashboardPage user={user} investments={investments} products={mockProducts}/>;
//         }
//     };
//
//     if (!user) {
//         return <AuthPage onLogin={handleLogin} />;
//     }
//
//     return (
//         <MainLayout user={user} onLogout={handleLogout} currentPage={currentPage} setCurrentPage={setCurrentPage}>
//             {renderPage()}
//         </MainLayout>
//     );
// }
