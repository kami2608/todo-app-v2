import axios, { AxiosError } from "axios";
import { getAccessToken } from "./auth/GetAccessToken";

export const axiosInstance = axios.create({
  baseURL: "",
  allowAbsoluteUrls: false,
});

// axios instance to get new access token
export const axiosInstance2 = axios.create({
  baseURL: "",
  allowAbsoluteUrls: false,
});

axiosInstance2.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    console.log("Error: ", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] =
      `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  },
  (error) => {
    console.log("Error: ", error);
    return Promise.reject(error);
  },
);

axiosInstance2.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userProfile");
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Error: ", error);
    if (error instanceof AxiosError) {
      const config: any = error.config;
      if (error.response?.status === 401 && !config._retry) {
        config._retry = true;
        console.log(1);
        try {
          const res = await getAccessToken();
          console.log(2);
          config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return axiosInstance(config);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);
