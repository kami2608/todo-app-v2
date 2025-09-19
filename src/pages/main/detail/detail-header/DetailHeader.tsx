import { useState, type FC } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../../../../components/common/button/Button";
import styles from "./DetailHeader.module.css";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { TbPencilCheck } from "react-icons/tb";
import { BiSolidEditAlt } from "react-icons/bi";
import { Input } from "../../../../components/common/input/Input";

interface DetailHeaderProps {
  close: () => void;
  title: string;
}

const DetailHeader: FC<DetailHeaderProps> = ({ title, close }) => {
  const [isEditing, setIsEditing] = useState(false);
  const methods = useForm({
    defaultValues: {
      title: title,
    },
  });

  const onSubmit: SubmitHandler<{ title: string }> = (data) => {
    setIsEditing(false);
    console.log(data);
  };

  return (
    <div className={styles.detailHeader}>
      <div
        className={styles.title}
        style={{ display: isEditing ? "none" : "flex" }}
      >
        <Button
          variant="icon"
          onClick={() => setIsEditing(true)}
          className={styles.editBtn}
        >
          <BiSolidEditAlt
            style={{ fontSize: "var(--font-lg)", color: "var(--color-text)" }}
          />
        </Button>

        <h1 className={styles.detailTitle}>{title}</h1>
      </div>

      <div
        className={styles.editInput}
        style={{ display: !isEditing ? "none" : "flex" }}
      >
        <FormProvider {...methods}>
          <Button variant="icon" onClick={methods.handleSubmit(onSubmit)}>
            <TbPencilCheck
              style={{ fontSize: "var(--font-lg)", color: "var(--color-text)" }}
            />
          </Button>
          <Input
            name="title"
            type="text"
            className={styles.input}
            maxLength={100}
            minLength={1}
          />
        </FormProvider>
      </div>

      <Button variant="icon" onClick={close} className={styles.closeBtn}>
        <IoMdClose style={{ fontSize: "var(--font-md)" }} />
      </Button>
    </div>
  );
};

export default DetailHeader;
