import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"http://localhost:3011/api",
    withCredentials:true,
    headers:{"Access-Control-Allow-Origin": "*"}
})
