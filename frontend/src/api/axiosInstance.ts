import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE == 'production' ? "https://backend-easy-production.up.railway.app/api" : 
    "http://localhost:3011/api"
})
