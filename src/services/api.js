import axios from 'axios'

// http://localhost:5000

const api = axios.create({
    baseURL: 'http://danilomarques.pythonanywhere.com'
});

export default api;