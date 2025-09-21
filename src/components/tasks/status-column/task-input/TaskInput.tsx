import type { FC } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../../../common/input/Input";
import { Button } from "../../../common/button/Button";
import { IoMdClose } from "react-icons/io";
import styles from "./TaskInput.module.css";
import type { Task } from "../../../../types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../../../../api/todos/CreateTodo";
import { queryKeys } from "../../../../constants/QueryKeys.constant";
import type { Status } from "../../../../types/Status";

interface TaskInputProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: Status;
}

const TaskInput: FC<TaskInputProps> = ({ setIsOpen, status }) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      assignee: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation<
    Task,
    Error,
    { newData: Partial<Task>; signal: AbortSignal }
  >({
    mutationFn: ({ newData, signal }) => createTodo(signal, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos });
    },
  });

  const onSubmit: SubmitHandler<Partial<Task>> = (data) => {
    const controller = new AbortController();
    console.log(data);

    mutation.mutate(
      {
        newData: { ...data, status: status },
        signal: controller.signal,
      },
      {
        onSuccess: (result) => {
          console.log("Todo created successfully:", result);
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Failed to create todo:", error);
        },
      },
    );
  };

  return (
    <div className={styles.taskInput}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            name="name"
            placeholder="Enter task's title..."
            label="Title: "
          />
          <Input
            name="assignee"
            placeholder="Enter task'assignee..."
            label="Assignee: "
          />
          <div className={styles.btn}>
            <Button type="submit" variant="text">
              Add task
            </Button>
            <Button
              type="button"
              variant="icon"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose style={{ fontSize: "var(--font-md)" }} />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default TaskInput;
