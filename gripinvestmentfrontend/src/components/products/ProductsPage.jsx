import {useMemo, useState} from "react";
import {ProductCard} from "./ProductCard.jsx";
import {SparklesIcon} from "../shared/Icons.jsx";

export const ProductsPage = ({ products, onInvest }) => {
    const [filters, setFilters] = useState({ type: 'all', risk: 'all' });
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const typeMatch = filters.type === 'all' || p.investmentType === filters.type;
            const riskMatch = filters.risk === 'all' || p.riskLevel === filters.risk;
            const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            return typeMatch && riskMatch && searchMatch;
        });
    }, [products, filters, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md"
                />
                <select value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})} className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md">
                    <option value="all">All Types</option>
                    <option value="bond">Bond</option>
                    <option value="mf">Mutual Fund</option>
                    <option value="etf">ETF</option>
                    <option value="fd">Fixed Deposit</option>
                    <option value="other">Other</option>
                </select>
                <select value={filters.risk} onChange={e => setFilters({...filters, risk: e.target.value})} className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md">
                    <option value="all">All Risks</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                </select>
                <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-md font-semibold">
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    AI Recommendation
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p => <ProductCard key={p.id} product={p} onInvest={onInvest}/>)}
            </div>
        </div>
    );
};