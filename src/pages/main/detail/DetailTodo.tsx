import { useEffect, useState, type FC } from "react";
import { useParams, useOutletContext } from "react-router";
import styles from "./DetailTodo.module.css";
import DetailHeader from "./detail-header/DetailHeader";
import PriorityInfo from "./priority-info/PriorityInfo";
import EditableDate from "./date-info/EditableDate";
import AssigneeInfo from "./assinee-info/AssigneeInfo";
import DateInfo from "./date-info/DateInfo";
import Description from "./description-info/Description";
import { Priority } from "../../../types/Priority";
import type { Task } from "../../../types/Task";
import LoadingPage from "../../LoadingPage";
import { Status } from "../../../types/Status";

const testTask: Task = {
  id: "cmfmopp3p000138zr7af5a0xb",
  name: "Complete project documentation",
  description: "Write comprehensive API documentation",
  startDate: "2024-01-01T09:00:00.000Z",
  endDate: "2024-01-05T17:00:00.000Z",
  assignee: "johndoe",
  priority: Priority.HIGH,
  status: Status.TODO,
  createdAt: "2025-09-16T15:05:10.737Z",
  updatedAt: "2025-09-16T15:05:10.737Z",
};

type ContextType = { close: () => void };

const DetailTodo: FC = () => {
  const { taskId } = useParams();
  const { close } = useOutletContext<ContextType>();

  const [task, setTask] = useState<Task>(testTask);

  //TODO: get task by ID

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!task)
    return (
      <div className={styles.around} onClick={close}>
        <LoadingPage />
      </div>
    );

  return (
    <div className={styles.around} onClick={close}>
      <div className={styles.detailTodo} onClick={(e) => e.stopPropagation()}>
        <DetailHeader title={task?.name!} close={close} />

        <div className={styles.detailMain}>
          <div className={styles.detailBtn}>
            <EditableDate task={task!} />
            <PriorityInfo priority={task?.priority ?? Priority.HIGH} />
          </div>

          <AssigneeInfo assignee={task?.assignee!} />
          <DateInfo
            createdAt={task?.createdAt!}
            updatedAt={task?.updatedAt!}
            startDate={task?.startDate}
            endDate={task?.endDate}
          />

          <Description description={task?.description} />
        </div>
      </div>
    </div>
  );
};

export default DetailTodo;
