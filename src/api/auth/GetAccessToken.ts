import { AuthUrl } from "../../constants/API.constants";
import { axiosInstance2 } from "../AxiosConfig";

export interface AccessTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export async function getAccessToken() {
  console.log("get new access token");
  try {
    const response = await axiosInstance2.post<AccessTokenResponse>(
      `${AuthUrl}refresh-token`,
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    );
    console.log(response);
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
