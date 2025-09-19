import type { FC } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "../../../common/input/Input";
import { Button } from "../../../common/button/Button";
import { IoMdClose } from "react-icons/io";
import styles from "./TaskInput.module.css";
import type { Task } from "../../../../types/Task";

interface TaskInputProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskInput: FC<TaskInputProps> = ({ setIsOpen }) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      assignee: "",
    },
  });

  const onSubmit: SubmitHandler<Partial<Task>> = (data) => {
    console.log(data);
    setIsOpen(false);
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
