export const queryKeys = {
  todos: ["todoList"] as const,
  details: (id: string | undefined) => [...queryKeys.todos, id] as const,
  todosByStatus: (status: string[]) =>
    [...queryKeys.todos, { status: status }] as const,
  todosByPriority: (priority: string | null) =>
    [...queryKeys.todos, { priority: priority }] as const,
  todosByAssignee: (assignee: string | null) =>
    [...queryKeys.todos, { assignee: assignee }] as const,
};
