import type { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputBase: FC<InputBaseProps> = ({ label, id, ...props }) => {
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={clsx(styles.input, props.className)}
      />
    </div>
  );
};
