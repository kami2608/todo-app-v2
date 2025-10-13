import type { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";
import type { ButtonVariants } from "../../../types/ButtonVariants";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "text",
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(styles.btnBase, styles[variant], props.className)}
    >
      {children}
    </button>
  );
};
