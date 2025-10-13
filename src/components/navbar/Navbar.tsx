import { useRef, useState, type FC } from "react";
import { Button } from "../common/button/Button";
import { VscListFilter } from "react-icons/vsc";
import { FaUserCog } from "react-icons/fa";
import styles from "./Navbar.module.css";
import FilterDialog from "../filters/FilterDialog";
import useClickOutside from "../../custom-hooks/UseClickOutside";
import Settings from "../settings/Settings";
import type { ReactChildren } from "../../types/ReactChildren";

const Navbar: FC<ReactChildren> = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const settingRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({
    ref: filterRef,
    state: isFilterOpen,
    handle: setIsFilterOpen,
  });

  useClickOutside({
    ref: settingRef,
    state: isSettingOpen,
    handle: setIsSettingOpen,
  });

  return (
    <div className={styles.appLayout}>
      <div className={styles.nav}>
        <h1 className={styles.navTitle}>Todo App</h1>
        <div className={styles.navBtns}>
          <div className={styles.navFilter}>
            <Button
              variant={isFilterOpen ? "iconActive" : "icon"}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <VscListFilter
                style={{
                  fontSize: "var(--font-lg",
                  color: "var(--color-text)",
                }}
              />
            </Button>
            <div ref={filterRef} className={styles.dialog}>
              <FilterDialog isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
            </div>
          </div>

          <div>
            <Button
              variant={isSettingOpen ? "iconActive" : "icon"}
              onClick={() => setIsSettingOpen(!isSettingOpen)}
            >
              <FaUserCog
                style={{
                  fontSize: "var(--font-lg",
                  color: "var(--color-text)",
                }}
              />
            </Button>
            <div ref={settingRef} className={styles.dialog}>
              <Settings isOpen={isSettingOpen} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.mainLayout}
        style={{ display: "flex", gap: "20px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Navbar;
