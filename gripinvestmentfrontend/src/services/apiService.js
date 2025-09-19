const API_BASE_URL = 'http://localhost:8080/api';

const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('gripToken');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || 'An error occurred');
        }
        if (response.status === 204) {
            return null;
        }
        return response.json();
    } catch (error) {
        console.error(`API Error on ${endpoint}:`, error);
        throw error;
    }
};

export const apiService = {
    login: (loginRequest) => request('/auth/login', { method: 'POST', body: JSON.stringify(loginRequest) }),
    signup: (signupRequest) => {
        const payload = {
            ...signupRequest,
            riskAppetite: 'MODERATE',
            role: 'USER'
        };
        return request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
    },
    getProducts: () => request('/products'),
    getAllInvestors: () => request('/investors'),
    getInvestorById: (investorId) => request(`/investors/${investorId}`),
    createInvestment: (newInvestment) => request('/investments', { method: 'POST', body: JSON.stringify(newInvestment) }),
    getPortfolio: (investorId) => request(`/investments/portfolio/${investorId}`),
    getLogsByInvestor: (investorId) => request(`/logs/investor/${investorId}`),
};