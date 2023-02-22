import axios from "axios";

const devUrl = "http://localhost:8080/api";
const prodUrl = "https://blogback-production.up.railway.app/api";

const blogApi = axios.create({
    baseURL:prodUrl,
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
})


export default blogApi;