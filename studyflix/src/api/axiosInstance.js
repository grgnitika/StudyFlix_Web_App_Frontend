// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Your backend server URL
});

// Interceptor to include the access token in the Authorization header if available
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || ""; // Get token from sessionStorage

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Attach token to header
    }

    return config;
  },
  (err) => Promise.reject(err) // Handle error if any occurs in the request
);

// Optionally, you can also add a response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // If response is successful, return it
  (error) => {
    // Handle any response errors (e.g., token expiry or unauthorized access)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login or refresh token)
      console.error("Unauthorized access. Please login again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
