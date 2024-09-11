// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api/auth',  // Base URL points to backend API
// });

// export default axiosInstance;

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/auth', // Replace with your backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
