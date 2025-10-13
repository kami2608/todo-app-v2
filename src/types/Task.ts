import type { Priority } from "./Priority";
import type { Status } from "./Status";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: Status;
  startDate: string;
  endDate: string;
  priority: Priority;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}
