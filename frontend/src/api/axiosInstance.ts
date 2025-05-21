import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"https://backend-easy-production.up.railway.app/api",
    withCredentials:true,
    headers:{"Access-Control-Allow-Origin": "*"}
})
