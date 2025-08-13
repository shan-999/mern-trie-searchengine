import axios from "axios";

console.log(import.meta.env.VITE_API_BASE_URL_LOCAL)
const axiosInstence = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type": "application/json",
    }
})


export default axiosInstence