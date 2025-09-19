import type { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppURLs } from "../../../constants/App.paths";
import styles from "./Home.module.css";
import TodoBoard from "../../../components/tasks/todo-board/TodoBoard";

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div>
        <TodoBoard />
      </div>
      <Outlet context={{ close: () => navigate(AppURLs.home) }} />
    </div>
  );
};

export default Home;
