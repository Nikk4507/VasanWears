import axios from "axios";
export const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials: true,
});
export const submitContactFormApi = async (contactData) => {
    try {
        const res = await API.post("/contact", contactData);
        return res.data;
    } catch (err) {
        console.error("Submit Contact Form Error:", err);
        throw err;
    }
};