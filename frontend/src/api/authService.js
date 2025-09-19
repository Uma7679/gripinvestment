// import api from "./axios";
//
// const authService = {
//     signup: (userData) => api.post("/auth/signup", userData),
//     login: (credentials) => api.post("/auth/login", credentials),
//     resetPassword: (email) => api.post("/auth/reset-password", { email }),
//     verifyOtp: (otpData) => api.post("/auth/verify-otp", otpData),
// };
//
// export default authService;

import api from "./axios";

export const signup = async (data) => {
    const res = await api.post("/auth/signup", data);
    // backend returns { token, email, role } - return that object
    return res.data;
};

export const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data;
};

const logout = () => {
    localStorage.clear();
};

export default { signup, login, logout };
