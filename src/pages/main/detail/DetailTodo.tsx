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
import LoadingPage from "../../LoadingPage";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../constants/QueryKeys.constant";
import { getTodoById } from "../../../api/todos/GetTodoById";

type ContextType = { close: () => void };

const DetailTodo: FC = () => {
  const { taskId } = useParams();
  const { close } = useOutletContext<ContextType>();

  const { data: task } = useQuery({
    queryKey: queryKeys.details(taskId),
    queryFn: ({ signal }) => getTodoById(signal, taskId),
  });

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
