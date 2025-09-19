import { type FC } from "react";
import type { Task } from "../../../types/Task";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import StatusColumn from "../status-column/StatusColumn";
import { Status, statusOptions } from "../../../types/Status";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../constants/QueryKeys.constant";
import { getTodos } from "../../../api/todos/GetTodos";
import { useSearchParams } from "react-router-dom";

const getTasksByStatus = (status: Status, data: Task[]) => {
  return data.filter((task) => task.status === status);
};

const checkValidStatus = (
  currentStatus: Status,
  updateStatus: Status,
): boolean => {
  const currentIndex = statusOptions.findIndex(
    (status) => status.value === currentStatus,
  );
  const updateIndex = statusOptions.findIndex(
    (status) => status.value === updateStatus,
  );

  if (currentIndex === -1 || updateIndex === -1) return false;
  return updateIndex > currentIndex;
};

const TodoBoard: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const priorityFilter = searchParams.get("priority");
  const assigneeFilter = searchParams.get("assignee");
  const statusFilter = searchParams.get("status");

  const { data, error } = useQuery<Task[] | undefined>({
    queryKey: [
      ...queryKeys.todos,
      ...queryKeys.todosByPriority(priorityFilter),
      ...queryKeys.todosByAssignee(assigneeFilter),
    ],
    queryFn: ({ signal }) =>
      getTodos(signal, statusFilter, priorityFilter, assigneeFilter),
  });

  if (!data) return <p>{`Error: ${error?.message}. Please try again!`}</p>;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const currentStatus = result.source.droppableId as Status;
    const updateStatus = result.destination.droppableId as Status;

    const currentIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const draggedTask = data.find((task) => task.id === result.draggableId);

    if (currentStatus === updateStatus) {
      const taskList = getTasksByStatus(currentStatus, data);
      const [moved] = taskList.splice(currentIndex, 1);
      taskList.splice(destinationIndex, 0, moved);
      const otherTasks = data.filter((task) => task.status !== currentStatus);
      const newData = [...otherTasks, ...taskList];
      // setData(newData);
      return;
    }

    if (checkValidStatus(currentStatus, updateStatus) && draggedTask) {
      const sourceTasks = data.filter((task) => task.status === currentStatus);
      const destinationTasks = data.filter(
        (task) => task.status === updateStatus,
      );

      sourceTasks.splice(currentIndex, 1);
      draggedTask.status = updateStatus;

      destinationTasks.splice(destinationIndex, 0, draggedTask);

      const otherTasks = data.filter(
        (task) => task.status !== currentStatus && task.status !== updateStatus,
      );

      // setData([...otherTasks, ...sourceTasks, ...destinationTasks]);
    } else {
      alert("Invalid action!");
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
        {statusOptions.map((status) => (
          <StatusColumn
            key={status.value}
            taskStatus={status}
            items={getTasksByStatus(status.value, data)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TodoBoard;
