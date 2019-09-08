import axios from 'axios'

// http://localhost:5000
//https://danilomarques.pythonanywhere.com

const api = axios.create({
    baseURL: ' http://localhost:5000'
});

export default api;