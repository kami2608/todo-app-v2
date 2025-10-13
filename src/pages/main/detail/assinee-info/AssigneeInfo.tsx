import { useState, type FC } from "react";
import styles from "./AssigneeInfo.module.css";
import { FaUserEdit } from "react-icons/fa";
import { Button } from "../../../../components/common/button/Button";
import { Input } from "../../../../components/common/input/Input";
import { BsPersonCheck } from "react-icons/bs";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface AssigneeInfoProps {
  assignee: string;
}

const AssigneeInfo: FC<AssigneeInfoProps> = ({ assignee }) => {
  const [isEditing, setIsEditing] = useState(false);
  const methods = useForm({
    defaultValues: {
      assignee: assignee,
    },
  });

  const onSubmit: SubmitHandler<{ assignee: string }> = (data) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <div className={styles.assigneeInfo}>
      <h1
        style={{
          fontSize: "var(--font-sm)",
          paddingBottom: "var(--spacing-sm)",
        }}
      >
        Member
      </h1>

      <div
        className={styles.info}
        style={{ display: isEditing ? "none" : "flex" }}
      >
        <Button
          variant="icon"
          onClick={() => setIsEditing(true)}
          className={styles.editBtn}
        >
          <FaUserEdit
            style={{ fontSize: "var(--font-lg)", color: "var(--color-text)" }}
          />
        </Button>
        <p>{assignee}</p>
      </div>

      <div
        className={styles.editAssignee}
        style={{ display: !isEditing ? "none" : "flex" }}
      >
        <FormProvider {...methods}>
          <Input name="assignee" type="text" minLength={1} maxLength={30} />
          <Button
            variant="icon"
            className={styles.editBtn}
            onClick={methods.handleSubmit(onSubmit)}
          >
            <BsPersonCheck
              style={{ fontSize: "var(--font-lg)", color: "var(--color-text)" }}
            />
          </Button>
        </FormProvider>
      </div>
    </div>
  );
};

export default AssigneeInfo;
