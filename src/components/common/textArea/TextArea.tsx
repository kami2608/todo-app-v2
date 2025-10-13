import type { FC, HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage";
import styles from "./TextArea.module.css";
import clsx from "clsx";

interface TextAreaProps extends Omit<HTMLProps<HTMLTextAreaElement>, "name"> {
  name: string;
}

export const TextArea: FC<TextAreaProps> = ({ id, label, name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const unique = id || name;

  return (
    <div style={{ width: "100%" }}>
      {label && <label htmlFor={unique}>{label}</label>}
      <textarea
        id={unique}
        {...register(name)}
        {...props}
        className={clsx(styles.textArea, props.className)}
      />
      {errors[name] && <ErrorMessage error={errors[name]} />}
    </div>
  );
};
