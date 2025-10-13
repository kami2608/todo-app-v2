import { useEffect, useState, type FC } from "react";
import styles from "./DetailTodo.module.css";
import DetailHeader from "./detail-header/DetailHeader";
import PriorityInfo from "./priority-info/PriorityInfo";
import EditableDate from "./date-info/EditableDate";
import AssigneeInfo from "./assinee-info/AssigneeInfo";
import DateInfo from "./date-info/DateInfo";
import Description from "./description-info/Description";
import { Priority } from "../../../types/Priority";
import { getTodoById } from "../../../api/todos/GetTodoById";
import type { Task } from "../../../types/Task";
import LoadingPage from "../../LoadingPage";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";

const DetailTodo: FC = () => {
  const params = useParams({ from: "/_app/home/task/$id" });
  const search = useSearch({ from: "/_app/home/task/$id" });
  console.log("search", search);
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    const controller = new AbortController();
    const getTodo = async () => {
      try {
        const res = await getTodoById(controller.signal, params.id!);
        if (res) setTask(res);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();

    return () => {
      controller.abort();
    };
  }, []);

  if (!task)
    return (
      <div className={styles.around} onClick={close}>
        <LoadingPage />
      </div>
    );

  return (
    <div className={styles.around} onClick={() => navigate({ to: "/home/" })}>
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
