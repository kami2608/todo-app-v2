import { AuthUrl } from "../../constants/API.constants";
import { axiosInstance } from "../AxiosConfig";

export async function logout() {
  try {
    const response = await axiosInstance.post(`${AuthUrl}logout`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log(response);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfile");
    return true;
  } catch (error) {
    console.log(error);
  }
}
