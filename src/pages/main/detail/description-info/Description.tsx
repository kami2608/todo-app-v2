import { useState, type FC } from "react";
import styles from "./Description.module.css";
import { HiOutlineBars4 } from "react-icons/hi2";
import { Button } from "../../../../components/common/button/Button";
import { TextArea } from "../../../../components/common/textArea/TextArea";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface DescriptionProps {
  description: string | undefined;
}

const Description: FC<DescriptionProps> = ({ description }) => {
  const [isEdit, setIsEdit] = useState(false);
  const methods = useForm({
    defaultValues: {
      description: description,
    },
  });

  const onSubmit: SubmitHandler<{ description: string | undefined }> = (
    data,
  ) => {
    console.log(data);
    setIsEdit(false);
  };

  return (
    <div className={styles.detailDescription}>
      <FormProvider {...methods}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "var(--spacing-md)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-sm)",
              alignItems: "center",
            }}
          >
            <HiOutlineBars4 style={{ fontSize: "var(--font-md)" }} />
            <p style={{ fontSize: "var(--font-sm)" }}>Description</p>
          </div>

          {description && !isEdit ? (
            <Button onClick={() => setIsEdit(true)}>Edit</Button>
          ) : null}
        </div>

        <div className={styles.description}>
          {description && !isEdit ? (
            <p>{description}</p>
          ) : (
            <div>
              <TextArea
                name="description"
                placeholder="Add a more detailed description..."
                style={{ height: "200px" }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-md)",
                  paddingTop: "var(--spacing-md)",
                }}
              >
                <Button onClick={methods.handleSubmit(onSubmit)}>Save</Button>
                <Button onClick={() => setIsEdit(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </FormProvider>
    </div>
  );
};

export default Description;
