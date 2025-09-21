import { TodoUrl } from "../../constants/API.constants";
import type { Task } from "../../types/Task";
import { axiosInstance } from "../AxiosConfig";

interface DetailError {
  field: string;
  message: string;
}

interface DeleteTodoResponse {
  success: boolean;
  message: string;
  data?: {
    todo: Task;
  };
  error?: string;
  details?: DetailError[];
}

export async function deleteTodoById(id: string, signal: AbortSignal) {
  try {
    const response = await axiosInstance.delete<DeleteTodoResponse>(
      `${TodoUrl}${id}`,
      {
        signal,
      },
    );
    console.log(response);
    alert(response.data.message);
    if (!response.data.data || !response.data.success) {
      throw new Error(response.data.error);
    }
    return response.data.data.todo;
  } catch (error) {
    console.log(error);
    throw new Error("Failed while delete todo");
  }
}
