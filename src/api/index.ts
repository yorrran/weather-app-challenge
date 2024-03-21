import axios, { AxiosError} from "axios";

const axiosInstance = axios.create({
  baseURL: "http://api.openweathermap.org",
  timeout: 5000
});

export default axiosInstance;
