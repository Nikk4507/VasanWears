import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4500/api",
    withCredentials: true,
});
export const loginUser = async (email, password) => {
    try {
        const res = await API.post("/user/login", { email, password });
        return res.data;
    } catch (err) {
        console.error("Login Error:", err);
        throw err;
    }
};
export const logoutUser = async () => {
    try {
        const res = await API.post("/user/logout");
        return res.data;
    } catch (err) {
        console.error("Login Error:", err);
        throw err;
    }
};
export const googleLoginApi = async (access_token) => {
    try {
        const res = await API.post("/user/google-login", {
            access_token: access_token,
        });

        return res.data;
    } catch (err) {
        console.error("Google Login Error:", err);
        throw err;
    }
};

// Google Login API call
