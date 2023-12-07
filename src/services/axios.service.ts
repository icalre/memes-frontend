import axios from 'axios'

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
});

instance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.token) {
        config.headers['x-access-token'] = user.token;
    }

    return config;
});

// Add a response interceptor
instance.interceptors.response.use(
    response => {

        return response;
    },
    error => {

        if (error.response.status === 401) {
            localStorage.removeItem("user");
            window.location.replace("/login");
        } else {
            console.error(error)
        }

        return Promise.reject(error);
    });

export default instance;