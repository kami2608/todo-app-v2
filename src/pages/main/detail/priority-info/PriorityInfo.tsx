import type { FC } from "react";
import { Select } from "../../../../components/common/select/Select";
import { Priority, priorityOptions } from "../../../../types/Priority";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface PriorityInfoProps {
  priority: Priority;
}

const PriorityInfo: FC<PriorityInfoProps> = ({ priority }) => {
  const methods = useForm({
    defaultValues: {
      priority: priority,
    },
  });

  const onSubmit: SubmitHandler<{ priority: Priority }> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Select
        name="priority"
        options={priorityOptions}
        label="Priority: "
        handleChange={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};

export default PriorityInfo;
