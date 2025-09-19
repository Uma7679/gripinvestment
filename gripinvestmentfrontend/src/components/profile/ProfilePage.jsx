import {useState} from "react";
import {SparklesIcon} from "../shared/Icons.jsx";

export const ProfilePage = ({ user, setUser }) => {
    const [riskAppetite, setRiskAppetite] = useState(user.risk_appetite);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // Here you would typically make an API call to update the user's risk appetite
        // e.g., apiService.updateInvestor(user.id, { riskAppetite });
        setUser({ ...user, risk_appetite: riskAppetite });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const aiRecommendations = {
        low: "Based on your 'low' risk appetite, we recommend focusing on 'SafeGuard Bonds' and 'Steady Income FD'.",
        moderate: "With a 'moderate' risk appetite, a balanced approach is best. Consider 'Growth Fund' and 'Global Equity Fund'.",
        high: "Your 'high' risk appetite suggests you're comfortable with volatility. 'Tech Innovators ETF' could be a suitable option."
    };

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">Your Profile</h3>
                <div className="mt-4 space-y-2">
                    <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                </div>
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Update Risk Appetite</h3>
                    <p className="text-sm text-gray-500 mt-1">This helps us tailor recommendations for you.</p>
                    <div className="mt-4 space-y-2">
                        {['low', 'moderate', 'high'].map(level => (
                            <label key={level} className="flex items-center">
                                <input type="radio" name="risk" value={level} checked={riskAppetite === level} onChange={() => setRiskAppetite(level)} className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500" />
                                <span className="ml-3 block text-sm font-medium text-gray-700 capitalize">{level}</span>
                            </label>
                        ))}
                    </div>
                    <button onClick={handleSave} className={`mt-4 px-4 py-2 rounded-md font-semibold text-white ${saved ? 'bg-green-500' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                        {saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-emerald-800 flex items-center"><SparklesIcon className="h-4 w-4 mr-2"/>AI Recommendations</h4>
                    <p className="text-sm text-gray-700 mt-1">{aiRecommendations[riskAppetite]}</p>
                </div>
            </div>
        </div>
    );
};