import { useRef, useState, type FC } from "react";
import { Button } from "../../../common/button/Button";
import { FiPlus } from "react-icons/fi";
import styles from "./AddTaskCard.module.css";
import TaskInput from "../task-input/TaskInput";
import useClickOutside from "../../../../custom-hooks/UseClickOutside";
import type { Status } from "../../../../types/Status";

interface AddTaskCardProps {
  status: Status;
}

const AddTaskCard: FC<AddTaskCardProps> = ({ status }) => {
  const [isTaskInputOpen, setIsTaskInputOpen] = useState(false);
  const taskInputRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: taskInputRef,
    state: isTaskInputOpen,
    handle: setIsTaskInputOpen,
  });

  return (
    <>
      {isTaskInputOpen && (
        <div ref={taskInputRef}>
          <TaskInput setIsOpen={setIsTaskInputOpen} status={status} />
        </div>
      )}
      {!isTaskInputOpen && (
        <div className={styles.addTask}>
          <Button variant="labelIcon" onClick={() => setIsTaskInputOpen(true)}>
            <FiPlus
              style={{
                fontSize: "var(--font-md)",
                color: "var(--color-text)",
              }}
            />
            <p
              style={{
                fontSize: "var(--font-sm)",
                fontWeight: "500",
                color: "var(--color-text)",
              }}
            >
              Add a card
            </p>
          </Button>
        </div>
      )}
    </>
  );
};

export default AddTaskCard;
