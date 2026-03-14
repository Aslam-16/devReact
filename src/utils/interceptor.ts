import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1616/",
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized. Redirecting to login.");
        window.location.href = "/login";
    }
    else {
        console.error("API error:", error);
    }

    return Promise.reject(error);
  }
);

export default api;