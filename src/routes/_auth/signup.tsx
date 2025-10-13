import { createFileRoute } from "@tanstack/react-router";
import Signup from "../../pages/authentication/signup/Signup";

export const Route = createFileRoute("/_auth/signup")({
  component: Signup,
});
