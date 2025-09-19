import { AxiosError } from "axios";
import { AuthUrl } from "../../constants/API.constants";
import { axiosInstance } from "../AxiosConfig";
import type { User } from "./GetCurrentUserProfile";

export interface UserRegister {
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
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

export async function signup(newUser: UserRegister) {
  try {
    const response = await axiosInstance.post<RegisterResponse>(
      `${AuthUrl}register`,
      newUser,
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
      throw new Error(error.response?.data.error || "Registration failed!");
    }
    console.log(error);
    throw new Error("Unexpected error during registration");
  }
}
