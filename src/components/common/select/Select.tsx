import type { FC, HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { SelectBase } from "./SelectBase";

interface SelectProps extends Omit<HTMLProps<HTMLSelectElement>, "name"> {
  name: string;
  handleChange: () => void;
  options: { value: any; label: string }[];
}

export const Select: FC<SelectProps> = ({
  label,
  options,
  name,
  id,
  handleChange,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <SelectBase
        label={label}
        options={options}
        id={id}
        {...register(name)}
        {...props}
      />
      {errors[name] && <ErrorMessage error={errors[name]} />}
    </div>
  );
};
