import axios from "axios";
export const axiosInstance = axios.create({
    baseURL:"https://full-stack-mern-app-with-a5bq3j0l7-sobhi69s-projects.vercel.app",
    withCredentials:true,
    headers:{"Access-Control-Allow-Origin": "*"}
})
