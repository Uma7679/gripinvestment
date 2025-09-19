import {useState} from "react";
import {apiService} from "../../services/apiService.js";
import {EyeIcon, EyeOffIcon, GripIcon} from "../shared/Icons.jsx";
import {PasswordStrengthMeter} from "../shared/PasswordStrengthMeter.jsx";

export const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const response = await apiService.login({ email, password });
                onLogin(response.token);
            } else {
                const response = await apiService.signup({ firstName, lastName, email, password });
                onLogin(response.token);
            }
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full mx-auto">
                <div className="flex justify-center items-center mb-6">
                    <GripIcon className="h-10 w-10 text-emerald-600"/>
                    <h1 className="text-3xl font-bold text-gray-800 ml-2">Grip Invest</h1>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="flex space-x-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                    {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                                </button>
                            </div>
                            {!isLogin && <PasswordStrengthMeter password={password} />}
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105 disabled:opacity-50">
                            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => { setIsLogin(!isLogin); setError('') }} className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
