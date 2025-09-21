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
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message);
    }
    return response.data.data.todo;
  } catch (error) {
    console.log(error);
    throw new Error("Failed while create todo");
  }
}
