import axios from "axios";
import { getEnvVariables } from "../../utils/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();
const iupiApi = axios.create({
  baseURL: VITE_API_URL,
});

iupiApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  config.headers = {
    ...config.headers,
    AUTHORIZATION: token ? `Bearer ${token}` : "",
  };
  return config;
});

export default iupiApi;
