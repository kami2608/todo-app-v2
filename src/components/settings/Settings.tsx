import type { FC } from "react";
import type { DialogProps } from "../../types/DialogProps";
import styles from "./Settings.module.css";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { Select } from "../common/select/Select";
import { themeOptions } from "../../types/Themes";
import { Button } from "../common/button/Button";

const Settings: FC<DialogProps> = ({ isOpen }) => {
  const methods = useForm();

  const handleLogout = () => {
    // TODO: logout
  };

  return (
    <div className={!isOpen ? styles.hiddenSettings : styles.settingsDialog}>
      <h1 style={{ fontSize: "var(--font-md)", fontWeight: "500" }}>Account</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-md)",
        }}
      >
        <FaUserCircle
          style={{ fontSize: "var(--font-lg)", color: "lightpink" }}
        />
        <p>Dang Tran</p>
      </div>
      <hr />
      <h1 style={{ fontSize: "var(--font-md)", fontWeight: "500" }}>
        Todo App
      </h1>
      <FormProvider {...methods}>
        <Select
          name="theme"
          options={themeOptions}
          label="Theme:"
          handleChange={() => {}}
        />
      </FormProvider>
      <Button
        variant="labelIcon"
        style={{ marginTop: "auto" }}
        onClick={handleLogout}
      >
        <MdLogout style={{ fontSize: "var(--font-md)" }} />
        <p style={{ fontSize: "var(--font-sm)" }}>Log out</p>
      </Button>
    </div>
  );
};

export default Settings;
