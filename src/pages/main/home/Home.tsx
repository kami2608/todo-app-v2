import type { FC } from "react";
import TodoBoard from "../../../components/tasks/todo-board/TodoBoard";
import styles from "./Home.module.css";
import { Outlet } from "@tanstack/react-router";

const Home: FC = () => {
  return (
    <div className={styles.home}>
      <div>
        <TodoBoard />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
