import type { FC } from "react";
import styles from "./FilterDialog.module.css";
import type { DialogProps } from "../../types/DialogProps";
import Keyword from "./search-keyword/Keyword";
import FilterHeader from "./filter-header/FilterHeader";
import PrioritySelection from "./priority-selection/PrioritySelection";

const FilterDialog: FC<DialogProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={!isOpen ? styles.hiddenFilter : styles.filterDialog}>
      <FilterHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.filterForm}>
        <Keyword />
        <PrioritySelection />
      </div>
    </div>
  );
};

export default FilterDialog;
