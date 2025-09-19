import React, { useEffect, useState } from "react";
import { getInvestments } from "../api/investmentService";

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

export default function Portfolio() {
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        getInvestments().then(setInvestments).catch(console.error);
    }, []);

    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Your Investments</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Invested On</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {investments.map(inv => (
                            <tr key={inv.id} className="bg-white border-b">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{inv.product}</th>
                                <td className="px-6 py-4">{formatCurrency(inv.amount)}</td>
                                <td className="px-6 py-4">{new Date(inv.maturityDate || inv.invested_at || inv.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded capitalize">{inv.status}</span></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
