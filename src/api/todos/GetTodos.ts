import { TodoUrl } from "../../constants/API.constants";
import type { Task } from "../../types/Task";
import { axiosInstance } from "../AxiosConfig";

interface TodoResponse {
  success: boolean;
  message: string;
  data: {
    todos: Task[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export async function getTodos(signal?: AbortSignal) {
  try {
    const response = await axiosInstance.get<TodoResponse>(TodoUrl, {
      signal,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
