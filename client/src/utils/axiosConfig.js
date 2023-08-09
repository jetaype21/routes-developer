import axios from "axios";

// base url
const axiosConfig = axios.create({
  baseURL: "http://localhost:8000/api",
});

// default config
axiosConfig.defaults.headers.common[
  "authorization"
] = `Bearer ${localStorage.getItem("token")}`;

export default axiosConfig;
