import type { FC } from "react";
import type { Status } from "../../../types/Status";
import { useNavigate } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";
import styles from "./TaskCard.module.css";
import clsx from "clsx";
import { Button } from "../../common/button/Button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../../../types/Task";
import { deleteTodoById } from "../../../api/todos/DeleteTodoById";
import { queryKeys } from "../../../constants/QueryKeys.constant";

interface TaskCardProps {
  index: number;
  taskId: string;
  taskTitle: string;
  taskStatus: Status;
}

const TaskCard: FC<TaskCardProps> = ({
  index,
  taskId,
  taskTitle,
  taskStatus,
}) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation<
    Task,
    Error,
    { signal: AbortSignal; id: string }
  >({
    mutationFn: ({ signal, id }) => deleteTodoById(id, signal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos });
    },
  });

  const handleDelete = () => {
    const controller = new AbortController();
    mutation.mutate({
      signal: controller.signal,
      id: taskId,
    });
  };

  return (
    <div>
      <Draggable key={taskId} draggableId={taskId} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
              snapshot.isDragging
                ? clsx(
                    styles.taskCardBase,
                    styles[taskStatus.replace(" ", "_")],
                    styles.isDragging,
                  )
                : clsx(
                    styles.taskCardBase,
                    styles[taskStatus.replace(" ", "_")],
                  )
            }
            style={provided.draggableProps.style}
            onClick={() => navigate(`/home/task/${taskId}`)}
          >
            <h3>{taskTitle}</h3>
            <Button
              variant="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              style={{ flexShrink: "0" }}
            >
              <MdOutlineDeleteForever style={{ fontSize: "var(--font-md)" }} />
            </Button>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default TaskCard;
