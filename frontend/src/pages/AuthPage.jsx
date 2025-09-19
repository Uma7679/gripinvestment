import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup as signupApi, login as loginApi } from "../api/authService";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import {EyeIcon} from "../components/icons/EyeIcon";
import {EyeOffIcon} from "../components/icons/EyeOffIcon";
import {GripIcon} from "../components/icons/GripIcon";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("gulshan@gmail.com");
    const [password, setPassword] = useState("Umakant@7679");
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [riskAppetite, setRiskAppetite] = useState("MODERATE");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                const res = await loginApi({ email, password });
                if (res?.token) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("email", res.email);
                    localStorage.setItem("role", res.role);
                    navigate("/dashboard");
                } else {
                    setError("Login failed");
                }
            } else {
                const res = await signupApi({
                    firstName, lastName, email, password, riskAppetite, role: "USER"
                });
                if (res?.token) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("email", res.email);
                    localStorage.setItem("role", res.role);
                    navigate("/dashboard");
                } else {
                    setError("Signup failed");
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Auth failed");
            console.error(err);
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
                                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md" />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md" required />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                    {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                                </button>
                            </div>
                            {!isLogin && <PasswordStrengthMeter password={password} />}
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                            {isLogin ? 'Log In' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-emerald-600 hover:text-emerald-500 ml-1">
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
