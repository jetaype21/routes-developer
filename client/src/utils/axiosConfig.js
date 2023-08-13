import axios from "axios";

// base url
const axiosConfig = axios.create({
  baseURL: "https://routdev.onrender.com/api",
});

// default config
axiosConfig.defaults.headers.common[
  "authorization"
] = `Bearer ${localStorage.getItem("token")}`;

export default axiosConfig;
