// import { Link } from "react-router-dom";
//
// export default function ProductCard({ product }) {
//     return (
//         <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
//             <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
//             <p className="text-gray-600 mb-2">Type: {product.investmentType}</p>
//             <p className="text-gray-600 mb-2">Risk: <span className="font-medium">{product.riskLevel}</span></p>
//             <p className="text-gray-800 font-semibold mb-2">Yield: {product.annualYield}%</p>
//             <p className="text-sm text-gray-500 mb-4">Tenure: {product.tenureMonths} months</p>
//             <Link
//                 to={`/products/${product.id}`}
//                 className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//                 View Details
//             </Link>
//         </div>
//     );
// }

import React, { useState } from "react";

export default function ProductCard({ product, onInvest }) {
    const [investAmount, setInvestAmount] = useState(product.minInvestment || product.min_investment || 0);
    const riskColors = { low: 'bg-green-100 text-green-800', moderate: 'bg-yellow-100 text-yellow-800', high: 'bg-red-100 text-red-800' };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${riskColors[product.risk_level || product.riskLevel || 'moderate']}`}>{product.risk_level || product.riskLevel}</span>
                </div>
                <p className="text-sm text-gray-500 capitalize">{product.investment_type || product.investmentType}</p>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div><span className="font-semibold">Yield:</span> {product.annual_yield || product.annualYield}% p.a.</div>
                    <div><span className="font-semibold">Tenure:</span> {product.tenure_months || product.tenureMonths} months</div>
                    <div><span className="font-semibold">Min Inv:</span> ₹{product.min_investment || product.minInvestment}</div>
                </div>
            </div>

            <div className="mt-4">
                <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(Number(e.target.value))}
                    min={product.min_investment || product.minInvestment || 0}
                    max={product.max_investment || product.maxInvestment || undefined}
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                <button onClick={() => onInvest(product.id || product.id, investAmount)} className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition">
                    Invest Now
                </button>
            </div>
        </div>
    );
}

