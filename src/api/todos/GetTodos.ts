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

export async function getTodos(
  signal?: AbortSignal,
  status?: string | null,
  priority?: string | null,
  assignee?: string | null,
) {
  const urlSearch = new URL(TodoUrl);

  if (status) {
    urlSearch.searchParams.set("status", status);
  }
  if (priority) {
    urlSearch.searchParams.set("priority", priority);
  }
  if (assignee) {
    urlSearch.searchParams.set("assignee", assignee);
  }

  try {
    const response = await axiosInstance.get<TodoResponse>(
      urlSearch.toString(),
      {
        signal,
      },
    );
    return response.data.data.todos;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Load todos failed!");
  }
}
