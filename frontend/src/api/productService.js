// import api from "./axios";
//
// const productService = {
//     getProducts: () => api.get("/products"),
//     getProductById: (id) => api.get(`/products/${id}`),
//     createProduct: (product) => api.post("/products", product),
//     updateProduct: (id, product) => api.put(`/products/${id}`, product),
//     deleteProduct: (id) => api.delete(`/products/${id}`),
//     getRecommendations: (riskAppetite) => api.get(`/products/recommendations`, {
//         params: { risk: riskAppetite }
//     }),
// };
//
// export default productService;

import api from "./axios";

export const getAllProducts = async () => {
    const res = await api.get("/products");
    return res.data;
};

export const getProductById = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
};

