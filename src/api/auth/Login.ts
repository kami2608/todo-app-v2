import { AxiosError } from "axios";
import { AuthUrl } from "../../constants/API.constants";
import { axiosInstance } from "../AxiosConfig";
import type { User } from "./GetCurrentUserProfile";

export interface UserLogin {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      username: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export async function login(user: UserLogin) {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      `${AuthUrl}login`,
      user,
    );
    if (response) {
      const data = response.data.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      const user: User = { id: data.user.id, username: data.user.username };
      localStorage.setItem("userProfile", JSON.stringify(user));
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.error);
      throw new Error(error.response?.data.error || "Login failed!");
    }
    console.log(error);
    throw new Error("Unexpected error during login");
  }
}
