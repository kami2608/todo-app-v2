import type { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { InputBase } from "./InputBase";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  label?: string;
  name: string;
}

export const Input: FC<InputProps> = ({ label, name, id, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const unique = id || name;

  return (
    <div style={{ width: "100%" }}>
      <InputBase label={label} id={unique} {...register(name)} {...props} />
      {errors[name] && <ErrorMessage error={errors[name]} />}
    </div>
  );
};
