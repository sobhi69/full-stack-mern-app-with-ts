import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"https://full-stack-mern-app-with-ts-backend.vercel.app",
    withCredentials:true,
    headers:{"Access-Control-Allow-Origin": "*"}
})
