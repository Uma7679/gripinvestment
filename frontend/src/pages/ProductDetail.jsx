import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productService";
import { createInvestment } from "../api/investmentService";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        getProductById(id).then(setProduct).catch(console.error);
    }, [id]);

    const handleInvest = async () => {
        try {
            await createInvestment({ productId: id, amount });
            alert("Investment successful");
        } catch (err) {
            console.error(err);
            alert("Investment failed");
        }
    };

    if (!product) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Yield:</strong> {product.annual_yield}%</div>
                <div><strong>Tenure:</strong> {product.tenure_months} months</div>
                <div><strong>Min Investment:</strong> ₹{product.min_investment}</div>
                <div><strong>Risk:</strong> {product.risk_level}</div>
            </div>

            <div className="mt-4 flex gap-2">
                <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="px-3 py-2 border rounded" />
                <button onClick={handleInvest} className="px-4 py-2 bg-emerald-600 text-white rounded">Invest</button>
            </div>
        </div>
    );
}
