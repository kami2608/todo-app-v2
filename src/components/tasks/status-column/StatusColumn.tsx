import type { FC } from "react";
import { Droppable } from "@hello-pangea/dnd";
import type { Task } from "../../../types/Task";
import TaskCard from "../task-card/TaskCard";
import styles from "./StatusColumn.module.css";
import clsx from "clsx";
import type { Status } from "../../../types/Status";
import StatusHeader from "./column-header/StatusHeader";
import AddTaskCard from "./add-task-card/AddTaskCard";

interface StatusColumnProps {
  taskStatus: { value: Status; label: string };
  items: Task[];
}

const StatusColumn: FC<StatusColumnProps> = ({ taskStatus, items }) => {
  return (
    <Droppable droppableId={taskStatus.value}>
      {(provided, snapshot) => (
        <div
          className={
            !snapshot.isDraggingOver
              ? clsx(
                  styles.statusColumnBase,
                  styles[taskStatus.value.replace(" ", "_")],
                )
              : clsx(
                  styles.statusColumnBase,
                  styles[taskStatus.value.replace(" ", "_")],
                  styles.isDraggingOver,
                )
          }
        >
          <StatusHeader headerName={taskStatus.label} />

          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.cardContainer}
          >
            {items.map((task, index) => (
              <TaskCard
                key={task.id}
                index={index}
                taskId={task.id}
                taskTitle={task.name}
                taskStatus={task.status}
              />
            ))}
            {provided.placeholder}
          </div>

          <AddTaskCard status={taskStatus.value} />
        </div>
      )}
    </Droppable>
  );
};

export default StatusColumn;
