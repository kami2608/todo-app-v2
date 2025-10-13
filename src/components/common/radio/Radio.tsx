import type { FC, HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface RadioProps extends Omit<HTMLProps<HTMLInputElement>, "name"> {
  name: string;
}

export const Radio: FC<RadioProps> = ({ children, id, name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const unique = id || name;

  return (
    <div className="flex items-center gap-1">
      <input
        {...register(name)}
        type="radio"
        id={unique}
        name={name}
        {...props}
        className={clsx(
          "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm",
          props.className,
        )}
      />{" "}
      <label htmlFor={unique}>{children}</label>
      {errors[name] && <ErrorMessage error={errors[name]} />}
    </div>
  );
};
