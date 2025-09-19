import {useMemo} from "react";
import {SparklesIcon} from "../shared/Icons.jsx";
import {formatCurrency} from "../../utils/formatters.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const DashboardPage = ({ user, investments, products }) => {
    const portfolioValue = useMemo(() => investments.reduce((sum, inv) => sum + inv.amount, 0), [investments]);
    const investmentsCount = investments.length;

    const chartData = useMemo(() => {
        return investments.map(inv => {
            const product = products.find(p => p.id === inv.productId);
            return {
                name: product?.name || 'Unknown',
                value: inv.amount,
            };
        });
    }, [investments, products]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Portfolio Value</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(portfolioValue)}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Investments</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{investmentsCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm col-span-1 md:col-span-2 flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                        <SparklesIcon className="h-6 w-6 text-emerald-600"/>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-emerald-800">AI Portfolio Insights</h3>
                        <p className="mt-1 text-gray-700">Your portfolio is well-diversified. Consider adding a low-risk bond to improve stability.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Distribution</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(value) => `₹${value/1000}k`}/>
                            <Tooltip formatter={(value) => formatCurrency(value)}/>
                            <Legend />
                            <Bar dataKey="value" fill="#10b981" name="Investment Amount" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};