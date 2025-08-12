import axios from "axios";


const axiosInstence = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL_LOCAL,
    headers:{
        "Content-Type": "application/json",
    }
})


export default axiosInstence