import axios from "axios";
export const exiosInstance  = axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true,
});