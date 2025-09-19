// import api from "./axios";
//
// const investmentService = {
//     invest: (investmentData) => api.post("/investments", investmentData),
//     getUserPortfolio: () => api.get("/investments/portfolio"),
//     getInvestmentById: (id) => api.get(`/investments/${id}`),
//     cancelInvestment: (id) => api.put(`/investments/${id}/cancel`),
//     getPortfolioInsights: () => api.get("/investments/insights"), // AI-driven
// };
//
// export default investmentService;

import api from "./axios";

export const getInvestments = async (investorId) => {
    const res = await api.get(`/investments/portfolio/${investorId}`); // or /investments?investor=me depending on backend
    return res.data;
};

export const createInvestment = async (payload) => {
    // payload: { productId, amount }
    const res = await api.post(`/investments`, payload);
    return res.data;
};

