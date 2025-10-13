import { createFileRoute } from "@tanstack/react-router";
import DetailTodo from "../../../../pages/main/detail/DetailTodo";

export const Route = createFileRoute("/_app/home/task/$id")({
  errorComponent: () => <p>Error</p>,
  component: () => <DetailTodo />,
});
