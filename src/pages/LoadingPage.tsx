import type { FC } from "react";

const LoadingPage: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src="/Loading.gif"
        alt="Loading..."
        width="200px"
        height="200px"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default LoadingPage;
