import axios from 'axios'

// http://localhost:5000
//https://danilomarques.pythonanywhere.com

const api = axios.create({
    baseURL: 'https://danilomarques.pythonanywhere.com'
});

export default api;