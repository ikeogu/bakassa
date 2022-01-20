import axios from "axios";
import store from "../store";

const api_URL = process.env.VUE_APP_API_BASE_URL;
const token = store.getters.token || localStorage.getItem("access-token");

const http = axios.create({ baseURL: api_URL });

const httpSec = axios.create({ 
    baseURL: api_URL, 
    headers: {
        'x-access-token':`Bearer ${token}`
    } 
});

let net;

export default net = { http, httpSec };