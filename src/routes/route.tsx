import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => {
    console.log("test");
    throw redirect({ to: "/login" });
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
