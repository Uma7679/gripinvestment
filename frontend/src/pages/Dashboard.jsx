import React, { useEffect, useState, useMemo } from "react";
import { getAllProducts } from "../api/productService";
import { getInvestments } from "../api/investmentService";
import {SparklesIcon} from "../components/icons/SparklesIcon";

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        getAllProducts().then(setProducts).catch(console.error);
        getInvestments().then(setInvestments).catch(console.error);
    }, []);

    const portfolioValue = useMemo(() => investments.reduce((s, i) => s + (i.amount || 0), 0), [investments]);
    const investmentsCount = investments.length;

    return (
        <div className="space-y-6 p-6">
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
                        <p className="mt-1 text-gray-700">Your portfolio leans towards 'moderate' risk. Consider adding low-risk bonds to increase stability.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Distribution</h3>
                {/* You can plug in charts (recharts) here if desired */}
                <p className="text-sm text-gray-600">Visualization can be added — keep as-is for now.</p>
            </div>
        </div>
    );
}
