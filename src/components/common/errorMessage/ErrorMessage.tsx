import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({
  error,
}: {
  error:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | (Record<string, Partial<{ type: string | number; message: string }>> &
        Partial<{ type: string | number; message: string }>);
}) {
  return (
    <p className={styles.errorMessage}>
      {typeof error.message === "string" ? error.message : null}
    </p>
  );
}
