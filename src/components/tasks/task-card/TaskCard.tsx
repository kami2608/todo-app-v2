import type { FC } from "react";
import type { Status } from "../../../types/Status";
import { useNavigate } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";
import styles from "./TaskCard.module.css";
import clsx from "clsx";
import { Button } from "../../common/button/Button";
import { MdOutlineDeleteForever } from "react-icons/md";

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
                console.log(1);
                // TODO: handle delete
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
