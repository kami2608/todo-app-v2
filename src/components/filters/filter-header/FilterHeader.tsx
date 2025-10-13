import type { FC } from "react";
import styles from "./FilterHeader.module.css";
import { Button } from "../../common/button/Button";
import { IoMdClose } from "react-icons/io";
import type { DialogProps } from "../../../types/DialogProps";

const FilterHeader: FC<DialogProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={styles.filterHeader}>
      <h1>Filter</h1>
      <div className={styles.btnClose}>
        {setIsOpen && (
          <Button variant="icon" onClick={() => setIsOpen(!isOpen)}>
            <IoMdClose style={{ fontSize: "var(--font-md)" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterHeader;
