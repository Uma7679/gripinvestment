import {useMemo} from "react";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {formatCurrency} from "../../utils/formatters.js";
import {SparklesIcon} from "../shared/Icons.jsx";

export const PortfolioPage = ({ investments, products }) => {
    const portfolioData = useMemo(() => {
        return investments.map(inv => {
            const product = products.find(p => p.id === inv.productId);
            return { ...inv, product };
        });
    }, [investments, products]);

    const pieChartData = useMemo(() => {
        const dataMap = investments.reduce((acc, inv) => {
            const productType = products.find(p => p.id === inv.productId)?.investmentType || 'other';
            acc[productType] = (acc[productType] || 0) + inv.amount;
            return acc;
        }, {});
        return Object.entries(dataMap).map(([name, value]) => ({ name: name.toUpperCase(), value }));
    }, [investments, products]);

    const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Investments</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Maturity Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {portfolioData.map(inv => (
                                <tr key={inv.id} className="bg-white border-b">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{inv.product?.name || inv.productName}</th>
                                    <td className="px-6 py-4">{formatCurrency(inv.amount)}</td>
                                    {/*<td className="px-6 py-4">{new Date(inv.maturityDate).toLocaleDateString()}</td>*/}
                                    <td className="px-6 py-4">
                                        {inv.maturityDate ? new Date(inv.maturityDate).toLocaleDateString() : '—'}
                                    </td>
                                    <td className="px-6 py-4"><span
                                        className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded capitalize">{inv.status}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation</h3>
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}>
                                    {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(value) => formatCurrency(value)}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 bg-emerald-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-emerald-800 flex items-center"><SparklesIcon className="h-4 w-4 mr-2"/>AI Summary</h4>
                        <p className="text-sm text-gray-700 mt-1">Your assets are primarily in Mutual Funds and Bonds, reflecting a balanced profile.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
