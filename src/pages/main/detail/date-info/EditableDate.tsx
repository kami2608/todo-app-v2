import { useRef, useState, type FC } from "react";
import { Button } from "../../../../components/common/button/Button";
import { MdOutlineDateRange } from "react-icons/md";
import { Input } from "../../../../components/common/input/Input";
import { Status } from "../../../../types/Status";
import useClickOutside from "../../../../custom-hooks/UseClickOutside";
import type { Task } from "../../../../types/Task";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { DateSchema } from "../../../../schemas/DateSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function getCurrentDateTime() {
  return new Date().toISOString().slice(0, 16);
}

interface EditableDateProps {
  task: Task;
}
type DateSchemaType = z.infer<typeof DateSchema>;

const EditableDate: FC<EditableDateProps> = ({ task }) => {
  const [isSetDate, setIsSetDate] = useState(false);
  const dateRef = useRef<HTMLDivElement | null>(null);

  const methods = useForm<DateSchemaType>({
    mode: "onChange",
    defaultValues: {
      startDate: task?.startDate,
      endDate: task?.endDate,
    },
    resolver: zodResolver(DateSchema),
  });

  useClickOutside({ ref: dateRef, state: isSetDate, handle: setIsSetDate });

  const onSubmit: SubmitHandler<DateSchemaType> = (data) => {
    console.log(data);
    setIsSetDate(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <FormProvider {...methods}>
        <Button
          variant="labelIcon"
          style={{ marginTop: "auto" }}
          onClick={() => setIsSetDate(!isSetDate)}
        >
          <MdOutlineDateRange style={{ fontSize: "var(--font-md)" }} />
          <p style={{ fontSize: "var(--font-sm)" }}>Dates</p>
        </Button>
        {isSetDate && (
          <div
            ref={dateRef}
            style={{
              position: "absolute",
              left: "var(--spacing-lg)",
              border: "1px solid gray",
              borderRadius: "var(--radius-lg)",
              maxWidth: "300px",
              maxHeight: "200px",
              overflowY: "auto",
              padding: "var(--spacing-sm)",
              backgroundColor: "var(--color-secondary)",
            }}
          >
            <Input
              name="startDate"
              type="datetime-local"
              label="Start date: "
              min={getCurrentDateTime()}
              disabled={task?.status !== Status.TODO}
            />

            <Input
              name="endDate"
              type="datetime-local"
              label="Due date: "
              min={getCurrentDateTime()}
            />

            <div
              style={{
                display: "flex",
                gap: "var(--spacing-md)",
                paddingTop: "var(--spacing-md)",
              }}
            >
              <Button onClick={methods.handleSubmit(onSubmit)}>Save</Button>
              <Button onClick={() => setIsSetDate(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </FormProvider>
    </div>
  );
};

export default EditableDate;
