import type { FC } from "react";
import { RiTodoLine } from "react-icons/ri";
import styles from "./StatusHeader.module.css";

interface StatusHeaderProps {
  headerName: string;
}

const StatusHeader: FC<StatusHeaderProps> = ({ headerName }) => {
  return (
    <div className={styles.statusHeader}>
      <RiTodoLine style={{ fontSize: "var(--spacing-lg)" }} />
      <p>{headerName}</p>
    </div>
  );
};

export default StatusHeader;
