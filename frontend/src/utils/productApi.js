import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials: true,
});

export const createProductApi = async (formData) => {
    try {
        const res = await API.post("/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (err) {
        console.error("Create Product Error:", err);
        throw err;
    }
};