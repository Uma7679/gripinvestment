import {useState} from "react";

export const ProductCard = ({ product, onInvest }) => {
    const [investAmount, setInvestAmount] = useState(product.minInvestment || 1000);
    const riskColors = {
        low: 'bg-green-100 text-green-800',
        moderate: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${riskColors[product.riskLevel]}`}>{product.riskLevel}</span>
                </div>
                <p className="text-sm text-gray-500 capitalize">{product.investmentType}</p>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div><span className="font-semibold">Yield:</span> {product.annualYield}% p.a.</div>
                    <div><span className="font-semibold">Tenure:</span> {product.tenureMonths} months</div>
                    <div><span className="font-semibold">Min Inv:</span> {formatCurrency(product.minInvestment)}</div>
                </div>
            </div>
            <div className="mt-4">
                <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(Number(e.target.value))}
                    min={product.minInvestment}
                    max={product.maxInvestment}
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                <button onClick={() => onInvest(product.id, investAmount)} className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition">
                    Invest Now
                </button>
            </div>
        </div>
    );
};