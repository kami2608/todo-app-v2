import { TodoUrl } from "../../constants/API.constants";
import type { Task } from "../../types/Task";
import { axiosInstance } from "../AxiosConfig";

interface DetailError {
  field: string;
  message: string;
}

interface GetTodoByIdResponse {
  success: boolean;
  message: string;
  data?: {
    todo: Task;
  };
  error?: string;
  details?: DetailError[];
}

export async function getTodoById(signal: AbortSignal, id: string) {
  try {
    const response = await axiosInstance.get<GetTodoByIdResponse>(
      `${TodoUrl}${id}`,
      {
        signal,
      },
    );
    if (response.data.data) return response.data.data.todo;
  } catch (error) {
    console.log(error);
  }
}
