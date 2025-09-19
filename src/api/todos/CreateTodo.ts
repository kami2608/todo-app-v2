import { TodoUrl } from "../../constants/API.constants";
import type { Task } from "../../types/Task";
import { axiosInstance } from "../AxiosConfig";

interface DetailError {
  field: string;
  message: string;
}

interface CreateTodoResponse {
  success: boolean;
  message: string;
  data?: {
    todo: Task;
  };
  error?: string;
  details?: DetailError[];
}

export async function createTodo(signal: AbortSignal, newTodo: Partial<Task>) {
  try {
    const response = await axiosInstance.post<CreateTodoResponse>(
      TodoUrl,
      newTodo,
      {
        signal,
      },
    );
    alert(response.data.message);
    if (response.data.data) return response.data.data.todo;
  } catch (error) {
    console.log(error);
  }
}
