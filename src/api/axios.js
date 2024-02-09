import axios from "axios";

const instance = axios.create({
    baseURL: 'https://tasks-fullstack-ur6w.onrender.com/api',
    withCredentials: true,
    headers: {
        'Authorization': localStorage.getItem('token'),
    }
})

export default instance;