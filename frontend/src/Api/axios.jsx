import axios from "axios"

const API = axios.create({

    baseURL: "https://personal-finance-intelligence-backend.onrender.com"

})

export default API