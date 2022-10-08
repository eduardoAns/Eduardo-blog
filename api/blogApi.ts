import axios from "axios";

const blogApi = axios.create({
    baseURL:'https://blogback-production.up.railway.app/api',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
})


export default blogApi;