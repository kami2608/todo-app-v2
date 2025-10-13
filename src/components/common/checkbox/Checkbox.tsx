import type { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { CheckboxBase } from "./CheckboxBase";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  children,
  id,
  name,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {/* <input {...register(name)} type="checkbox" id={unique} {...props} />{" "}
      <label htmlFor={unique}>{children}</label> */}
      <CheckboxBase id={id} {...register(name)} {...props}>
        {children}
      </CheckboxBase>
      {errors[name] && <ErrorMessage error={errors[name]} />}
    </div>
  );
};
