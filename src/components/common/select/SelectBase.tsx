import type { FC, SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

interface SelectBaseProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: any; label: string }[];
  label?: string;
}

export const SelectBase: FC<SelectBaseProps> = ({
  label,
  options,
  id,
  ...props
}) => {
  return (
    <div className={styles.select}>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
