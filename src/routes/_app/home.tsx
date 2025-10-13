import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../../components/navbar/Navbar";
import Home from "../../pages/main/home/Home";

export const Route = createFileRoute("/_app/home")({
  component: () => (
    <>
      <Navbar>
        <Home />
      </Navbar>
    </>
  ),
});
