import type { FC, InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

export const CheckboxBase: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  children,
  id,
  ...props
}) => {
  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={id} {...props} />{" "}
      <label htmlFor={id}>{children}</label>
    </div>
  );
};
