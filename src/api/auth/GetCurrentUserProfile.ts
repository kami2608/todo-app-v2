import { AuthUrl } from "../../constants/API.constants";
import { axiosInstance } from "../AxiosConfig";

export interface User {
  id: string;
  username: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
  error?: string;
}

export async function getCurrentUserProfile() {
  try {
    const response = await axiosInstance.get<ProfileResponse>(
      `${AuthUrl}profile`,
    );
    console.log(response);
    return response.data.data.user;
  } catch (error) {
    console.log(error);
  }
}
